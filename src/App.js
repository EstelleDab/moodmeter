import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import UserHome from "./components/UserHome.js";
import FeedbackForm from "./components/FeedbackForm.js";
import Dashboard from './components/Dashboard';
import Home from "./components/Home.js";
import ResultatsIA from "./components/ResultatsIA.js";
import "./styles/Global.css";
import './bootstrap.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min'; 



const App = () => {
  return (
    <div>
    {/* Display header only if not on login or signup page*/}
    {/*!isLoginPage && !isSignup && <Header/>*/} 
    <Header/>   
   
   {/* Définition des différentes routes */}
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/feedback/:ueId" element={<FeedbackForm />} /> {/*route dynamique du formulaire de l ue cliquee*/}
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ia" element={<ResultatsIA />} />
      </Routes>
    </Router>


    </div>
  );
};

export default App;
