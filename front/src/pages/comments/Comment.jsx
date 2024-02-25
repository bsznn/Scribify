import axios from "axios";
import React, { useEffect, useState } from "react";
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

const Comment = ({ bookId, commentId, total }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState("");
  const [answers, setAnswers] = useState("");
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // Add state to toggle update form
  const [updateContent, setUpdateContent] = useState(""); // State to store updated content
  const [err, setErr] = useState("");
  const auth = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/comment/${bookId}/${commentId}`, {
        headers: token(),
      })
      .then((res) => {
        setComment(res.data);
        setUpdateContent(res.data.content); // Set initial content for update form
      })
      .catch((error) => {
        console.log(error.response.data);
        setErr("Impossible de charger le commentaire");
      });
  }, [bookId, commentId]);

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

      setShowUpdateForm(false); // Hide the update form after successful update
    } catch (error) {
      console.error(error);
      setErr(error.message);
    }
  };

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
          console.log(res.data.message);
          setSuccessMessage("Le commentaire a été supprimé avec succès");
          setComments((prevComments) =>
            prevComments.filter((comment) => comment._id !== commentId)
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const toggleAnswerInput = () => {
    setShowAnswerInput(!showAnswerInput);
  };

  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

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

  return (
    <main>
      <section className="comment-section">
        {comment && (
          <>
            <article className="comment-article2">
              <span>
                <img
                  className="comment-img"
                  src={`http://localhost:9000/assets/img/${auth.user.image.src}`}
                  alt={auth.user.image.alt}
                />
                <h5 className="name-none">{auth.user.login}</h5>
              </span>

              {showUpdateForm ? (
                <>
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

            <article className="b-article-pre" id="comment-pre">
              Posté le {new Date(comment.date).toLocaleDateString()} à{" "}
              {new Date(comment.date).toLocaleTimeString()}
            </article>

            {auth.user.id === comment.userId._id && (
              <article>
                <ul className="comment-article3">
                  <li onClick={toggleUpdateForm}>
                    <IoIosSettings className="profile-icon" />
                    <p className="name-none">⚙️ Modifier</p>
                  </li>
                  <li onClick={handleDelete}>
                    <MdDelete className="profile-icon" />
                    <p className="name-none">🗑️ Supprimer</p>
                  </li>
                  <li onClick={toggleAnswerInput}>
                    <RiQuestionAnswerFill className="orange-icon" />
                    <p className="name-none">🗨️ Réponses</p>
                  </li>
                </ul>

                {showAnswerInput && (
                  <AddAnswer
                    bookId={bookId}
                    commentId={commentId}
                    handleAnswer={handleAnswer}
                  />
                )}
              </article>
            )}

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
