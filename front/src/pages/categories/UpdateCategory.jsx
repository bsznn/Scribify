import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/styles/forms/forms.css";
import { token } from "../../context/token";

import rotate from "../../assets/images/forms/lune.png";
import rotate2 from "../../assets/images/forms/lune2.png";

const MAX_DESCRIPTION_LENGTH = 250;

const UpdateCategory = () => {
  // Récupération de l'identifiant de la catégorie à partir des paramètres d'URL
  const { id } = useParams();

  // États pour stocker les données de la catégorie, les erreurs et la validation du champ description
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [err, setErr] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  // Utilisation de useNavigate pour la redirection après la soumission du formulaire
  const navigate = useNavigate();

  // Utilisation de useEffect pour charger les données de la catégorie à modifier
  useEffect(() => {
    axios
      .get(`http://localhost:9000/categories/${id}`)
      .then((res) => {
        setInputs(res.data); // Mise à jour des données de la catégorie
      })
      .catch((err) => {
        setErr("Impossible de récupérer la catégorie !"); // Gestion des erreurs de chargement
      });
  }, [id]); // Déclenchement de useEffect à chaque changement de l'identifiant de la catégorie

  // Gestionnaire de changement pour mettre à jour les valeurs des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      if (value.length <= MAX_DESCRIPTION_LENGTH) {
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
        setDescriptionError(false); // Réinitialisation de l'erreur de description
      } else {
        setDescriptionError(true); // Activation de l'erreur de description si la limite est dépassée
      }
    } else if (name === "image") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        image: e.target.files[0], // Mise à jour de l'image
      }));
    } else {
      setInputs((prevInputs) => ({ ...prevInputs, [name]: value })); // Mise à jour des autres champs
    }
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputs.name.trim() === "" || inputs.description.trim() === "") {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const formData = new FormData();

    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("image", inputs.image);

    axios
      .put(`http://localhost:9000/categories/edit/${id}`, formData, {
        headers: token(),
      })
      .then((res) => {
        setInputs((prevInputs) => ({
          ...prevInputs,
          name: "",
          description: "",
          image: null,
        }));
        alert("La catégorie a bien été mise à jour !");
        navigate("/categories"); // Redirection vers la liste des catégories après la mise à jour
      })
      .catch((err) => {
        alert("Impossible de modifier la catégorie !"); // Gestion des erreurs lors de la modification
      });
  };

  return (
    <main>
      <section className="section-style2" id="section-detail">
        {err && <span>{err}</span>} {/* Affichage de l'erreur si elle existe */}
        {/* Formulaire de mise à jour de la catégorie */}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="form-style2"
        >
          <img src={rotate} alt="image-lune" className="rotate-gif1" />
          <img src={rotate2} alt="image-lune" className="rotate-gif2" />

          <h2>Modifier une catégorie</h2>
          <label htmlFor="image">Couverture de la catégorie : </label>
          <input
            onChange={handleChange}
            type="file"
            id="image"
            name="image"
            className="file-input"
          />
          <label htmlFor="name">Nom de la catégorie :</label>
          <input
            className="form-input2"
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
          <label htmlFor="description">Description de la catégorie :</label>
          <textarea
            id="description"
            name="description"
            className="form-textarea"
            value={inputs.description}
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="form-button">
            Valider
          </button>
        </form>
      </section>
    </main>
  );
};

export default UpdateCategory;
