import React, { useState } from "react";
import axios from "axios";
import { token } from "../../context/token";

import "../../assets/styles/forms/forms.css";

import rotate from "../../assets/images/forms/lune.png";
import rotate2 from "../../assets/images/forms/lune2.png";

const MAX_DESCRIPTION_LENGTH = 250;

const AddCategory = () => {
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [err, setErr] = useState();
  const [descriptionError, setDescriptionError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      if (value.length <= MAX_DESCRIPTION_LENGTH) {
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
        setDescriptionError(false);
      } else {
        setDescriptionError(true);
      }
    } else if (name === "image") {
      setInputs({ ...inputs, image: e.target.files[0] });
    } else {
      setInputs({ ...inputs, [name]: value });
    }

    setErr("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputs.name.trim() === "" || inputs.description.trim() === "") {
      return setErr("Veuillez remplir tous les champs");
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
        console.log(inputs);
        alert(res.data.message);
      })
      .catch((err) => {
        alert("Impossible d'ajouter une nouvelle catégorie !");
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
          <label htmlFor="image">Couverture de catégorie : </label>
          <input
            onChange={handleChange}
            type="file"
            id="image"
            name="image"
            className="file-input"
          />
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

          <button className="form-button">Valider</button>
        </form>
        {err && <span>{err}</span>}
      </section>
    </main>
  );
};

export default AddCategory;
