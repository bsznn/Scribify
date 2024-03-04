import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { MdDelete } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import "../../assets/styles/book/comment.css";
import { token } from "../../context/token";

// Définition du composant Answer prenant en paramètres bookId, commentId et answerId.
const Answer = ({ bookId, commentId, answerId }) => {
  // Déclaration des états locaux pour gérer la réponse, le formulaire de modification, le contenu de mise à jour et les erreurs.
  const [answer, setAnswer] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateContent, setUpdateContent] = useState("");
  const [err, setErr] = useState(null);

  // Utilisation du hook useAuth pour accéder aux informations d'authentification de l'utilisateur.
  const auth = useAuth();

  // Fonction handleDelete pour supprimer une réponse.
  const handleDelete = async () => {
    // Confirmation de la suppression de la réponse.
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer la réponse ?"
    );

    // Si la suppression est confirmée.
    if (confirmDelete) {
      try {
        // Requête DELETE pour supprimer la réponse.
        await axios.delete(
          `http://localhost:9000/books/comment/answer/delete/${bookId}/${commentId}/${answerId}`,
          {
            headers: token(),
          }
        );
        // Réinitialisation de la réponse après suppression.
        setAnswer(null);
        alert("Votre réponse a bien été supprimée !");
      } catch (err) {
        console.error(err);
        alert("Impossible de supprimer la réponse");
      }
    }
  };

  // Effet useEffect pour charger la réponse au chargement du composant ou lors de la mise à jour des dépendances.
  useEffect(() => {
    axios
      .get(
        `http://localhost:9000/books/comment/answer/${bookId}/${commentId}/${answerId}`,
        {
          headers: token(),
        }
      )
      .then((res) => {
        setAnswer(res.data);
        setUpdateContent(res.data.content);
      })
      .catch((error) => {
        console.log(error.response.data);
        setErr("Impossible de charger la réponse");
      });
  }, [bookId, commentId]);

  // Fonction handleUpdate pour mettre à jour une réponse.
  const handleUpdate = async () => {
    try {
      // Vérification si le contenu de la mise à jour est vide.
      if (updateContent.trim() === "") {
        throw new Error("Veuillez remplir tous les champs");
      }

      // Objet contenant la réponse mise à jour.
      const updatedAnswer = {
        content: updateContent,
      };

      // Requête PUT pour mettre à jour la réponse.
      await axios.put(
        `http://localhost:9000/books/comment/answer/edit/${bookId}/${commentId}/${answerId}`,
        updatedAnswer,
        {
          headers: token(),
        }
      );

      // Mise à jour de la réponse avec le nouveau contenu.
      setAnswer((prevAnswer) => ({
        ...prevAnswer,
        content: updateContent,
      }));

      // Masquage du formulaire de mise à jour après la soumission.
      setShowUpdateForm(false);
    } catch (err) {
      alert("Impossible de modifier la réponse !");
    }
  };

  // Fonction toggleUpdateForm pour basculer l'affichage du formulaire de mise à jour.
  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  // Rendu du composant Answer avec la gestion des réponses.
  return (
    <main>
      <section className="b-section">
        {answer && (
          <>
            {/* Affichage de la réponse et du formulaire de modification */}
            <article className="answer-article">
              <ul>
                <li>
                  {/* Image de profil de l'utilisateur */}
                  <img
                    className="style-base2"
                    src={`http://localhost:9000/assets/img/${auth.user.image.src}`}
                    alt={auth.user.image.alt}
                    aria-label="user-image"
                    title={auth.user.image.alt}
                  />
                </li>
                <li>
                  {/* Nom d'utilisateur de l'utilisateur */}
                  <h5 className="name-noneplus">{auth.user.login}</h5>
                </li>
              </ul>

              {/* Affichage du formulaire de modification si showUpdateForm est true */}
              {showUpdateForm ? (
                <ul className="answer-ul">
                  <li>
                    <textarea
                      className="answer-area"
                      value={updateContent}
                      onChange={(e) => setUpdateContent(e.target.value)}
                    />
                  </li>

                  <li>
                    <button onClick={handleUpdate}>
                      <IoIosSend className="icon-none" />
                      <p className="name-none"> ↪️ Valider</p>
                    </button>
                  </li>
                </ul>
              ) : (
                // Affichage du contenu de la réponse si showUpdateForm est false
                <span>
                  <p className="answer-area">{answer.content}</p>
                </span>
              )}
            </article>

            {/* Affichage de la date de la réponse */}
            <article className="b-article-pre" id="answer-pre">
              Posté le {new Date(answer.date).toLocaleDateString()} à{" "}
              {new Date(answer.date).toLocaleTimeString()}
            </article>

            {/* Affichage des icônes de modification et de suppression pour l'utilisateur connecté */}
            {auth.user.id === answer.userId._id && (
              <article>
                <ul className="answer-article3">
                  <li onClick={toggleUpdateForm}>
                    <IoIosSettings className="profile-icon" />
                    <p className="name-none">⚙️ Modifier</p>
                  </li>
                  <li onClick={handleDelete}>
                    <MdDelete className="profile-icon" />
                    <p className="name-none">🗑️ Supprimer</p>
                  </li>
                </ul>
              </article>
            )}

            {/* Affichage des erreurs s'il y en a */}
            {err && <span>{err}</span>}
          </>
        )}
      </section>
    </main>
  );
};

export default Answer;
