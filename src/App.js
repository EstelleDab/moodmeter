import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
  const [user, setUser] = useState(null); // État utilisateur
  const [isLoading, setIsLoading] = useState(true); // État pour indiquer si les données sont en cours de chargement
  const hideHeaderRoutes = ["/login", "/register"]; // Routes qui masquent le header

  // Validation de la session au démarrage (via le token)
  useEffect(() => {
    const validateSession = async () => {
      setIsLoading(true); // Démarrage du chargement
      const token = localStorage.getItem("token");
      console.log("Token récupéré :", token); // Log pour voir si le token est disponible

      if (!token) {
        console.log("Aucun token trouvé. L'utilisateur doit se connecter.");
        setUser(null);
        setIsLoading(false); // Fin du chargement
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
          console.log("Session valide. Utilisateur :", data.user); // Vérifie que les données utilisateur sont valides
          setUser(data.user);
        } else {
          console.log("Session invalide ou expirée. Nettoyage.");
          localStorage.removeItem("token");
          setUser(null);
        }
      } catch (error) {
        console.error("Erreur lors de la validation de la session :", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsLoading(false); // Fin du chargement
      }
    };

    validateSession();
  }, []);

  console.log("Utilisateur actuel dans ContentApp :", user); // Log général pour suivre l'utilisateur

  if (isLoading) {
    return <p>Chargement...</p>; // Affiche un message pendant le chargement des données
  }

  return (
    <div>
      {/* Affiche le header sauf pour certaines routes */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header user={user} />}
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
