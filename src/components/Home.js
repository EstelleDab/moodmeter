import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import StudentHome from "./StudentHome";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";


const Home = ({ student }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);

  const studentExists = student && student.name;

  const handleFormSwitch = () => {
    setIsSignup(!isSignup);
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div>
      {isSignup && (
        <RegisterForm onSwitch={handleFormSwitch} /> //si page d inscription
      )}
      
      {isLoginPage && (
        <LoginForm onSwitch={handleFormSwitch} /> //si page de connexion
      )}
    
       {!isSignup && !isLoginPage && studentExists &&  ( //si etudiant existe (connecté) alors affiche
        <>
            <Header />
            <StudentHome
              studentName={student.name}
              studentPic={student.pic}
              studentCourses={student.courses}
            />
        </>
      )}
    </div>
  );
};

export default Home;
