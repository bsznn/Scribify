import React, { useState } from "react";
import "../../assets/styles/forms/forms.css";
import { useAuth } from "../../context/AuthContext";

import { IoIosSend } from "react-icons/io";

const AddAnswer = ({ handleAnswer }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (inputs.content.trim() === "") {
        throw new Error("Veuillez remplir tous les champs");
      }

      handleAnswer(inputs.content);

      alert("La réponse au commentaire a bien été ajoutée");
      setInputs({
        content: "",
      });
    } catch (error) {
      alert("Impossible d'ajouter la réponse au commentaire !");
    }
  };
  return (
    <section>
      {err && <span>{err}</span>}

      <form onSubmit={handleSubmit} className="form-answer">
        <article className="answer-article">
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
            className="textarea-3"
            onChange={handleChange}
            value={inputs.content}
            type="text"
            id="content"
            name="content"
            placeholder="Votre réponse"
          />
          <button className="comment-button">
            <IoIosSend className="icon-none" />
            <p className="name-none"> ↪️ Répondre</p>
          </button>
        </article>
      </form>
    </section>
  );
};

export default AddAnswer;
