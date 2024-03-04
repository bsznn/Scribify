import React, { useState } from "react";
import axios from "axios";
import { token } from "../../context/token";
import "../../assets/styles/forms/forms.css";
import "../../assets/styles/book/book.css";
import { useAuth } from "../../context/AuthContext";
import { IoIosSend } from "react-icons/io";

// Définition du composant AddComment prenant en paramètre bookId.
const AddComment = ({ bookId, commentAdd }) => {
  // Déclaration de l'état local pour gérer le contenu du commentaire et les erreurs.
  const [inputs, setInputs] = useState({
    content: "",
  });
  const [err, setErr] = useState();

  // Utilisation du hook useAuth pour accéder aux informations d'authentification de l'utilisateur.
  const auth = useAuth();

  // Fonction handleChange pour mettre à jour le contenu du commentaire lors de la saisie de l'utilisateur.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr("");
  };

  // Fonction handleSubmit pour gérer la soumission du commentaire.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Vérification si le champ de contenu est vide.
      if (inputs.content.trim() === "") {
        throw new Error("Veuillez remplir tous les champs");
      }

      // Création de l'objet commentaire à envoyer au serveur.
      const comment = {
        content: inputs.content,
        pseudo: auth.user.login,
      };

      // Requête HTTP POST pour ajouter un nouveau commentaire.
      await axios
        .post(`http://localhost:9000/books/comment/new/${bookId}`, comment, {
          headers: token(),
        })
        .then((res) => {
          // Réinitialisation du champ de contenu après la soumission du commentaire.
          setInputs({
            content: "",
          });
          // Affichage d'une notification pour indiquer que le commentaire a été ajouté avec succès.
          alert("Le commentaire a bien été ajouté");
          commentAdd();
        });
    } catch (error) {
      console.error(error);
      // Affichage d'une alerte en cas d'erreur lors de l'ajout du commentaire.
      alert("Impossible d'ajouter le commentaire !");
    }
  };

  // Rendu du composant AddComment avec le formulaire d'ajout de commentaire.
  return (
    <section>
      {/* Vérification de l'authentification de l'utilisateur avant d'afficher le formulaire */}
      {auth && auth.user && (
        <form onSubmit={handleSubmit} className="form-style2">
          {/* Libellé du champ de commentaire */}
          <label htmlFor="content" className="label-comment">
            Ajouter un commentaire :
          </label>

          <article className="comment-article">
            {/* Affichage de l'image et du nom de l'utilisateur */}
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

            {/* Champ de texte pour saisir le contenu du commentaire */}
            <textarea
              className="form-textarea2"
              onChange={handleChange}
              value={inputs.content}
              type="text"
              id="content"
              name="content"
              placeholder="Votre commentaire"
            />

            {/* Bouton de soumission du commentaire avec l'icône IoIosSend */}
            <button className="comment-button">
              <IoIosSend className="icon-none" />
              <p className="name-none"> ↪️ Commenter</p>
            </button>
          </article>
        </form>
      )}

      {/* Affichage d'un message d'erreur s'il y a une erreur lors de la soumission du commentaire */}
      {err && <span>{err}</span>}
    </section>
  );
};

export default AddComment;
