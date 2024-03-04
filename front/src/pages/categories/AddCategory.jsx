import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { token } from "../../context/token";

import "../../assets/styles/forms/forms.css";

import rotate from "../../assets/images/forms/lune.png";
import rotate2 from "../../assets/images/forms/lune2.png";

const MAX_DESCRIPTION_LENGTH = 250; // Longueur maximale autorisée pour la description

const AddCategory = () => {
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [err, setErr] = useState(); // État pour gérer les erreurs générales
  const [descriptionError, setDescriptionError] = useState(false); // État pour gérer les erreurs de description

  const navigate = useNavigate(); // Hook de navigation

  // Gestion du changement dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      // Vérification de la longueur de la description
      if (value.length <= MAX_DESCRIPTION_LENGTH) {
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
        setDescriptionError(false); // Aucune erreur de description
      } else {
        setDescriptionError(true); // Erreur de description
      }
    } else if (name === "image") {
      setInputs({ ...inputs, image: e.target.files[0] }); // Mise à jour de l'image
    } else {
      setInputs({ ...inputs, [name]: value }); // Mise à jour des autres champs
    }

    setErr(""); // Réinitialisation des erreurs
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputs.name.trim() === "" || inputs.description.trim() === "") {
      return alert("Veuillez remplir tous les champs"); // Vérification des champs vides
    }

    const formData = new FormData();

    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("image", inputs.image);

    axios
      .post("http://localhost:9000/categories/new", formData, {
        headers: token(),
      })
      .then((res) => {
        setInputs({
          ...inputs,
          name: "",
          description: "",
          image: null,
        });
        alert(res.data.message); // Alerte pour indiquer que la catégorie a été ajoutée avec succès
        navigate("/categories"); // Redirection vers la page des catégories
      })
      .catch((err) => {
        alert("Impossible d'ajouter une nouvelle catégorie !"); // Alerte en cas d'erreur lors de l'ajout de la catégorie
      });
  };

  return (
    <main>
      <section className="section-style2" id="section-detail">
        <img src={rotate} alt="image-lune" className="rotate-gif1" />
        <img src={rotate2} alt="image-lune" className="rotate-gif2" />
        <h2>Ajouter une catégorie</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="form-style2"
        >
          {/* Champ pour télécharger une image de la catégorie */}
          <label htmlFor="image">Couverture de catégorie : </label>
          <input
            onChange={handleChange}
            type="file"
            id="image"
            name="image"
            className="file-input"
          />
          {/* Champ pour saisir le nom de la catégorie */}
          <label htmlFor="name">Nom de la catégorie : </label>
          <input
            className="form-input"
            onChange={handleChange}
            value={inputs.name}
            type="text"
            id="name"
            name="name"
            placeholder="Nom"
          />
          {/* Champ pour saisir la description de la catégorie */}
          <label htmlFor="description">Description : </label>
          <textarea
            className="form-textarea"
            onChange={handleChange}
            value={inputs.description}
            type="text"
            id="description"
            name="description"
            placeholder="Description"
          />
          {/* Bouton de soumission du formulaire */}
          <button className="form-button">Valider</button>
        </form>
        {/* Affichage des erreurs */}
        {err && <span>{err}</span>}
      </section>
    </main>
  );
};

export default AddCategory;
