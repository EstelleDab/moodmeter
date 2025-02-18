import React, { useState } from "react";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Header from './components/Header.js';
import Student from "./models/Student.js";
import StudentHome from "./components/StudentHome.js";

const App = () => {
  const [isSignup, setIsSignup] = useState(false);
  //avoid having header on signup page
  const [isLoginPage, setIsLoginPage] = useState(true);
  const handleFormSwitch = () => {
    setIsSignup(!isSignup);
    setIsLoginPage(false);
  };

  return (
    <div>
    {/* Display header only if not on login or signup page*/}
    {/*!isLoginPage && !isSignup && <Header/>*/} 
       <Header/>
      
      

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

export default App;

