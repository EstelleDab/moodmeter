import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import LoginForm from "./components/LoginForm.js";
import RegisterForm from "./components/RegisterForm.js";
import UserHome from "./components/UserHome.js";
import FeedbackForm from "./components/FeedbackForm.js";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home.js";
import UnAuthorized from "./components/UnAuthorized";
import ResultatsIA from "./components/ResultatsIA.js";
import "./styles/Global.css";
import "./bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const App = () => {
  return (
    <Router>
      <ContentApp />
    </Router>
  );
};

const ContentApp = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Utilisé pour gérer les redirections
  const [user, setUser] = useState(null); // État utilisateur
  const [isLoading, setIsLoading] = useState(true); // État pour indiquer si les données sont en cours de chargement
  const hideHeaderRoutes = ["/login", "/register"]; // Routes qui masquent le header

  // Fonction de déconnexion
  const handleLogout = () => {
    console.log("Déconnexion...");
    localStorage.removeItem("user"); // Supprime les données utilisateur du localStorage
    localStorage.removeItem("token"); // Supprime le token
    setUser(null); // Réinitialise l'utilisateur
    navigate("/login"); // Redirige vers la page de connexion
  };

  // Validation de la session au démarrage (via le token)
  const validateSession = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.log("Aucun token trouvé. Suppression des données locales.");
      localStorage.clear(); // Supprime les données uniquement si aucun token n'est présent
      setUser(null);
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/validate-session", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Session valide :", data.user);
        setUser(data.user);
      } else {
        console.log("Session invalide. Suppression des données locales.");
        localStorage.clear(); // Supprime les données en cas de session invalide
        setUser(null);
      }
    } catch (error) {
      console.error("Erreur lors de la validation :", error);
      localStorage.clear(); // Supprime les données en cas d'erreur
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    // Nettoyage des données locales si aucun utilisateur
    if (!localStorage.getItem("token")) {
      console.log("Nettoyage des données locales au démarrage.");
      localStorage.clear();
    }
    validateSession(); // Exécute la validation
  }, []);
  

  // Redirect user to /login if user is null and loading is done
  useEffect(() => {
    if (!isLoading && user === null && location.pathname !== "/login" && location.pathname !== "/register") {
      console.log("Redirection vers /login.");
      navigate("/login");
    }
  }, [user, isLoading, location.pathname, navigate]);

  if (isLoading) {
    return <p>Chargement...</p>;
  }





  return (
    <div>
      {/* Affiche le header sauf pour certaines routes */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header user={user} handleLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user} setUser={setUser} isLoading={isLoading}>
              <Home user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback/:ueId"
          element={
            <ProtectedRoute user={user} role="eleve" isLoading={isLoading}>
              <FeedbackForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute user={user} role="eleve" isLoading={isLoading}>
              <FeedbackForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userhome"
          element={
            <ProtectedRoute user={user} role="eleve" isLoading={isLoading}>
              <UserHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} role="enseignant" isLoading={isLoading}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginForm onLoginSuccess={setUser} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/unauthorized" element={<UnAuthorized user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
