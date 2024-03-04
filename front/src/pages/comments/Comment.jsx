import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { token } from "../../context/token";
import { Link } from "react-router-dom";

import AddAnswer from "../answers/AddAnswer";
import Answers from "../answers/Answers";

import { IoIosSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";

import "../../assets/styles/book/book.css";
import "../../assets/styles/book/comment.css";

const Comment = ({ bookId, commentId }) => {
  // Déclaration des états locaux pour gérer les données du commentaire et des réponses, ainsi que les états pour afficher les formulaires de réponse et de modification.
  const [comment, setComment] = useState("");
  const [answers, setAnswers] = useState("");
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateContent, setUpdateContent] = useState("");
  const [err, setErr] = useState("");
  const auth = useAuth();

  // Effet de chargement pour récupérer les détails du commentaire et initialiser le contenu de la mise à jour.
  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/comment/${bookId}/${commentId}`, {
        headers: token(),
      })
      .then((res) => {
        setComment(res.data);
        setUpdateContent(res.data.content); // Initialisation du contenu de la mise à jour
      })
      .catch((error) => {
        console.log(error.response.data);
        setErr("Impossible de charger le commentaire");
      });
  }, [bookId, commentId]);

  // Fonction pour gérer la mise à jour du commentaire.
  const handleUpdate = async () => {
    try {
      if (updateContent.trim() === "") {
        throw new Error("Veuillez remplir tous les champs");
      }

      const updatedComment = {
        content: updateContent,
      };

      await axios.put(
        `http://localhost:9000/books/comment/edit/${bookId}/${commentId}`,
        updatedComment,
        {
          headers: token(),
        }
      );

      setComment((prevComment) => ({
        ...prevComment,
        content: updateContent,
      }));

      setShowUpdateForm(false); // Cacher le formulaire de mise à jour après une mise à jour réussie
    } catch (err) {
      alert("Impossible de modifier le commentaire !");
    }
  };

  // Fonction pour supprimer le commentaire.
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer le commentaire ?"
    );

    if (confirmDelete) {
      axios
        .delete(
          `http://localhost:9000/books/comment/delete/${bookId}/${commentId}`,
          { headers: token() }
        )
        .then((res) => {
          setComment(null); // Supprime le commentaire de l'état local
          alert(res.data.message);
        })
        .catch((err) => {
          alert("Impossible de supprimer le commentaire !");
        });
    }
  };

  // Fonction pour basculer l'affichage du formulaire de réponse.
  const toggleAnswerInput = () => {
    setShowAnswerInput(!showAnswerInput);
  };

  // Fonction pour basculer l'affichage du formulaire de mise à jour.
  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  // Fonction pour gérer l'ajout d'une réponse au commentaire.
  const handleAnswer = async (answerContent) => {
    try {
      const commentData = {
        content: answerContent,
        pseudo: auth.user.login,
      };

      await axios.post(
        `http://localhost:9000/books/comment/answer/new/${bookId}/${commentId}`,
        commentData,
        {
          headers: token(),
        }
      );

      axios
        .get(
          `http://localhost:9000/books/comment/answers/${bookId}/${commentId}`,
          {
            headers: token(),
          }
        )
        .then((res) => {
          setAnswers(res.data.answers);
        });
    } catch (error) {
      console.error(error);
      setErr(error.message);
    }
  };

  // Rendu du composant Comment.
  return (
    <main>
      <section className="comment-section">
        {comment && (
          <>
            <article className="comment-article2">
              <span>
                <img
                  className="comment-img"
                  src={`http://localhost:9000/assets/img/${comment.userId.image.src}`}
                  alt={comment.userId.image.alt}
                  aria-label="user-image"
                  title={comment.userId.image.alt}
                />
                <h5 className="name-noneplus">{comment.userId.login}</h5>
              </span>

              {showUpdateForm ? (
                <>
                  {/* Formulaire de mise à jour du commentaire */}
                  <textarea
                    className="comment-area"
                    value={updateContent}
                    onChange={(e) => setUpdateContent(e.target.value)}
                  />
                  <button onClick={handleUpdate}>
                    <IoIosSend className="icon-none" />
                    <p className="name-none"> ↪️ Valider</p>
                  </button>
                </>
              ) : (
                <span>
                  <p className="comment-area">{comment.content}</p>
                </span>
              )}
            </article>

            {/* Information sur la publication du commentaire */}
            <article className="b-article-pre" id="comment-pre">
              Posté le {new Date(comment.date).toLocaleDateString()} à{" "}
              {new Date(comment.date).toLocaleTimeString()}
            </article>

            {/* Options de modification, suppression et réponses au commentaire */}
            {
              <article>
                <ul className="comment-article3">
                  {/* Bouton de modification du commentaire */}
                  {auth.user.id === comment.userId._id && (
                    <>
                      <li onClick={toggleUpdateForm}>
                        <IoIosSettings className="profile-icon" />
                        <p className="name-none">⚙️ Modifier</p>
                      </li>
                    </>
                  )}
                  {/* Bouton de suppression du commentaire */}
                  <li onClick={handleDelete}>
                    <MdDelete className="profile-icon" />
                    <p className="name-none">🗑️ Supprimer</p>
                  </li>
                  {/* Bouton pour afficher/masquer le formulaire de réponse */}
                  <li onClick={toggleAnswerInput}>
                    <RiQuestionAnswerFill className="orange-icon" />
                    <p className="name-none">🗨️ Réponses</p>
                  </li>
                </ul>

                {/* Affichage du formulaire de réponse si showAnswerInput est vrai */}
                {showAnswerInput && (
                  <AddAnswer
                    bookId={bookId}
                    commentId={commentId}
                    handleAnswer={handleAnswer}
                  />
                )}
                {/* 
<li>
                    <AddComment bookId={id} commentAdd={handleCommentUpdate} />
                    <p>
                      {showComments && (
                        <Comments
                          bookId={id}
                          commentUpdate={commentUpdate}
                          key={commentUpdate}
                        />
                      )}
                    </p>
                  </li> */}
              </article>
            }

            {/* Affichage des réponses si showAnswerInput est vrai */}
            {showAnswerInput && (
              <section>
                <Answers bookId={bookId} commentId={commentId} />
              </section>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Comment;
