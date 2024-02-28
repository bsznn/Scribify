import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { token } from "../../context/token";
import { useParams } from "react-router-dom";
import "../../assets/styles/forms/forms.css";

import rotate from "../../assets/images/forms/lune.png";
import rotate2 from "../../assets/images/forms/lune2.png";

const PostEdit = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    categories: [],
    categoryId: [],
    image: null,
  });
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/${id}`)
      .then((res) => {
        setInputs(res.data);
      })
      .catch((err) => {
        return alert(
          "Une erreur est survenue lors de la récupération du livre."
        );
      });

    axios
      .get("http://localhost:9000/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        return alert(
          "Une erreur est survenue lors de la récupération des catégories."
        );
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      setInputs((prevInputs) => ({ ...prevInputs, image: e.target.files[0] }));
    } else if (name === "categories") {
      const options = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );
      setInputs((prevInputs) => ({ ...prevInputs, categoryId: options }));
    } else {
      setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      inputs.title.trim() === "" ||
      inputs.description.trim() === "" ||
      inputs.categoryId.length <= 0
    ) {
      return alert("Veuillez remplir tous les champs");
    }

    const formData = new FormData();

    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    formData.append("categories", JSON.stringify(inputs.categoryId));
    formData.append("image", inputs.image);

    axios
      .put(`http://localhost:9000/books/edit/${id}`, formData, {
        headers: token(),
      })
      .then((res) => {
        console.log(res);
        setInputs((prevInputs) => ({
          ...prevInputs,
          title: "",
          description: "",
          image: null,
        }));
        alert("Votre livre a été modifié avec succès !");
      })
      .catch((error) => {
        return alert("Impossible de modifier le livre !");
      });
  };

  return (
    <main>
      <section className="section-style2" id="section-detail">
        {inputs._id && (
          <>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="form-style2"
            >
              <img src={rotate} alt="image-lune" className="rotate-gif1" />
              <img src={rotate2} alt="image-lune" className="rotate-gif2" />

              <h2>Modifier votre livre</h2>

              <label htmlFor="image">Couverture du livre : </label>
              <input
                className="file-input"
                onChange={handleChange}
                type="file"
                id="image"
                name="image"
              />

              <label htmlFor="title">Titre du livre : </label>
              <input
                className="form-input2"
                onChange={handleChange}
                value={inputs.title}
                type="text"
                id="title"
                name="title"
                placeholder="Titre"
              />

              <label htmlFor="description">Description du livre : </label>

              <textarea
                className="form-textarea"
                onChange={handleChange}
                value={inputs.description}
                type="text"
                id="description"
                name="description"
                placeholder="Description"
              />

              <label htmlFor="categories">Catégories : </label>
              <select
                multiple
                name="categories"
                id="categories"
                value={inputs.categoryId}
                onChange={handleChange}
              >
                {categories &&
                  categories.map((category, index) => (
                    <option value={category._id} key={index}>
                      {category.name}
                    </option>
                  ))}
              </select>

              <button className="form-button">Valider</button>
            </form>
          </>
        )}
      </section>
    </main>
  );
};
export default PostEdit;
