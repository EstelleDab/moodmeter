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

  // Gère la sélection d'un emoji
  const handleChange = (questionKey, event, newValue) => {
    const label = questions[questionKey].options[newValue]?.label;
    console.log(`${questions[questionKey].question} : ${label}`);
  };

// Affichage des questions et réponses
  return (
    <div className="feedbackForm d-flex flex-column align-items-center justify-content-center text-center vh-100">
      <h1>Feedback</h1>
      <button className="btn btn-primary mb-5" onClick={() => setModal((value) => !value)}>Donner mon feedback sur l'UE</button>

      {modal && (
        <div className="shadow p-5 bg-white rounded vw-75 d-flex flex-column align-items-center text-center">
          {Object.entries(questions).map(([key, { question, options }]) => (
            <div key={key} className="question-container my-3">
              <Typography component="legend" className="font-weight-bold">{question}</Typography>
              <Rating
                name={key}
                IconContainerComponent={(props) => <IconContainer {...props} options={options} />}
                defaultValue={3}
                getLabelText={(value) => options[value]?.label}
                onChange={(event, newValue) => handleChange(key, event, newValue)}
                highlightSelectedOnly
                size="large"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
