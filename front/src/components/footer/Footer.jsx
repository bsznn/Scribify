import React from "react"; // Importation de React
import { Link } from "react-router-dom"; // Importation de Link depuis react-router-dom
import { FaFacebookSquare } from "react-icons/fa"; // Importation des icônes Facebook
import { FaSquareInstagram } from "react-icons/fa6"; // Importation des icônes Instagram
import { FaTwitterSquare } from "react-icons/fa"; // Importation des icônes Twitter
import { FaLinkedin } from "react-icons/fa"; // Importation des icônes LinkedIn
import Logo from "../../assets/images/logo/logo.png"; // Importation du logo
import "../../assets/styles/footer/footer.css"; // Importation des styles CSS

import lune1 from "../../assets/images/forms/sun.png"; // Importation de l'image de fond du pied de page
import lune2 from "../../assets/images/forms/sun.png"; // Importation de l'image de fond du pied de page

// Définition du composant Footer
const Footer = () => {
  // Fonction pour ouvrir des liens externes dans une nouvelle fenêtre
  const handleExternalLink = (externalUrl) => {
    window.location.href = externalUrl;
  };

  return (
    <footer>
      {/* Section principale du pied de page */}
      <section className="f-main-section">
        {/* Première section du pied de page */}
        <section className="f-first-section">
          {/* Image de fond de la première section */}
          <img src={lune1} alt="lune-fond" className="lune-left" />

          {/* Article de présentation */}
          <article className="f-article1">
            {/* Logo et lien vers la page À Propos */}
            <span className="f-logo">
              <Link to="/a-propos" className="aboutus">
                <h3 className="footer-logo">À Propos</h3>
                <img src={Logo} alt="logo" />
              </Link>
            </span>

            {/* Description de l'entreprise */}
            <p>
              Bienvenue sur Scribify, un espace dédié à l'exploration des mondes
              imaginaires et des émotions à travers l'écriture. Découvrez des
              histoires uniques, des réflexions profondes et rejoignez cette
              aventure littéraire.
            </p>
          </article>

          {/* Liens utiles */}
          <article className="f-article2">
            <h3>Liens utiles</h3>
            <ul>
              <li>
                <Link to="/contact" className="f-link">
                  Contact{" "}
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="f-link">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="f-link">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link to="/faq" className="f-link">
                  FAQ
                </Link>
              </li>
            </ul>
          </article>

          {/* Réseaux sociaux */}
          <article className="f-article3">
            <h3>Suivez-Nous</h3>
            <ul>
              {/* Bouton pour Facebook */}
              <li>
                <button
                  className="f-icon1"
                  onClick={() => handleExternalLink("https://www.facebook.com")}
                >
                  <FaFacebookSquare />
                </button>
              </li>
              {/* Bouton pour Twitter */}
              <li>
                <button
                  className="f-icon2"
                  onClick={() => handleExternalLink("https://www.twitter.com")}
                >
                  <FaTwitterSquare />
                </button>
              </li>
              {/* Bouton pour Instagram */}
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
              {/* Bouton pour LinkedIn */}
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

        {/* Deuxième section du pied de page */}
        <section className="f-second-section">
          {/* Texte de droits d'auteur */}
          <p>© 2024 Scribify. Tous droits réservés</p>
        </section>
      </section>
      {/* Image de fond pour le pied de page */}
      <img src={lune2} alt="couleur-fond" className="lune-right" />
    </footer>
  );
};

// Exportation du composant Footer
export default Footer;
