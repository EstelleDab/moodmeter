import React, { useState } from "react";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import StudentHome from "./StudentHome";
import Student from "../models/Student";

const Home = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [Student, setStudent] = useState(null); 

  
  const handleFormSwitch = (formType) => {
    if (formType === "login") {
      setIsLoginPage(true);
      setIsSignup(false);
    } else if (formType === "signup") {
      setIsSignup(true);
      setIsLoginPage(false);
    }
  };

  
  const handleStudentLogin = (studentData) => {
    setStudent(studentData); 
    setIsLoginPage(false); 
    setIsSignup(false); 
  };

  return (
    <div>
      {isSignup ? (
        <RegisterForm onSwitch={() => handleFormSwitch("login")} /> 
      ) : isLoginPage ? (
        <LoginForm onSwitch={() => handleFormSwitch("signup")} onLoginSuccess={handleStudentLogin} /> 
      ) : (
        Student && <StudentHome studentName={Student.name} studentPic={Student.pic} /> 
      )}
    </div>
  );
};

export default Home;
