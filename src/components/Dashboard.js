import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/Dashboard.css';


// Enregistrement des composants nécessaires
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/feedback/moyenne')
      .then(response => {
        console.log("Données reçues :", response.data);
        setFeedbacks(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Feedbacks par UE</h2>
      <div className="dashboard-content">
        {feedbacks.length > 0 ? feedbacks.map((feedback, index) => {
          const barData = {
            labels: ['', '', '', ''],
            datasets: [
              {
                data: [
                  Number(feedback.moyenne_clarte),
                  Number(feedback.moyenne_difficulte),
                  Number(feedback.moyenne_reactivite),
                  Number(feedback.moyenne_ressenti)
                ],
                backgroundColor: ['#FF5757', '#333333', '#FFBD59', '#FFDE59'],
                borderColor: ['#FF4F4F', '#222222', '#FF9F00', '#FFCC00'],
                borderWidth: 1
              }
            ]
          };

          const emojiScale = ["", "😰", "😥", "🫡", "😀", "🥳"];

          const options = {
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: `${feedback.UE.nom}`
              }
            },
            scales: {
              x: {
                display: false
              },
              y: {
                beginAtZero: false,
                min: 1,
                max: 5,
                ticks: {
                  stepSize: 1,
                  font: {
                    size: 16
                  },
                  callback: function (value) {
                    return emojiScale[value] || "";
                  }
                }
              }
            }
          };

          return (
            <div key={index} className="dashboard-card">
              <div className="chart-container">
                <Bar data={barData} options={options} />
              </div>
              <div className="legend">
                <div className="legend-row">
                  <span className="legend-item"><span className="legend-color color-clarte"></span> Clarté Consignes</span>
                  <span className="legend-item"><span className="legend-color color-difficulte"></span> Difficulté</span>
                </div>
                <div className="legend-row">
                  <span className="legend-item"><span className="legend-color color-reactivite"></span> Réactivité Enseignant</span>
                  <span className="legend-item"><span className="legend-color color-ressenti"></span> Ressenti Global</span>
                </div>
              </div>
            </div>
          );
        }) : <p className="loading-text">Chargement des données...</p>}
      </div>
    </div>
  );
};

export default Dashboard;