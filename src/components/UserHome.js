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
      return <div>Chargement des données de l\'utilisateur</div>;
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