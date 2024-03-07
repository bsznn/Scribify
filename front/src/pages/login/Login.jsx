import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/forms/forms.css";
import imageForm from "../../assets/images/forms/form2.png";

const Login = () => {
  // État local pour gérer les valeurs des champs de formulaire et les erreurs
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(); // Gestion de l'erreur
  const auth = useAuth(); // Utilisation du contexte d'authentification
  const navigate = useNavigate(); // Utilisation du hook de navigation

  // Fonction pour gérer les changements dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr(); // Réinitialisation de l'erreur lors de la saisie
  };

  // Fonction pour soumettre le formulaire de connexion
  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérification si les champs sont remplis
    if (inputs.email.trim() === "" || inputs.password.trim() === "") {
      return setErr("Veuillez remplir tous les champs.");
    }
    // Appel à l'API pour authentifier l'utilisateur
    axios
      .post("http://localhost:9000/login", inputs)
      .then((res) => {
        if (res.data.token) {
          auth.login(res.data); // Authentification réussie, mise à jour du contexte d'authentification
          navigate("/"); // Redirection vers la page d'accueil
        }
      })
      .catch((error) => {
        console.log(error);
        // Gestion des erreurs d'authentification
        if (error.response && error.response.status === 401) {
          window.alert("Identifiant ou mot de passe incorrect");
        } else {
          window.alert(
            "Une erreur s'est produite. Veuillez réessayer plus tard."
          );
        }
      });
  };

  // Rendu du composant Login
  return (
    <main>
      <section className="section-style">
        {/* Section gauche avec un message et une image */}
        <article className="login-left">
          <p className="login-text">
            Connectez-vous dès maintenant pour profiter de notre plateforme.
          </p>
          <img src={imageForm} alt="form-image" className="form-image" />
        </article>

        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit} className="form-style">
          <h2 className="login-mobile">Connexion</h2>
          <label htmlFor="email">Email :</label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={inputs.email}
            placeholder="azerty@azerty.fr"
          />
          <label htmlFor="password">Mot de passe :</label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={inputs.password}
            placeholder="Mot de passe"
          />

          {/* Bouton de soumission */}
          <button className="form-button">Se connecter</button>

          {/* Lien vers la page d'inscription */}
          <p className="text-signup">
            Pas de compte ?
            <Link to="/s-inscrire" className="login-redirection">
              Inscrivez-vous !
            </Link>
          </p>

          {/* Affichage des erreurs */}
          {err && <span>{err}</span>}
        </form>
      </section>
    </main>
  );
};

export default Login;
