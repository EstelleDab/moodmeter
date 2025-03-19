import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import UserHome from "./components/UserHome.js";
import FeedbackForm from "./components/FeedbackForm.js";
import Dashboard from './components/Dashboard';
import Home from "./components/Home.js";
import LoginForm from "./components/LoginForm.js";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/Global.css";
import './bootstrap.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min'; 



const App = () => {
//définition du parametre role sur lequel repose la redirection et le controle d acces
  const [userRole, setUserRole] =useState(null);
  const handleLoginSuccess = (userRole) => {
    console.log("Rôle reçu dans handleLoginSuccess :", userRole);
    setUserRole(userRole);

  };
  useEffect(() => {
    console.log("Valeur actuelle de userRole :", userRole);
  }, [userRole]); // Cela se déclenchera chaque fois que userRole est mis à jour
  

  return (
    <div>
    {/* Display header only if not on login or signup page*/}
    {/*!isLoginPage && !isSignup && <Header/>*/} 
    <Header/>   
   
   {/* Définition des différentes routes */}
    <Router>
      <Routes>
        {/* Page de connexion */}
        <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />

        {/* Routes protégées */}
        <Route
          path="/userhome"
          element={
            <ProtectedRoute role="eleve" userRole={userRole}> {/*protection des routes en fonction du role de l'utilisateur*/}
              <UserHome />
            </ProtectedRoute>
          }
        />
           <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="enseignant" userRole={userRole}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/feedback/:ueId" element={<FeedbackForm />} /> {/*route dynamique du formulaire de l ue cliquee*/}
     
       
      </Routes>
    </Router>


    </div>
  );
};

export default App;
