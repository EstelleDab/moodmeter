import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import StudentHome from "./StudentHome";
import Student from "../models/Student";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = ({ student }) => {
  /*const [isSignup, setIsSignup] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);*/

  //const studentExists = student && student.name;

  /*const handleFormSwitch = () => {
    setIsSignup(!isSignup);
   setIsLoginPage(!isLoginPage);
  };*/

 

 return (
   <div>
     
     {/*isSignup ? (
       <RegisterForm onSwitch={handleFormSwitch} />
     ) : isLoginPage ? (
       <LoginForm onSwitch={handleFormSwitch} />
     ) : 
       studentExists && ((*/}
         <StudentHome
           studentName={student.name}
           studentPic={student.pic}
           studentCourses={student.courses}
         />
       
  
    </div>
    )};



export default Home;

