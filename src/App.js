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
  const location = useLocation(); // Hook to detect current route
  const [user, setUser] = useState(null);
    
  useEffect(() => {
    // Vérification des donnees en stock
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Réinitialise les données utilisateur
    }
  }, []);
  // Routes where the Header should not appear
  const hideHeaderRoutes = ["/login", "/register"];

  return (
    <div>
      {/* Show Header unless the current route matches hideHeaderRoutes */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        {/* Route protégée pour UserHome */}
        <Route
          path="/userhome"
          element={
            <ProtectedRoute user={user} role="eleve">
              <UserHome />
            </ProtectedRoute>
          }
        />

        {/* Route protégée pour Feedback */}
        <Route
          path="/feedback"
          element={
            <ProtectedRoute user={user} role="eleve">
              <FeedbackForm />
            </ProtectedRoute>
          }
        />

        {/* Route protégée pour Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} role="enseignant">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Routes accessible par tout le monde */}
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/login" element={<LoginForm onLoginSuccess={setUser} />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Route pour Feedback avec paramètre (accessible uniquement aux étudiants) */}
        <Route
          path="/feedback/:ueId"
          element={
            <ProtectedRoute user={user} role="eleve">
              <FeedbackForm />
            </ProtectedRoute>
          }
        />

        {/* Route pour accès non autorisé */}
        <Route path="/unauthorized" element={<UnAuthorized />} />

      </Routes>
    </div>
  );
};

export default App;
