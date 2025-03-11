import Student from "../models/Student";

const StudentHome = ({student}) => {

    return (
      <div>
        <div>
          <img src={student.pic} alt={`${student.nom}'s picture`}/>
          <h1>Bonjour, {student.nom} </h1>
          <p>Bienvenue sur la page d'accueil des étudiants.</p>
          {/* Autres éléments ou composants */}
        </div>
      <div className="course-container">
        <h2>Mes cours</h2>
        <ul>
          {student.courses.map((course, index)=>(
            <li key={index}>{course}</li>
          ))}
        </ul>
        
      </div>
      </div>
    );
  
}
  export default StudentHome;