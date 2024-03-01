import React, { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../../context/token";
import { useParams } from "react-router-dom";
import "../../assets/styles/forms/forms.css";
import "../../assets/styles/book/book.css";
import { useAuth } from "../../context/AuthContext";

import { IoIosSend } from "react-icons/io";

const AddComment = ({ bookId }) => {
  const [inputs, setInputs] = useState({
    content: "",
  });

  const auth = useAuth();

  const [err, setErr] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (inputs.content.trim() === "") {
        throw new Error("Veuillez remplir tous les champs");
      }

      const comment = {
        content: inputs.content,
        pseudo: auth.user.login,
      };
      console.log(bookId);
      await axios
        .post(`http://localhost:9000/books/comment/new/${bookId}`, comment, {
          headers: token(),
        })
        .then((res) => {
          setInputs({
            content: "",
          });
          alert("Le commentaire a bien été ajouté");
        });
    } catch (error) {
      console.error(error);
      alert("Impossible d'ajouter le commentaire !");
    }
  };

  return (
    <section>
      {auth && auth.user && (
        <form onSubmit={handleSubmit} className="form-style2">
          <label htmlFor="content" className="label-comment">
            Ajouter un commentaire :
          </label>

          <article className="comment-article">
            <ul>
              <li>
                <img
                  className="style-base2"
                  src={`http://localhost:9000/assets/img/${auth.user.image.src}`}
                  alt={auth.user.image.alt}
                />
              </li>
              <li>
                <h5 className="name-noneplus">{auth.user.login}</h5>
              </li>
            </ul>

            <textarea
              className="form-textarea2"
              onChange={handleChange}
              value={inputs.content}
              type="text"
              id="content"
              name="content"
              placeholder="Votre commentaire"
            />

            <button className="comment-button">
              <IoIosSend className="icon-none" />
              <p className="name-none"> ↪️ Commenter</p>
            </button>
          </article>
        </form>
      )}

      {err && <span>{err}</span>}
    </section>
  );
};

export default AddComment;
