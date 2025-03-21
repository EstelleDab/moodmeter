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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/feedback/:ueId" element={<FeedbackForm />} /> {/*route dynamique du formulaire de l ue cliquee*/}
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ia" element={<ResultatsIA />} />
      </Routes>
    </Router>
  );
};

const ContentApp = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const hideHeaderRoutes = ["/login", "/register"];

  // Validation de la session au démarrage (via le token)
  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem("token");
      console.log("Token récupéré :", token); // Log pour voir si le token est disponible

      if (!token) {
        console.log("Aucun token trouvé. L'utilisateur doit se connecter.");
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
        setIsLoading(false);
      }
    };

    validateSession();
  }, []);

  console.log("Utilisateur actuel dans ContentApp :", user); // Log général pour suivre l'utilisateur

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      {!hideHeaderRoutes.includes(location.pathname) && <Header user={user} />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user} setUser={setUser}>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* route dynamique */}
        <Route
          path="/feedback/:ueId"
          element={
            <ProtectedRoute user={user} role="eleve">
              <FeedbackForm />
            </ProtectedRoute>
          }
        /> 
         <Route
          path="/feedback"
          element={
            <ProtectedRoute user={user} role="eleve">
              <FeedbackForm />
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/userhome"
          element={
            <ProtectedRoute user={user} role="eleve">
              <UserHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} role="enseignant">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/*<Route
          path="/ia"
          element={
            <ProtectedRoute user={user} role="enseignant">
              <ResultatsIA />
            </ProtectedRoute>
          }
        />*/}
        <Route path="/login" element={<LoginForm onLoginSuccess={setUser} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/unauthorized" element={<UnAuthorized user={user} />} />
      </Routes>
    </div>
  );
};


export default App;
