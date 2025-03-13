import React, { useEffect, useState } from "react";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserHome from "./UserHome";


const Home = () => {
  const [isSignup, setIsSignup] = useState(false); // État pour l'inscription
  const [isLoginPage, setIsLoginPage] = useState(true); // État pour la connexion
  const [user, setUser] = useState(null); // État pour stocker les données utilisateur

  // Fonction pour récupérer les détails utilisateur
  const fetchUserDetails = async () => {
    const token = localStorage.getItem('token'); // Récupère le token JWT
    try {
      const response = await fetch('http://localhost:5000/home', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Ajouter le token dans les en-têtes
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données utilisateur');
      }

      const userDetails = await response.json(); // Convertir la réponse en JSON
      console.log('Détails utilisateur récupérés :', userDetails); 
      return userDetails; // Retourne les données utilisateur
    } catch (error) {
      console.error('Erreur :', error);
      return null;
    }
  };


  // useEffect pour charger les données utilisateur
  useEffect(() => {
    const loadUserDetails = async () => {
      const userDetails = await fetchUserDetails();
      if (userDetails) {
        setUser(userDetails); // Stocke les données utilisateur dans l'état
      }
    };

    loadUserDetails();
  }, []);

  // Basculer entre inscription et connexion
  const handleFormSwitch = (formType) => {
    setIsSignup(formType === 'signup');
    setIsLoginPage(formType === 'login');
  };

  // Fonction appelée après une connexion réussie
  const handleUserLogin = (userData) => {
    setUser(userData); 
    setIsLoginPage(false);
    setIsSignup(false);
  };

  // Affichage conditionnel
  return (
    <div>
      {isSignup ? (

        <RegisterForm onSwitch={() => handleFormSwitch('login')} />
      ) : user? (
        <UserHome user={user} /> // Affiche les données utilisateur
      ) : (
        <LoginForm
          onSwitch={() => handleFormSwitch('signup')}
          onLoginSuccess={handleUserLogin} // Gestion de la connexion réussie
        />
      )}
    </div>
  );
};

export default Home;
