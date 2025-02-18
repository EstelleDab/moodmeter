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
    <header className="header">
      <nav className="navbar">
        <div className="navbar-logo-container">
          <a className="navbar-logo" href="#">
            <img className="header-logo" src="/images/logo.png" alt="logo" />
          </a>
        </div>
        <button
          className={`navbar-toggler ${menuOpen ? 'hidden' : ''}`}
          id="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className={`nav-item dropdown ${dropdownOpen ? 'show' : ''}`}>
              <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" aria-expanded={dropdownOpen} onClick={handleDropdownToggle}>
                Mes cours
              </a>
              <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
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
