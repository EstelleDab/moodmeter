import React, { useState } from "react";
import { FaUser, FaLock} from "react-icons/fa";
import App from "../App";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Form.css";
import "../styles/Global.css";

const LoginForm = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
  
      localStorage.setItem("token", data.token);
      localStorage.setItem( "user", JSON.stringify(data.user));
      alert("Connexion réussie !");
    } catch (error) {
      alert(error.message);
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-logo-container">
        <img className="login-logo" src="/images/logo.png" alt="logo" />
      </div>
      <div className=" bg-light">
        <div className="login-container">
          <h3>Connecte-toi !</h3>
          <br></br>

          {/* Email Input */}
          <div className="mb-3 text-start">
            <label className="form-label">Email</label>
            <div className="input-group curve">
              <span className="input-group-text curve ">
                <FaUser />
              </span>
              <input
                type="email"
                className="form-control curve"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && <p className="text-danger">{emailError}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-2 text-start">
            <label className="form-label">Mot de passe</label>
            <div className="input-group curve">
              <span className="input-group-text curve">
                <FaLock />
              </span>
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary curve"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                👁
              </button>
            </div>
            {passwordError && <p className="text-danger">{passwordError}</p>}
          </div>

          <p className="text-center text-muted small">Mot de passe oublié ?</p>

          <button className="login-btn curve" onClick={handleSubmit}>
            Se connecter
          </button>
          <div className="registration">
            <p className="mt-3">
              Pas de compte ?{" "}
            </p>
              <a onClick={onSwitch}>
                <span className="create-account">Créez-en un !</span>
              </a>
           
          </div>
        </div>
    </div>
    </div>
  );
};

export default LoginForm;
