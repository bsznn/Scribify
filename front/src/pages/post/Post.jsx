import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { token } from "../../context/token";

import "../../assets/styles/forms/forms.css";
import "../../assets/styles/error/error.css";
import rotate from "../../assets/images/forms/lune.png";
import rotate2 from "../../assets/images/forms/lune2.png";
import { useAuth } from "../../context/AuthContext";

import imageForm from "../../assets/images/forms/form3.png";
import lune from "../../assets/images/forms/lune-error.png";
import { Link } from "react-router-dom";

const MAX_DESCRIPTION_LENGTH = 250;

const Post = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    categories: [],
    categoryId: [],
    image: null,
    chapterContent: "",
    chapterTitle: "",
  });

  const [descriptionError, setDescriptionError] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:9000/categories")
      .then((res) => {
        setInputs({
          ...inputs,
          categoryId: res.data,
          categories: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    } else if (name === "categories") {
      //transformer un objet en tableau
      const options = Array.from(e.target.options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setInputs({ ...inputs, categoryId: options });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  const handleQuill = (chapterContent, delta, source, editor) => {
    setInputs({ ...inputs, chapterContent: editor.getHTML() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      inputs.title.trim() === "" ||
      inputs.description.trim() === "" ||
      inputs.categoryId.length <= 0 ||
      inputs.chapterContent.trim() === "" ||
      inputs.chapterTitle.trim() === ""
    ) {
      return alert("Veuillez remplir tous les champs !");
    }

    if (descriptionError) {
      return alert("La description ne peut pas dépasser 250 caractères.");
    }

    const formData = new FormData();

    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    formData.append("categories", JSON.stringify(inputs.categoryId));
    formData.append("image", inputs.image);

    const chapter = [
      { title: inputs.chapterTitle, content: inputs.chapterContent },
    ];

    formData.append("chapters", JSON.stringify(chapter));

    axios
      .post("http://localhost:9000/books/new", formData, {
        headers: token(),
      })
      .then((res) => {
        setInputs({
          ...inputs,
          title: "",
          description: "",
          chapterContent: "",
          chapterTitle: "",
          categories: [],
          categoryId: [],
          image: null,
        });
        alert(res.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <main>
      {auth.user ? (
        <section className="section-style2">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="form-style2"
          >
            <img src={rotate} alt="image-lune" className="rotate-gif3" />
            <img src={rotate2} alt="image-lune" className="rotate-gif2" />

            <h2>Publier un livre</h2>

            <label htmlFor="image">Couverture de livre : </label>
            <input
              className="file-input"
              onChange={handleChange}
              type="file"
              id="image"
              name="image"
            />
            <label htmlFor="title">Titre : </label>
            <input
              className="form-input2"
              onChange={handleChange}
              value={inputs.title}
              type="text"
              id="title"
              name="title"
              placeholder="Titre"
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

            <label htmlFor="categories">Catégories : </label>
            <select
              multiple
              name="categories"
              id="categories"
              value={inputs.categories}
              onChange={handleChange}
            >
              {inputs.categories.map((category, index) => (
                <option value={category._id} key={index}>
                  {category.name}
                </option>
              ))}
            </select>

            <label htmlFor="chapterTitle">Titre du chapitre : </label>
            <input
              className="form-input2"
              onChange={handleChange}
              value={inputs.chapterTitle}
              type="text"
              id="chapterTitle"
              name="chapterTitle"
              placeholder="Titre du chapitre"
            />

            <label htmlFor="chapterContent">Contenu du chapitre : </label>
            <ReactQuill
              className="ql-editor"
              theme="snow"
              value={inputs.chapterContent}
              onChange={handleQuill}
              placeholder="Il était une fois..."
            />

            <button className="form-button2 " id="form-btn2">
              Valider
            </button>
          </form>
        </section>
      ) : (
        <section className="section-style">
          <article className="login-left">
            <img src={lune} alt="lune-image" className="lune-error" />
            <img src={imageForm} alt="form-image" className="form-image" />
          </article>

          <article className="form-style" id="error-post">
            <h2>Publier</h2>

            <p>
              Pour contribuer à la communauté Scribify en partageant vos
              histoires, vous devez être
              <Link to="/se-connecter" className="error-link">
                {" "}
                connecté(e) !
              </Link>
              Commencez dès maintenant à publier vos livres et à interagir avec
              d'autres écrivains et lecteurs.
            </p>
            <p>
              Vous n'avez pas de compte ?
              <Link to="/s-inscrire" className="error-link">
                Inscrivez-vous !
              </Link>
            </p>
          </article>
        </section>
      )}
    </main>
  );
};

export default Post;
