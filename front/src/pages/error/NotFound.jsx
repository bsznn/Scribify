import React from "react";
import imageForm from "../../assets/images/forms/form3.png";
import lune from "../../assets/images/forms/lune-error.png";

import { Link } from "react-router-dom";

// Composant de la page d'erreur 404
const NotFound = () => {
  return (
    <main>
      <section className="section-style">
        <article className="login-left">
          <img src={lune} alt="lune-image" className="lune-error" />
          <img src={imageForm} alt="form-image" className="form-image" />
        </article>

        {/* Section avec le message d'erreur et le lien vers l'accueil */}
        <article className="form-style" id="error-post">
          <h2>Erreur 404</h2>

          <p>
            Nous sommes désolés, mais la page que vous essayez de consulter
            n'existe pas. Il semble que vous ayez suivi un lien incorrect ou que
            la page ait été déplacée.
          </p>

          <p>
            Réesayez ou bien retournez à l'
            <Link to="/" className="error-link">
              accueil !
            </Link>{" "}
          </p>
        </article>
      </section>
    </main>
  );
};

export default NotFound;
