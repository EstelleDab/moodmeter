import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ user, setUser }) => {
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const response = await fetch("http://localhost:5000/home", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Erreur lors de la récupération des données utilisateur");

      const userDetails = await response.json();
      console.log("Détails utilisateur récupérés :", userDetails);
      return userDetails;
    } catch (error) {
      console.error("Erreur :", error);
      return null;
    }
  };

  useEffect(() => {
    const loadUserDetails = async () => {
      const userDetails = await fetchUserDetails();
      if (userDetails) {
        setUser(userDetails);

        // Redirection en fonction du rôle
        if (userDetails.role === "enseignant") {
          navigate("/dashboard");
        } else if (userDetails.role === "eleve") {
          navigate("/userhome");
        } else {
          console.error("Rôle utilisateur non reconnu :", userDetails.role);
        }
      } else {
        navigate("/login"); // Redirection vers la page de connexion si non authentifié
      }
    };

    loadUserDetails();
  }, [navigate, setUser]);

  return null; // Rien à afficher dans Home, la redirection s'occupe de tout
};

export default Home;
