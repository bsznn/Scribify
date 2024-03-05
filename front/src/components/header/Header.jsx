import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { RiMenu3Fill } from "react-icons/ri";
import { HiUser } from "react-icons/hi2";
import { GrClose } from "react-icons/gr";
import { GrLogout } from "react-icons/gr";
import { IoHome } from "react-icons/io5";

import Logo from "../../assets/images/logo/logo.png";
import userImage from "../../assets/images/users/default-profil.png";

import "../../assets/styles/header/header.css";

const Header = () => {
  const [toggle, setToggle] = useState(false); // État pour le menu déroulant
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // État pour la détection de l'appareil mobile
  const auth = useAuth(); // Authentification de l'utilisateur
  const navigate = useNavigate(); // Utilisé pour la navigation

  useEffect(() => {
    // Fonction pour gérer le redimensionnement de la fenêtre
    const handleResize = () => {
      // Mettre à jour l'état pour détecter si l'appareil est mobile en fonction de la largeur de la fenêtre
      setIsMobile(window.innerWidth < 1024);

      // Fermer le menu déroulant lorsque la fenêtre est agrandie (si la largeur de la fenêtre est supérieure ou égale à 1024 pixels)
      if (window.innerWidth >= 1024) {
        setToggle(false); // Mettre l'état du menu déroulant à false pour le fermer
      }
    };

    // Ajouter un écouteur d'événement pour le redimensionnement de la fenêtre
    window.addEventListener("resize", handleResize);

    // Nettoyer l'écouteur d'événement lorsque le composant est démonté pour éviter les fuites de mémoire
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Le tableau de dépendances est vide, ce qui signifie que cet effet ne dépend d'aucune variable et ne sera exécuté qu'une seule fois après le premier rendu du composant

  const handleClick = () => {
    setToggle(!toggle); // Gérer l'état du menu déroulant
  };

  const handleLogout = () => {
    auth.logout(); // Déconnexion de l'utilisateur
    navigate("/"); // Redirection vers la page d'accueil
  };

  return (
    <header>
      {/* Logo du site */}
      <span className="logo">
        <h1 className="logo-text">Scribify</h1>
        <img src={Logo} alt="logo" className="h-logo" />
      </span>

      {/* Bouton du menu déroulant */}
      <button onClick={handleClick} className="navbar_burger">
        {toggle ? <GrClose /> : <RiMenu3Fill />}
      </button>

      {/* Navigation principale */}
      <nav
        style={{
          display: isMobile ? (toggle ? "block" : "none") : "block",
        }}
        className="navbar_first"
      >
        <ul>
          {/* Liens pour les utilisateurs connectés */}
          {auth.user && (
            <li>
              <NavLink to="/" className="navbar_link">
                Accueil
              </NavLink>
            </li>
          )}

          {/* Liens pour tous les utilisateurs */}
          <li>
            <NavLink to="/livres" className="navbar_link">
              Livres
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" className="navbar_link">
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/auteurs" className="navbar_link">
              Auteurs
            </NavLink>
          </li>
          <li>
            <NavLink to="/lecteurs" className="navbar_link">
              Lecteurs
            </NavLink>
          </li>
          <li>
            <NavLink to="/publier" className="navbar_link">
              Publier
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Navigation secondaire */}
      <nav className="navbar_second">
        <ul>
          {/* Boutons pour les utilisateurs connectés */}
          {auth.user ? (
            <li>
              <span className="navbar_user">
                <NavLink to={"/profil"} className="navbar_link">
                  <span className="h-username">
                    {/* Image de profil de l'utilisateur */}
                    {auth.user.image ? (
                      <img
                        className="img-profil"
                        src={`http://localhost:9000/assets/img/${auth.user.image.src}`}
                        alt={auth.user.image.alt}
                      />
                    ) : (
                      <img
                        className="img-profil"
                        src={userImage}
                        alt="default-user-profile"
                      />
                    )}
                    {/* Nom d'utilisateur */}
                    <p className="h-login"> {auth.user.login}</p>
                  </span>
                </NavLink>
                {/* Bouton de déconnexion */}
                <button onClick={handleLogout} className="navbar_button">
                  <GrLogout className="header-icon" />
                  <p className="text">Se déconnecter</p>
                </button>
              </span>
            </li>
          ) : (
            /* Boutons pour les utilisateurs non connectés */
            <>
              <li className="nav-links-container">
                <NavLink to={"/"} className="navbar_link">
                  {/* Bouton Accueil */}
                  <span className="nav-home">
                    <IoHome className="header-icon" />
                    <p className="text-accueil">Accueil</p>
                  </span>
                </NavLink>
                {/* Bouton Se connecter */}
                <NavLink to={"/se-connecter"} className="navbar_link">
                  <span className="nav-login">
                    <HiUser className="header-icon" />
                    <p className="text">Se connecter</p>
                  </span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
