import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import UserHome from "./components/UserHome.js";
import FeedbackForm from "./components/FeedbackForm.js";
import Home from "./components/Home.js";
import User from "./models/User.js";
import "./styles/Global.css";
import './bootstrap.css'; // Ensure the path is correct
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JavaScript


// Instance d'étudiant pour démonstration avec les cours par défaut
const testUser = new User("Jane Doe", "jane@example.com", "12345", "/images/user.png", ["UE L315", "UE L316", "UE L317"]);
console.log('testUser courses:', testUser.courses);
const App = () => {
  return (
    <div>

      {/* TestHome for testing purpose */}
      <Router>
        <Routes>
          <Route path="/" element={<Home User={testUser} />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/Userhome" element={<UserHome UserName={testUser.name} UserPic={testUser.pic} UserCourses={testUser.courses} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
