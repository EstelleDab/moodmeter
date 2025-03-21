import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = ({ user }) => {
    const navigate = useNavigate();
  
    console.log("Données reçues par UnauthorizedPage :", user); // Vérifiez si `user` est transmis correctement
  
    const retourAccueil = () => {
      if (user && user.role === "eleve") {
        console.log("Redirection vers /userhome");
        navigate("/userhome");
      } else if (user && user.role === "enseignant") {
        console.log("Redirection vers /dashboard");
        navigate("/dashboard");
      } else {
        console.log("Redirection vers /login");
        navigate("/login");
      }
    };
  
    return (
      <div className="container text-center mt-5">
        <h1>Accès Refusé</h1>
        <p>Vous n'êtes pas autorisé à accéder à cette page.</p>
        <button
          className="btn btn-primary mt-3"
          onClick={retourAccueil} // Lier la fonction sans exécution immédiate
        >
          Retour à l'accueil
        </button>
      </div>
    );
  };
  
  export default UnauthorizedPage;
  