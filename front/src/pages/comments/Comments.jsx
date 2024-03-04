import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { token } from "../../context/token";
import Comment from "./Comment";

import "../../assets/styles/book/comment.css";

const Comments = ({ bookId, updateComment }) => {
  // État local pour stocker les commentaires et les messages d'erreur
  const [comments, setComments] = useState([]);
  const [err, setErr] = useState();

  // Récupération des informations d'authentification
  const auth = useAuth();

  const getComments = () => {
    axios
      .get(`http://localhost:9000/books/comments/${bookId}`, {
        headers: token(),
      })
      .then((res) => {
        // Mise à jour de l'état des commentaires avec les données reçues
        setComments(res.data);
      })
      .catch((error) => {
        // Gestion des erreurs en cas de problème lors de la récupération des commentaires
        console.log(error);
        setErr("Impossible de charger les données");
      });
  };

  // Effet de chargement pour récupérer les commentaires liés au livre
  useEffect(() => {
    getComments();
  }, [bookId, updateComment]); // Déclenché à chaque changement de bookId

  // Rendu du composant Comments
  return (
    <main>
      {/* Titre indiquant "Tous les commentaires" */}
      <h2 className="label-comment">Tous les commentaires :</h2>

      {/* Affichage d'un message si aucun commentaire n'est disponible */}
      {comments.length === 0 && (
        <p className="ul-prebooks">
          Il semble que cette publication n'ait encore reçu aucun commentaire.
        </p>
      )}

      {/* Mapping à travers les commentaires pour les afficher individuellement */}
      {comments.map((oneComment) => (
        <section key={oneComment._id}>
          {/* Affichage du composant Comment avec les informations du livre et du commentaire */}
          <Comment bookId={bookId} commentId={oneComment._id} />
        </section>
      ))}
    </main>
  );
};

export default Comments;
