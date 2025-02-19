import React, { useState } from "react";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import StudentHome from "./StudentHome";
import Student from "../models/Student";

const Home = () => {
  const [isSignup, setIsSignup] = useState(false);
  //avoid having header on signup page
  const [isLoginPage, setIsLoginPage] = useState(true);
  const handleFormSwitch = () => {
    setIsSignup(!isSignup);
    setIsLoginPage(false);
  };

  return (
    <div>
      

      {isSignup ? (
        <RegisterForm onSwitch={handleFormSwitch} />
      ) : isLoginPage ?(
        <LoginForm onSwitch={handleFormSwitch} />
      ):(
        Student && <StudentHome studentName={Student.name} studentPic={Student.pic} />
      )}
    </div>
  );
};

export default Home;