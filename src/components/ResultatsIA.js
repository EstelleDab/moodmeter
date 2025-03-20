import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResultatsIA = () => {
    const [resultats, setResultats] = useState(null);  

    useEffect(() => {
        axios.post('http://localhost:5000/feedback/summarize')
        .then(response => {
            console.log("Données reçues :", response.data); // Afficher toute la réponse
            setResultats(response.data.summary); 
        })    
          .catch(error => console.error("Erreur API :", error));
    }, []);
    
    return (
        <div>
          <h2 class="text-center mb-4">Résumé des feedbacks</h2>
          {resultats ? (
  resultats.split("\n").map((ligne, index) => (
    ligne.trim() && <p key={index}><strong>{ligne.split(":")[0]} :</strong> {ligne.split(":")[1]}</p>
  ))
) : (
  <p>Chargement...</p>
)}
        </div>
      );
}

export default ResultatsIA;
