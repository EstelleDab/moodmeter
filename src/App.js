import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import UserHome from "./components/UserHome.js";
import FeedbackForm from "./components/FeedbackForm.js";
import Home from "./components/Home.js";
import Student from "./models/Student.js";
import "./styles/Global.css";
import './bootstrap.css'; // Ensure the path is correct
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JavaScript


// Instance d'étudiant pour démonstration avec les cours par défaut
const testStudent = new Student("Jane Doe", "jane@example.com", "12345", "/images/user.png", ["UE L315", "UE L316", "UE L317"]);
console.log('testStudent courses:', testStudent.courses);
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
