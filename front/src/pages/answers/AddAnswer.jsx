import React, { useState } from "react";
import "../../assets/styles/forms/forms.css";
import { useAuth } from "../../context/AuthContext";
import { IoIosSend } from "react-icons/io";

// Définition du composant AddAnswer prenant en paramètre la fonction handleAnswer pour soumettre la réponse.
const AddAnswer = ({ handleAnswer }) => {
  // Déclaration d'un état local pour stocker les données du formulaire.
  const [inputs, setInputs] = useState({
    content: "",
  });

  // Utilisation du hook useAuth pour accéder aux informations d'authentification de l'utilisateur.
  const auth = useAuth();

  // Déclaration d'un état local pour stocker les messages d'erreur.
  const [err, setErr] = useState();

  // Fonction handleChange pour mettre à jour les valeurs des champs du formulaire lorsqu'ils changent.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr(""); // Efface les messages d'erreur lorsqu'un changement est effectué.
  };

  // Fonction handleSubmit pour gérer la soumission du formulaire.
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Vérifie si le champ content est vide.
      if (inputs.content.trim() === "") {
        throw new Error("Veuillez remplir tous les champs");
      }

      // Appelle la fonction handleAnswer avec le contenu de la réponse.
      handleAnswer(inputs.content);

      // Affiche une alerte pour confirmer que la réponse a été ajoutée avec succès.
      alert("La réponse au commentaire a bien été ajoutée");

      // Réinitialise le champ content après soumission.
      setInputs({
        content: "",
      });
    } catch (error) {
      // Affiche une alerte en cas d'erreur lors de la soumission.
      alert("Impossible d'ajouter la réponse au commentaire !");
    }
  };

  // Rendu du composant avec le formulaire pour ajouter une réponse.
  return (
    <section>
      {/* Affiche le message d'erreur s'il existe */}
      {err && <span>{err}</span>}

      {/* Formulaire pour soumettre une réponse */}
      <form onSubmit={handleSubmit} className="form-answer">
        <article className="answer-article">
          <ul>
            {/* Affiche l'image de profil de l'utilisateur */}
            <li>
              <img
                className="style-base2"
                src={`http://localhost:9000/assets/img/${auth.user.image.src}`}
                alt={auth.user.image.alt}
              />
            </li>
            {/* Affiche le nom d'utilisateur de l'utilisateur */}
            <li>
              <h5 className="name-noneplus">{auth.user.login}</h5>
            </li>
          </ul>

          {/* Champ de texte pour la réponse */}
          <textarea
            className="textarea-3"
            onChange={handleChange}
            value={inputs.content}
            type="text"
            id="content"
            name="content"
            placeholder="Votre réponse"
          />
          {/* Bouton pour soumettre la réponse */}
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
