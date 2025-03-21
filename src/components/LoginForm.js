import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import "../styles/Global.css";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); // Gestion des erreurs de connexion

  const navigate = useNavigate();

  // Validation de l'email
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Réinitialisation des messages d'erreur
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    // Vérification des champs
    if (!validateEmail(email)) {
      setEmailError("Veuillez entrer un email valide.");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    try {
      // Appel API pour la connexion
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur de connexion");
      }

      const data = await response.json();
      console.log("Connexion réussie, utilisateur :", data.user);

      // Sauvegarde uniquement le token
      localStorage.setItem("token", data.token);

      // Appel API pour récupérer les détails utilisateur
      const userDetailsResponse = await fetch("http://localhost:5000/Userhome", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!userDetailsResponse.ok) {
        const userDetailsError = await userDetailsResponse.json();
        throw new Error(userDetailsError.message || "Erreur lors de la récupération des détails utilisateur");
      }

      const userDetails = await userDetailsResponse.json();
      console.log("Détails utilisateur récupérés :", userDetails);

      // Mise à jour de l'état utilisateur avec les données de l'utilisateur une fois la connexion réussie
      onLoginSuccess(userDetails);

      // Redirection selon le role de l'utilisateur
      if (data.user.role === "enseignant") {
        navigate("/dashboard");
      } else {
        navigate("/userhome");
      }
      alert("Connexion réussie !");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.message);
      setLoginError(error.message);
    }
  };

  
  return (
    <div className=" container d-flex flex-column mb-5">
      <div className="d-flex justify-content-center mt-3">
        <img className="login-logo pt-5" src="/images/logo.png" alt="logo" />
      </div>
    
    <div className="container d-flex flex-column mt-0">
      <div className="login-container container d-flex flex-column align-items-center bg-success rounded-5 mt-4 pt-4 pb-3">
        <h3 className="w-100 primary text-center">Connecte-toi !</h3>
        <form onSubmit={handleSubmit} className="d-flex flex-column mb-3 pt-3 text-start w-75">
          {/* Email */}
          <div className="d-flex-column mb-2 text-start pt-3 w-75 mx-auto">
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
                required
              />
            </div>
          </div>
          {emailError && <p className="text-danger">{emailError}</p>}

          {/* Mot de passe */}
          <div className="d-flex-column mb-2 text-start pt-3 w-75 mx-auto">
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
                required
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

          {/* Message d'erreur de connexion */}
          {loginError && <p className="text-danger text-center">{loginError}</p>}

          {/* Bouton de connexion */}
          <div className="container d-flex flex-column align-items-center">
            <button
              type="submit"
              className="btn-connexion btn bg-secondary rounded-pill mt-3 mb-2 text-center w-75"
            >
              Se connecter
            </button>
          </div>
        </form>

        {/* Lien pour créer un compte */}
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
    </div>
  );
};

export default LoginForm;
