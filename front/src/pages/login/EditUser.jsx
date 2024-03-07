import React, { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../../context/token"; // Import du token pour l'authentification
import { useNavigate, useParams } from "react-router-dom"; // Import des hooks de navigation
import "../../assets/styles/forms/forms.css"; // Import des styles pour le formulaire

import rotate from "../../assets/images/forms/lune.png"; // Import des images pour l'animation
import rotate2 from "../../assets/images/forms/lune2.png";

// Constante pour la longueur maximale de la description
const MAX_DESCRIPTION_LENGTH = 250;

const EditUser = () => {
  // State pour les inputs du formulaire et les messages d'erreur
  const [inputs, setInputs] = useState({
    login: "",
    email: "",
    description: "",
    image: null,
  });

  const navigate = useNavigate(); // Hook pour la navigation
  const { id } = useParams(); // Récupération des paramètres de l'URL

  const [err, setErr] = useState(); // State pour les erreurs
  const [descriptionError, setDescriptionError] = useState(false); // State pour les erreurs de description

  useEffect(() => {
    // Effect pour charger les données de l'utilisateur à éditer
    axios
      .get(`http://localhost:9000/users/${id}`, { headers: token() }) // Requête GET pour récupérer les données de l'utilisateur
      .then((res) => {
        setInputs(res.data); // Met à jour les inputs avec les données de l'utilisateur
      })
      .catch((err) => {
        setErr(
          "Une erreur est survenue lors de la récupération de l'utilisateur."
        );
      });
  }, []);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      if (value.length <= MAX_DESCRIPTION_LENGTH) {
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
        setDescriptionError(false); // Réinitialise l'erreur de description si la longueur est correcte
      } else {
        setDescriptionError(true); // Active l'erreur si la longueur de la description dépasse la limite
      }
    } else if (name === "image") {
      setInputs((prevInputs) => ({ ...prevInputs, image: e.target.files[0] }));
    } else {
      setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    }

    setErr(""); // Efface les messages d'erreur
  };

  // Fonction pour soumettre le formulaire d'édition d'utilisateur
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      inputs.login.trim() === "" ||
      inputs.email.trim() === "" ||
      inputs.description.trim() === ""
    ) {
      return alert("Merci de renseigner au moins un champ !");
    }

    if (descriptionError) {
      return alert("La description ne peut pas dépasser 250 caractères.");
    }

    const formData = new FormData(); // Crée un objet FormData pour envoyer les données du formulaire

    // Ajoute les données du formulaire à l'objet FormData
    formData.append("login", inputs.login);
    formData.append("email", inputs.email);
    formData.append("description", inputs.description);
    formData.append("image", inputs.image);

    axios
      .put(`http://localhost:9000/users/edit/${id}`, formData, {
        headers: token(),
      }) // Requête PUT pour mettre à jour les données de l'utilisateur
      .then((res) => {
        setInputs((prevInputs) => ({
          ...prevInputs,
          login: "",
          email: "",
          description: "",
          image: null,
        }));
        userData(res); // Met à jour les données de l'utilisateur dans le localStorage
        alert("Vos informations ont bien été modifiées !");
        navigate("/profil"); // Redirige vers la page de profil après la modification
      })
      .catch((err) => {
        return alert(
          "Une erreur est survenue lors de la modification de vos données."
        );
      });
  };

  // Fonction pour mettre à jour les données de l'utilisateur dans le localStorage
  const userData = (res) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const newUser = {
      ...currentUser,
      _id: res.data._id,
      email: res.data.email,
      login: res.data.login,
      description: res.data.description,
      image: res.data.image,
      role: res.data.role,
      token: currentUser.token,
    };
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <main>
      {err && <span>{err}</span>}

      <section className="section-style2" id="section-detail">
        {inputs && (
          <>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="form-style2"
            >
              <img src={rotate} alt="rotate-gif" className="rotate-gif1" />{" "}
              {/* Image de rotation pour le style */}
              <img src={rotate2} alt="rotate-gif" className="rotate-gif2" />
              <h2>Modifier un utilisateur</h2>
              <label htmlFor="image">Image de profil : </label>
              <input
                className="file-input"
                onChange={handleChange}
                type="file"
                id="image"
                name="image"
              />
              <label htmlFor="login">Nom d'utilisateur : </label>
              <input
                className="form-input2"
                onChange={handleChange}
                value={inputs.login}
                type="text"
                id="login"
                name="login"
                placeholder="Nom d'utilisateur"
              />
              <label htmlFor="email">Email : </label>
              <input
                className="form-input2"
                onChange={handleChange}
                value={inputs.email}
                type="email"
                id="email"
                name="email"
                placeholder="Adresse Mail"
              />
              <label htmlFor="description">Description : </label>
              <textarea
                className="form-textarea"
                onChange={handleChange}
                value={inputs.description}
                type="text"
                id="description"
                name="description"
                placeholder="description"
              />
              <button className="form-button">Valider</button>
            </form>
          </>
        )}
      </section>
    </main>
  );
};

export default EditUser;
