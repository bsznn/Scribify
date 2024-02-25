import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { token } from "../../context/token";
import { MdDelete } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { IoIosSend } from "react-icons/io";

import "../../assets/styles/book/comment.css";

const Answer = ({ bookId, commentId, answerId }) => {
  const [answer, setAnswer] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [updateContent, setUpdateContent] = useState(""); // Add state for update content
  const [err, setErr] = useState(null); // Add state for errors

  const auth = useAuth();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this answer?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:9000/books/comment/answer/delete/${bookId}/${commentId}/${answerId}`,
          {
            headers: token(),
          }
        );
      } catch (err) {
        console.error(err);
        setErr("Failed to delete the answer");
      }
    }
  };

  const toggleEditMode = async () => {
    setEditMode(!editMode);
    await fetchAnswerData();
    setUpdateContent(answer.content);
  };

  const handleUpdateSuccess = () => {
    toggleEditMode();
    fetchAnswerData();
  };

  const fetchAnswerData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/books/comment/answer/${bookId}/${commentId}/${answerId}`,
        {
          headers: token(),
        }
      );
      setAnswer(response.data);
      setUpdateContent(response.data.content); // Set initial content for update form
    } catch (error) {
      console.error(error);
      setErr("Failed to fetch answer data");
    }
  };

  useEffect(() => {
    fetchAnswerData();
  }, [bookId, commentId, answerId]);

  return (
    <main>
      <section className="b-section">
        {answer && (
          <>
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

              {editMode ? (
                <ul className="answer-ul">
                  <li>
                    <textarea
                      className="answer-area"
                      value={updateContent}
                      onChange={(e) => setUpdateContent(e.target.value)}
                    />
                  </li>

                  <li>
                    <button onClick={() => handleUpdateSuccess()}>
                      <IoIosSend className="icon-none" />
                      <p className="name-none"> ↪️ Valider</p>
                    </button>
                  </li>
                </ul>
              ) : (
                <span>
                  <p className="answer-area">{answer.content}</p>
                </span>
              )}
            </article>

            <article className="b-article-pre" id="answer-pre">
              Posté le {new Date(answer.date).toLocaleDateString()} à{" "}
              {new Date(answer.date).toLocaleTimeString()}
            </article>

            {auth.user.id === answer.userId._id && (
              <article>
                <ul className="answer-article3">
                  <li onClick={toggleEditMode}>
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

            {err && <span>{err}</span>}
          </>
        )}
      </section>
    </main>
  );
};

export default Answer;
