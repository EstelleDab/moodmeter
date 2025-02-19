const StudentHome = ({studentName, studentPic}) => {
    return (
      <div>
        <img src={studentPic}></img>
        <h1>Bonjour, {studentName} </h1>
        <p>Bienvenue sur la page d'accueil des étudiants.</p>
        {/* Autres éléments ou composants */}
      </div>
    );
  };
  
  export default StudentHome