import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importation pour la navigation
import "../styles/Header.css";
import '../bootstrap.css';

function Header({ user, handleLogout }) { // Recevoir `user` et `handleLogout` en props
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [courses, setCourses] = useState([]); // Tableau vide initialement
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    fetch('http://localhost:5000/Userhome', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.promotion && data.promotion.ues) {
          setCourses(data.promotion.ues); // Stockage des cours récupérés
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des cours :", error);
        setIsLoading(false);
      });
  }, []);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
    setDropdownOpen(false); // Ferme le menu déroulant lorsque le hamburger menu est togglé
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false); // Ferme le menu déroulant lorsque l'un des éléments du menu est cliqué
  };

  const handleDropdownToggle = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Évite la propagation de l'événement
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header mt-3 ml-5 mr-5">
      <nav className="navbar w-100">
        <div className="navbar">
          <a className="order-1 flex-fill" href="#">
            <img className="header-logo" src="/images/logo.png" alt="logo" />
          </a>
        </div>
        <button
          className={`navbar-toggler mt-5 position-absolute top-0 end-0 ${menuOpen ? 'hidden' : ''}`}
          id="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`position-absolute end-0 mt-5 top-0 collapse navbar-collapse ${
            menuOpen ? 'show' : ''
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav p-3 rounded-4 mt-n5">
            <li className={`nav-item dropdown ${dropdownOpen ? 'd-block' : ''}`}>

            </li>
            <li className="nav-item">
              <button
                className="btn-link nav-link"
                onClick={handleLogout} // Utilise la fonction reçue depuis App.js
                tabIndex="-1"
                aria-disabled="false"
              >
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
