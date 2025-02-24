import React from "react";
import "../styles/StudentHome.css"

const StudentHome = ({ studentName, studentPic, studentCourses=[]})=> {
      // Vérifiez si on recupere bien les cours ici
     // console.log('Student Courses in StudentHome:', studentCourses);
  return (
    <div className="home-container">
      <img className="avatar" src={studentPic} alt="Student Pic" />
      <h1>Bonjour, {studentName}!</h1>
      <h2 className="border-radius" >MES COURS</h2>
      <ul className="courses-list">
        {//fonction map permet de parcourir les elements du tableau 
        }
        {studentCourses.map(course => (
          <li className="courses-list" key={course}>{course}</li>
        ))}
      </ul>
    </div>
  );
};
export default StudentHome;
