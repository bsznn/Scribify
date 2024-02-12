import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../assets/styles/forms/forms.css";
import imageForm from "../../assets/images/forms/form2.png";

const Register = () => {
  const [inputs, setInputs] = useState({
    login: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.email.trim() === "" ||
      inputs.password.trim() === "" ||
      inputs.login.trim() === ""
    ) {
      return setErr("Veuillez remplir tous les champs.");
    }
    axios
      .post("http://localhost:9000/register", inputs)
      .then((res) => {
        navigate("/se-connecter");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          window.alert("Identifiant ou mot de passe incorrect");
        } else {
          window.alert(
            "Une erreur s'est produite. Veuillez réessayer plus tard."
          );
        }
      });
  };

  return (
    <main>
      <section className="section-style">
        <article className="login-left">
          <p className="login-text">
            Inscrivez-vous dès maintenant pour profiter de notre plateforme.
          </p>
          <img src={imageForm} alt="form-image" className="form-image" />
        </article>
        <form onSubmit={handleSubmit} className="form-style">
          <h2>Inscription</h2>
          <label htmlFor="login">Nom d'utilisateur :</label>
          <input
            className="form-input"
            type="login"
            name="login"
            id="login"
            onChange={handleChange}
            value={inputs.login}
            placeholder="azerty"
          />
          <label htmlFor="email">Adresse mail :</label>
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
          <button className="form-button">S'inscrire</button>

          <p className="text-signup">
            Déjà inscrit ?
            <Link to="/se-connecter" className="login-redirection">
              Connectez-vous !
            </Link>
          </p>

          {err && <span>{err}</span>}
        </form>
      </section>
    </main>
  );
};

export default Register;
