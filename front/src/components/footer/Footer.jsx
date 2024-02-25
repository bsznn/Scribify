import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Logo from "../../assets/images/logo/logo.png";
import "../../assets/styles/footer/footer.css";

import lune1 from "../../assets/images/forms/sun.png";
import fond from "../../assets/images/forms/8.png";

const Footer = () => {
  const handleExternalLink = (externalUrl) => {
    window.location.href = externalUrl;
  };

  return (
    <footer>
      <section className="f-main-section">
        <section className="f-first-section">
          <img src={lune1} alt="lune-fond" className="lune-left" />

          <article className="f-article1">
            <span className="f-logo">
              <Link to="/a-propos" className="aboutus">
                <h3 className="footer-logo">À Propos</h3>
                <img src={Logo} alt="logo" />
              </Link>
            </span>

            <p>
              Bienvenue sur Scribify, un espace dédié à l'exploration des mondes
              imaginaires et des émotions à travers l'écriture. Découvrez des
              histoires uniques, des réflexions profondes et rejoignez cette
              aventure littéraire.
            </p>
          </article>

          <article className="f-article2">
            <h3>Liens utiles</h3>

            <ul>
              <li>
                <Link to="/faq" className="f-link">
                  Foire aux Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="f-link">
                  Nous Contacter
                </Link>
              </li>

              <li>
                <Link to="/politique-confidentialite" className="f-link">
                  Politique de Confidentialité
                </Link>
              </li>

              <li>
                <Link to="/conditions-utilisation" className="f-link">
                  Conditions d'Utilisation
                </Link>
              </li>
            </ul>
          </article>

          <article className="f-article3">
            <h3>Suivez-Nous</h3>
            <ul>
              <li>
                <button
                  className="f-icon1"
                  onClick={() => handleExternalLink("https://www.facebook.com")}
                >
                  <FaFacebookSquare />
                </button>
              </li>
              <li>
                <button
                  className="f-icon2"
                  onClick={() => handleExternalLink("https://www.twitter.com")}
                >
                  <FaTwitterSquare />
                </button>
              </li>
              <li>
                <button
                  className="f-icon3"
                  onClick={() =>
                    handleExternalLink("https://www.instagram.com")
                  }
                >
                  <FaSquareInstagram />
                </button>
              </li>
              <li>
                <button
                  className="f-icon4"
                  onClick={() => handleExternalLink("https://fr.linkedin.com/")}
                >
                  <FaLinkedin />
                </button>
              </li>
            </ul>
          </article>
        </section>

        <section className="f-second-section">
          <p>© 2024 Scribify. Tous droits réservés</p>
        </section>

        <img src={fond} alt="couleur-fond" className="vert-fond" />
      </section>
    </footer>
  );
};

export default Footer;
