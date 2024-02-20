import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../assets/styles/forms/forms.css";
import { token } from "../../context/token";

import fond from "../../assets/images/forms/8.png";

const UpdateCategory = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:9000/categories/${id}`)
      .then((res) => {
        setInputs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        image: e.target.files[0],
      }));
    } else {
      setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputs.name.trim() === "" || inputs.description.trim() === "") {
      setError("Veuillez remplir tous les champs");
      return;
    }

    const formData = new FormData();

    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("image", inputs.image);

    console.log("FormData:", formData);

    axios
      .put(`http://localhost:9000/categories/edit/${id}`, formData, {
        headers: token(),
      })
      .then((res) => {
        setMessage("La catégorie a bien été mise à jour !");
        setInputs((prevInputs) => ({
          ...prevInputs,
          name: "",
          description: "",
          image: null,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      {message && <span className="success">{message}</span>}
      <section className="section-style2">
        <img src={fond} alt="image-fond" className="image-fond5" />

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="form-style2"
        >
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
            className="form-input2"
            value={inputs.description}
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="form-button">
            Valider
          </button>
        </form>
        {error && <span>{error}</span>}
      </section>
    </main>
  );
};

export default UpdateCategory;
