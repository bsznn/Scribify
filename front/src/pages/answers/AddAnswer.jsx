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
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr("");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (inputs.content.trim() === "") {
        throw new Error("Veuillez remplir tous les champs");
      }

      handleAnswer(inputs.content);

      setMessage("La réponse au commentaire a bien été ajoutée");
      setInputs({
        content: "",
      });
    } catch (error) {
      console.error(error);
      setErr(error.message);
    }
  };
  return (
    <section>
      {message && <span className="success">{message}</span>}

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
              <h5 className="name-none">{auth.user.login}</h5>
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
      {err && <span>{err}</span>}
    </section>
  );
};

export default AddAnswer;
