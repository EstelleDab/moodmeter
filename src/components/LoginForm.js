import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import "../styles/Global.css";

const LoginForm = ({ onLoginSuccess }) => {
  console.log("LoginForm props:", { onLoginSuccess });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate(); // Pour gérer la navigation

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
      console.log("API Response Data:", data);

      if (!response.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);
      console.log("Rôle stocké dans le localStorage:", localStorage.getItem("userRole"));

      const userDetailsFetch = await fetch("http://localhost:5000/Userhome", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      });

      const userDetails = await userDetailsFetch.json();
      if (!userDetailsFetch.ok) throw new Error(userDetails.message);

      onLoginSuccess(userDetails);

      if (data.user.role === "enseignant") {
        navigate("/dashboard");
      } else {
        navigate("/userhome");
      }

      alert("Connexion réussie !");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container d-flex flex-column mb-5">
      <div className="login-container container d-flex flex-column align-items-center bg-success rounded-5 mt-4 pt-4 pb-3">
        <h3 className="w-100 primary text-center">Connecte-toi !</h3>
        <form onSubmit={handleSubmit} className="d-flex flex-column mb-3 pt-3 text-start w-75">
          <label className="form-label">Email</label>
          <div className="input-group rounded-pill bg-light">
            <span className="input-group-text bg-transparent">
              <FaUser />
            </span>
            <input
              type="email"
              className="input-group-text form-control bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {emailError && <p className="text-danger">{emailError}</p>}
       

        <div className="d-flex-column mb-2 text-start pt-3 w-75">
          <label className="form-label">Mot de passe</label>
          <div className="input-group rounded-pill bg-light">
            <span className="input-group-text bg-transparent">
              <FaLock />
            </span>
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-secondary w-25 input-group-text bg-transparent border-0 mt-1"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              👁
            </button>
          </div>
          {passwordError && <p className="text-danger">{passwordError}</p>}
        </div>

        <div className="container d-flex flex-column align-items-center">
          <p className="pt-3 text-center text-muted small">Mot de passe oublié ?</p>
          <button
            type="submit"
            className="btn-connexion btn bg-secondary rounded-pill mt-3 mb-2 text-center w-75"
          >
            Se connecter
          </button>
        </div>
        </form>
          <div className="d-flex flex-column align-items-center">
            <p className="mt-3">Pas de compte ?</p>
            <button
              type="button"
              className="btn btn-link create-account-button"
              onClick={() => navigate("/register")}
            >
              Créez-en un !
            </button>
          </div>
        </div>
      </div>
  );
};

export default LoginForm;
