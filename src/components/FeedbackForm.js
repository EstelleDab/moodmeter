import * as React from 'react';
import PropTypes from 'prop-types';
import "../styles/Form.css";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import questions from './Questions'; // Importation des questions
import { useParams } from "react-router-dom";


// Source du système de rating de base : https://mui.com/material-ui/react-rating/

// On récupère les emojis et les affiche
function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{props.options[value]?.icon}</span>;
}

// Gère le popup du formulaire de feedback
export default function RadioGroupRating() {
  const [modal, setModal] = React.useState(false);
  const [responses, setResponses] = React.useState({});
  // Récupère l'ID de l'UE depuis l'URL
  const { ueId } = useParams(); 
  //Récupéartion des données des UES
  const [ueDetails, setUeDetails] = React.useState(null);
 // const eleveId = 7; // ID de l'élève
 // const ueId = 1; // ID de l'UE
 //inistialisation de la variable de l etat du chargement
 const [loading, setLoading]= React.useState(null);
 const [error, setError]= React.useState(null);
 const eleveId= JSON.parse(localStorage.getItem('user'))?.id;
 console.log("Données dans localStorage :", localStorage.getItem('user'));
 console.log("Token dans localStorage :", localStorage.getItem("token"));


 React.useEffect(() => {    
  console.log("Utilisateur connecté :", eleveId);
  console.log("UE sélectionnée :", ueId);
  if (ueId) {

  // Charger les détails de l’UE si nécessaire
  fetch(`http://localhost:5000/ue/${ueId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setUeDetails(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des détails de l’UE :", error);
      setError( 'impossible de charger les détails de cette UE.');
      setLoading(false);
    });
  }
}, [ueId]);


  // Gère la sélection d'un emoji
  const handleChange = (questionKey, event, newValue) => {
    setResponses((prev) => ({
      ...prev,
      [questionKey]: newValue,
    }));
  };

  // Envoyer les réponses au backend
  const handleSubmit = async (e) => {
    e.preventDefault();
  //Vérifie que l utilisateur est identifié
    if (!eleveId || !ueId) {
      alert("Impossible d'envoyer le feedback : utilisateur ou UE introuvable.");
      return;
    }
    const feedbackData = {
      ...responses,
      eleveId,
      ueId,
    };

    console.log("Données soumises :", feedbackData);

    try {
      const response = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, //transmission du token dans la requete
        },
        body: JSON.stringify(feedbackData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Merci pour ton feedback !");
      setModal(false); // Fermer le formulaire après soumission
    } catch (error) {
      alert("Erreur lors de l'envoi : " + error.message);
    }
  };

  // Affichage des questions et réponses
  return (
    <div className="feedbackForm d-flex flex-column align-items-center justify-content-start text-center vh-100">
      {loading && <p>Chargement des données...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ueDetails && <h1>Feedback pour l' {ueDetails.nom || "Chargement des données en cours..."}</h1>}
      <button className="btn btn-secondary mt-5 mb-3  " onClick={() => setModal((value) => !value)}>Donner mon feedback sur l'UE</button>

      {modal && (
        <div className="shadow p-5 bg-white rounded vw-75 d-flex flex-column align-items-center text-center">
          {Object.entries(questions).map(([key, { question, options }]) => (
            <div key={key} className="question-container my-3">
              <Typography component="legend" className="font-weight-bold">{question}</Typography>
              <Rating
                name={key}
                IconContainerComponent={(props) => <IconContainer {...props} options={options} />}
                getLabelText={(value) => options[value]?.label}
                onChange={(event, newValue) => handleChange(key, event, newValue)}
                highlightSelectedOnly
                size="large"
              />
            </div>
          ))}

          <button className="btn btn-success mt-4" onClick={handleSubmit}>
            Envoyer
          </button>
        </div>
      )}
    </div>
  );
}
