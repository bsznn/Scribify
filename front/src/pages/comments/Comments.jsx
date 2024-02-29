import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { token } from "../../context/token";
import Comment from "./Comment";

import "../../assets/styles/book/comment.css";

const Comments = ({ bookId }) => {
  const [comments, setComments] = useState([]);
  const [err, setErr] = useState();

  const auth = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/comments/${bookId}`, {
        headers: token(),
      })
      .then((res) => {
        console.log(res);
        setComments(res.data);
      })
      .catch((res) => {
        console.log(res);
        setErr("Impossible de charger les données");
      });
  }, [bookId]);

  return (
    <main>
      <h2 className="label-comment">Tous les commentaires :</h2>

      {comments.length === 0 && (
        <p className="ul-prebooks">
          Il semble que cette publication n'ait encore reçu aucun commentaire.
        </p>
      )}

      {comments.map((oneComment) => (
        <section key={oneComment._id}>
          <Comment bookId={bookId} commentId={oneComment._id} />
        </section>
      ))}
    </main>
  );
};

export default Comments;
