import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/User.css";
import "../bootstrap.css";


const UserHome = ()=> {
  console.log("Token in UserHome:", localStorage.getItem("token"));

  const [userDetails, setUserDetails]= useState(null);
  const navigate= useNavigate(); 
  useEffect(()=>{
    fetch('http://localhost:5000/Userhome', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then((response)=> response.json())
    .then((userDetails)=> {
      localStorage.setItem('user', JSON.stringify(userDetails));
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
  const UserUes= userDetails.promotion?.ues.map((ue) => ({
    id: ue.id,
    nom: ue.nom,
  })) || [];
  
      // Vérifiez si on recupere bien les cours ici
     // console.log('User Courses in UserHome:', UserCourses);
//générer le lien correspondant à l'UE cliquée
  const handleUeClick = (ueId) => {
    navigate(`/feedback/${ueId}`); // Transmet dynamiquement l'ID de l'UE
  };

  return (
    <div>
      <div className="home-container">
       <img className="avatar" src={UserPic} alt="User Pic" />
        <h1>Bonjour, { UserName}!</h1>
        <h2 className="border-radius" >MES COURS</h2>
        <ul className="courses-list">
          {//fonction map permet de parcourir les elements du tableau 
          }
          {UserUes.map((ue) => (
            <li className="courses-list-item" key={ue.id} onClick={()=> handleUeClick(ue.id)}>
              {ue.nom}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserHome;
