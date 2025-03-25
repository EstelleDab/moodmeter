import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import "../bootstrap.css";




const RegisterForm = ({ onSwitch }) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("eleve");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  //gestion des redirections
  const navigate = useNavigate();
  // Vérification de l'email
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Veuillez entrer un email valide.");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom, pseudo, email, role, password }),
      });

      console.log(response);

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Inscription réussie !");
      onSwitch();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className=" container d-flex flex-column mb-0">
      <div className="d-flex justify-content-center mt-5">
        <img className="login-logo pt-5" src="/images/logo.png" alt="logo" />
      </div>
      <div className=" login-container container d-flex flex-column align-items-center rounded-5  pt-4 pb-3 mt-0">
        <div className="login-container container d-flex flex-column align-items-center bg-success rounded-5  pt-4 pb-3">
          <h3 className="w-100 primary text-center">Crée ton compte !</h3>
          <br></br>

          {/* Nom Input */}
          <div className="d-flex flex-column  mb-3 pt-3 text-start w-75">
            <label className="form-label">Nom</label>
            <div className="input-group border rounded-pill bg-light">
              <span className="input-group-text bg-transparent border-0 ">
                <FaUser />
              </span>
              <input
                type="text"
                className="input-group-text form-control bg-transparent border-0 btn btn-outline-secondary"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
          </div>

          {/* Prénom Input */}
          <div className="d-flex flex-column  mb-3 pt-3 text-start w-75">
            <label className="form-label">Prénom</label>
            <div className="input-group border rounded-pill bg-light">
              <span className="input-group-text bg-transparent border-0 ">
                <FaUser />
              </span>
              <input
                type="text"
                className="input-group-text form-control bg-transparent border-0 btn btn-outline-secondary"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>
          </div>

          {/* Pseudo Input */}
          <div className="d-flex flex-column  mb-3 pt-3 text-start w-75">
            <label className="form-label">Pseudo</label>
            <div className="input-group border rounded-pill bg-light">
              <span className="input-group-text bg-transparent border-0 ">
                <FaUser />
              </span>
              <input
                type="text"
                className="input-group-text form-control bg-transparent border-0 btn btn-outline-secondary"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="d-flex-column mb-2 text-start pt-3 w-75">
            <label className="form-label">Email</label>
            <div className="input-group  border rounded-pill bg-light">
              <span className="input-group-text bg-transparent border-0">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="input-group-text form-control bg-transparent border-0 btn btn-outline-secondary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && <p className="text-danger">{emailError}</p>}
          </div>

          {/* Role Input (Select) */}
          <div className="d-flex-column mb-2 text-start pt-3 w-75">
            <label className="form-label">Rôle</label>
            <div className="input-group">
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="eleve">Étudiant</option>
                <option value="professeur">Professeur</option>
              </select>
            </div>
          </div>

          {/* Password Input */}
          <div className="d-flex-column mb-2 text-start pt-3 w-75">
            <label className="form-label">Mot de passe</label>
            <div className="input-group  border rounded-pill bg-light">
              <span className="input-group-text bg-transparent border-0">
                <FaLock />
              </span>
              <input
                type={passwordVisible ? "text" : "password"}
                className="input-group-text form-control bg-transparent border-0 btn btn-outline-secondary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn "
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                👁
              </button>
            </div>
            {passwordError && <p className="text-danger">{passwordError}</p>}
          </div>
          <div className="container d-flex flex-column align-items-center ">
          <button
              className="btn bg-secondary btn-outline-dark w-75 input-group-text border-0 mt-4"
              onClick={handleSubmit}
            >
              S'inscrire
            </button>
            <div className="w-100 d-flex flex-column align-items-center">
              <p className="mt-4">Déjà un compte ?</p>
              <button
                type="button"
                className="btn btn-link create-account-button"
                onClick={() => navigate("/login")}
              >Connecte-toi</button>
            </div>
          </div>
        </div>
    </div>
  </div>
  );
};


export default RegisterForm;
