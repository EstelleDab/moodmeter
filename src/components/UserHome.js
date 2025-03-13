
import React, {useState, useEffect} from "react";
import "../styles/User.css";
import "../bootstrap.css";
import Header from "./Header";

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
      <Header />
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
=======
import React, {useEffect, useState} from "react";
import fetchUserDetails  from "./services/userService.js";

const UserHome = () => {
 const [user, setUser]=useState(null); //constante pour stocker les détails de l utilisateur
    useEffect(()=>{
      const getUserDetails= async()=> {
        const details= await fetchUserDetails();
        setUser(details);
        };
        getUserDetails();
    },[]);

    if (!user) {
      return <div>Chargement des données de l'utilisateur</div>;
    }
    else {return (
    <div>
        <div>
          <img src={user.pic} alt={`${user.nom}'s picture`}/>
          <h1>Bonjour, {user.nom} </h1>
          <p>Bienvenue sur la page d'accueil des étudiants.</p>
          {/* Autres éléments ou composants */}
        </div>
      <div className="course-container">
        <h2>Mes cours</h2>
        <ul>
          {user.UEs.map((UE, index)=>(
            <li key={index}>{UE}</li>
          ))}
        </ul>
        
      </div>
      </div>
    );
  
    }
}
  export default UserHome;
>
