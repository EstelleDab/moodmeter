import React, { useState } from "react";
import { FaUser, FaLock} from "react-icons/fa";
import App from "../App";
import "../styles/Form.css";
import "../styles/Global.css";


const LoginForm = ({ onSwitch, onLoginSuccess }) => {
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
      alert("Connexion réussie !");
    } catch (error) {
      alert(error.message);
    }
  };
  

  return (
    <div className=" container bg-light d-flex flex-column mb-5">
      <div className="d-flex justify-content-center">
        <img className="login-logo pt-5 " src="/images/logo.png" alt="logo" />
      </div>

      <div className=" login-container container d-flex flex-column align-items-center bg-success rounded-5  pt-4 pb-3">
        <h3 className="w-100 primary">Connecte-toi !</h3>
          {/* Email Input */}
        <div className="d-flex flex-column  mb-3 pt-3 text-start w-75">
          <label className="form-label">Email</label>
          <div className="input-group border rounded-pill bg-light">
            <span className="input-group-text bg-transparent border-0 ">
                <FaUser />
            </span>
            <input
              type="email"
              className="input-group-text form-control btn btn-outline-secondary  bg-transparent border-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
            {emailError && <p className="text-danger">{emailError}</p>}
        </div>

        {/* Password Input */}
        <div className="d-flex-column mb-2 text-start pt-3 w-75">
          <label className="form-label">Mot de passe</label>
            <div className="input-group  border rounded-pill bg-light">
              <span className="input-group-text bg-transparent border-0 ">
                <FaLock />
              </span>
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary w-75 input-group-text bg-transparent border-0 mt-1"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                👁
              </button>
            </div>
            {passwordError && <p className="text-danger">{passwordError}</p>}
        </div>
        <div className="container d-flex flex-column align-items-center ">
          <p className=" pt-3 text-center text-muted small">Mot de passe oublié ?</p>
          <button className="btn-connexion btn bg-secondary rounded-pill mt-3 mb-2 text-center w-75" onClick={handleSubmit}>Se connecter</button>
          <div className="d-flex flex-column align-items-center">
            <p className="mt-3">Pas de compte ?{" "}</p>
              <a onClick={onSwitch}>
                <span className="create-account ">Créez-en un !</span>
              </a>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default LoginForm;
