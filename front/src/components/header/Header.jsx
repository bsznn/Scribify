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
  const [toggle, setToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [searchActive, setSearchActive] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    setToggle(!toggle);
  };

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <header>
      <span className="logo">
        <h1 className="logo-text">Scribify</h1>
        <img src={Logo} alt="logo" className="h-logo" />
      </span>

      <button onClick={handleClick} className="navbar_burger">
        {toggle ? <GrClose /> : <RiMenu3Fill />}
      </button>

      <nav
        style={{
          display: isMobile ? (toggle ? "block" : "none") : "block",
        }}
        className="navbar_first"
      >
        <ul>
          {auth.user && (
            <li>
              <NavLink to="/" className="navbar_link">
                Accueil
              </NavLink>
            </li>
          )}

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

      <nav className="navbar_second">
        {/* <label className="search-container">
          <input
            type="text"
            className={searchActive ? "input-active" : "input"}
          />
          <IoSearchOutline
            className="header-icon"
            onClick={handleSearchClick}
          />
        </label> */}

        <ul>
          {auth.user ? (
            // {auth.user.role === "admin" && ( lien vers dashboard)}
            // Le lien sera dispo que si l'utilisateur est déconnecté
            <li>
              <span className="navbar_user">
                <NavLink
                  to={"/profil"}
                  className="navbar_link"
                  onClick={handleClick}
                >
                  <span className="h-username">
                    {/* METTRE UNE IMAGE PAR DEFAUT  */}
                    {auth.user.image ? (
                      <img
                        className="img-profil"
                        src={`http://localhost:9000/assets/img/${auth.user.image.src}`}
                        // alt="user-profile"
                      />
                    ) : (
                      <img
                        className="img-profil"
                        src={userImage}
                        alt="default-user-profile"
                      />
                    )}

                    <p className="h-login"> {auth.user.login}</p>
                  </span>
                </NavLink>
                <button onClick={handleLogout} className="navbar_button">
                  <GrLogout className="header-icon" />
                  <p className="text">Se déconnecter</p>
                </button>
              </span>
            </li>
          ) : (
            <>
              <li className="nav-links-container">
                <NavLink to={"/"} className="navbar_link" onClick={handleClick}>
                  <span className="nav-home">
                    <IoHome className="header-icon" />
                    <p className="text-accueil">Accueil</p>
                  </span>
                </NavLink>
                <NavLink
                  to={"/se-connecter"}
                  className="navbar_link"
                  onClick={handleClick}
                >
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
