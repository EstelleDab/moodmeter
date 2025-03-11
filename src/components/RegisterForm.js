import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Form.css";



const RegisterForm = ({ onSwitch }) => {
  const [nom, setNom] = useState("");
  const [prenom, setprenom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
        body: JSON.stringify({ nom, prenom, pseudo, email, password, role }),
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="login-container">
        <h3>Crée ton compte !</h3>
        <br></br>

        {/* Nom Input */}
        <div className="mb-3 text-start">
          <label className="form-label ms-5">Nom</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input
              type="text"
              className="form-control"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
        </div>

        {/* Prénom Input */}
        <div className="mb-3 text-start">
          <label className="form-label ms-5">Prénom</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input
              type="text"
              className="form-control"
              value={prenom}
              onChange={(e) => setprenom(e.target.value)}
            />
          </div>
        </div>

        {/* Pseudo Input */}
        <div className="mb-3 text-start">
          <label className="form-label ms-5">Pseudo</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input
              type="text"
              className="form-control"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-3 text-start">
          <label className="form-label ms-5">Email</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaEnvelope />
            </span>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {emailError && <p className="text-danger">{emailError}</p>}
        </div>

        {/* Role Input (Select) */}
        <div className="mb-3 text-start">
          <label className="form-label ms-5">Rôle</label>
          <div className="input-group">
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="étudiant">Étudiant</option>
              <option value="professeur">Professeur</option>
            </select>
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-3 text-start">
          <label className="form-label ms-5">Mot de passe</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              👁
            </button>
          </div>
          {passwordError && <p className="text-danger">{passwordError}</p>}
        </div>

        <button className="login-btn" onClick={handleSubmit}>
          S'inscrire
        </button>

        <p className="mt-3">
          Déjà un compte ?{" "}
          <a onClick={onSwitch}>
            <span className="create-account">Connecte-toi</span>
          </a>
        </p>
      </div>
    </div>
  );
};


export default RegisterForm;
