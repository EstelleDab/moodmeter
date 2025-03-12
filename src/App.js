import React from "react";
import UserHome from "./components/UserHome.js";
import FeedbackForm from "./components/FeedbackForm.js";
import Home from "./components/Home.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";



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
        <Route path="/userhome" element={<UserHome />} />
      </Routes>
    </Router>

    </div>

  );
};

export default App;

