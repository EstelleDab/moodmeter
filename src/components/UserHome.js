import React, {useState, useEffect} from "react";
import "../styles/User.css";
import "../bootstrap.css";


const UserHome = ()=> {
  const [userDetails, setUserDetails]= useState(null);
  
  useEffect(()=>{
    fetch('http://localhost:5000/Userhome', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then((response)=> response.json())
    .then((userDetails)=> {
      console.log('details récupérés:', userDetails);
      setUserDetails(userDetails);
    })
    .catch((error)=> {
      console.log.error( 'ah, une erreur lors de la récupération de votre utilisateur!', error);
    });
  }, []);
 
  if (!userDetails) {
    return <p>Chargement des données...</p>;
  }

  const UserName=`${userDetails.prenom}` ;
  const UserPic= userDetails.image || 'images/user.png';
  const UserCourses= userDetails.promotion?.ues.map((ue) => ue.nom) || [];
  
      // Vérifiez si on recupere bien les cours ici
     // console.log('User Courses in UserHome:', UserCourses);
  return (
    <div>
      <div className="home-container">
       <img className="avatar" src={UserPic} alt="User Pic" />
        <h1>Bonjour, { UserName}!</h1>
        <h2 className="border-radius" >MES COURS</h2>
        <ul className="courses-list">
          {//fonction map permet de parcourir les elements du tableau 
          }
          {UserCourses.map((course, index) => (
            <li className="courses-list-item" key={index}>
              {course}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserHome;
