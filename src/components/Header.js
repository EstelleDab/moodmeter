import React, { useState } from 'react';
import "../styles/Header.css";
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Assurez-vous d'importer Bootstrap JavaScript

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
    setDropdownOpen(false); // Ferme le menu déroulant lorsque le hamburger menu est togglé
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false); // Ferme le menu déroulant lorsque l'un des éléments du menu est cliqué
  };

  const handleDropdownToggle = (e) => {
    e.preventDefault(); // Empêche l'action par défaut du lien
    e.stopPropagation(); // Empêche la propagation de l'événement
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header mt-5 ml-5 mr-5">
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
        <div className={`position-absolute end-0 mt-5 top-0 collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
  
        {/* Contenu de la barre de navigation */}
          <ul className="navbar-nav p-3 rounded-4 mt-n5">
            <li className={`nav-item dropdown ${dropdownOpen ? 'd-block' : ''}`}>
              <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" aria-expanded={dropdownOpen} onClick={handleDropdownToggle}>
                Mes cours
              </a>
              <ul className={`dropdown-menu border-0 bg-light position-absolute top-100 start-0 ${dropdownOpen ? 'd-block' : 'd-none'}`} aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">UEL 314</a></li>
                <li><a className="dropdown-item" href="#">UEL 315</a></li>
                <li><a className="dropdown-item" href="#">UEL 316</a></li>
              </ul>
            </li>
            <li className="nav-item" onClick={handleMenuItemClick}>
              <a className="nav-link" href="#">
                Recap'
              </a>
            </li>
            <li className="nav-item" onClick={handleMenuItemClick}>
              <a className="nav-link" href="#">
                Mon profil
              </a>
            </li>
            <li className="nav-item" onClick={handleMenuItemClick}>
              <a className="nav-link" href="#" tabIndex="-1" aria-disabled="true">
                Me déconnecter
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
