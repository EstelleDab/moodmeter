import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import StudentHome from "./components/StudentHome.js";
import FeedbackForm from "./components/FeedbackForm.js";
import Dashboard from './components/Dashboard';
import Home from "./components/Home.js";
import Student from "./models/Student.js";
import "./styles/Global.css";
import './bootstrap.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min'; 



const testStudent = new Student("Jane Doe", "jane@example.com", "12345", "/images/user.png", ["UE L315", "UE L316", "UE L317"]);
console.log('testStudent courses:', testStudent.courses);
const App = () => {
  return (
    <div>

      {}
      <Router>
        <Routes>
          <Route path="/" element={<Home student={testStudent} />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/studenthome" element={<StudentHome studentName={testStudent.name} studentPic={testStudent.pic} studentCourses={testStudent.courses} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
