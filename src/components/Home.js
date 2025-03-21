import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ user, setUser }) => {
  const navigate = useNavigate();

  // Récupération des détails utilisateur depuis le serveur (/Userhome)
  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const response = await fetch("http://localhost:5000/Userhome", {
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
      console.error("Erreur lors de la validation :", error);
      return null;
    }
  };

  // Validation de session via /validate-session
  const validateSession = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const response = await fetch("http://localhost:5000/validate-session", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Session invalide ou expirée");
        return null;
      }

      const { user } = await response.json();
      return user;
    } catch (error) {
      console.error("Erreur lors de la validation de la session :", error);
      return null;
    }
  };

  useEffect(() => {
    const loadUserDetails = async () => {
      // Validation stricte auprès du serveur
      const validUser = await validateSession();

      if (validUser) {
        console.log("Utilisateur validé :", validUser);
        setUser(validUser);

      

        // Redirection selon le rôle
        if (validUser.role === "enseignant") {
          navigate("/dashboard");
        } else if (validUser.role === "eleve") {
          navigate("/userhome");
        }
      } else {
        // Si la session n'est pas valide, nettoyage et fallback
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // Tente de récupérer les données utilisateur avec fetchUserDetails
        const userDetails = await fetchUserDetails();
        if (userDetails) {
          setUser(userDetails);

          // Redirection selon le rôle
          if (userDetails.role === "enseignant") {
            navigate("/dashboard");
          } else if (userDetails.role === "eleve") {
            navigate("/userhome");
          }
        } else {
          // Si tout échoue, redirection vers login
          setUser(null);
          navigate("/login");
        }
      }
    };

    loadUserDetails();
  }, [navigate, setUser]);

  return null; // Rien à afficher, uniquement des redirections
};

export default Home;
