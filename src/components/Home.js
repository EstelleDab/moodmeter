import React, { useState } from "react";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserHome from "./UserHome";
import User from "../models/User";
import Header from "./Header";

const Home = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [User, setUser] = useState(null); 

  
  const handleFormSwitch = (formType) => {
    if (formType === "login") {
      setIsLoginPage(true);
      setIsSignup(false);
    } else if (formType === "signup") {
      setIsSignup(true);
      setIsLoginPage(false);
    }
  };

  
  const handleUserLogin = async (UserData) => {
    setUser(UserData); 
    setIsLoginPage(false); 
    setIsSignup(false); 
  };

  return (
    <div>
      {isSignup ? (

        <RegisterForm onSwitch={() => handleFormSwitch("login")} /> 
      ) : isLoginPage ? (
        <LoginForm onSwitch={() => handleFormSwitch("signup")} onLoginSuccess={handleUserLogin} /> 
      ) : (
        User && <UserHome UserName={User.name} UserPic={User.pic} /> 
      )}
    </div>
  );
};

export default Home;
