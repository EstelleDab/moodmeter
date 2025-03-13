import * as React from 'react';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import questions from './Questions'; // Importation des questions

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
  const eleveId = 7; // ID de l'élève
  const ueId = 1; // ID de l'UE

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

    const feedbackData = {
      ...responses,
      eleveId,
      ueId,
    };

    console.log("Données soumises :", feedbackData);

    try {
      const response = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <div className="feedbackForm d-flex flex-column align-items-center justify-content-center text-center vh-100">
      <h1>Feedback</h1>
      <button className="btn btn-secondary mb-5" onClick={() => setModal((value) => !value)}>Donner mon feedback sur l'UE</button>

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
