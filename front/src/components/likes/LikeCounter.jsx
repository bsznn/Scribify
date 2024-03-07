import React, { useState, useEffect } from "react";
import axios from "axios";
import { token } from "../../context/token";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import "../../assets/styles/book/book.css";
import "../../assets/styles/book/comment.css";
import { useAuth } from "../../context/AuthContext";

// Composant de compteur de likes
const LikeCounter = ({ likeAdd }) => {
  // États locaux pour les likes et l'état de like
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  // Récupération de l'ID du livre depuis les paramètres de l'URL

  const { id } = useParams();

  const auth = useAuth();
  let isLiked;

  // Effet pour récupérer les likes à partir de l'API
  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/${id}`)
      .then((res) => {
        setLikes(res.data.likes);
        isLiked = res.data.likes.filter((l) => l === auth.user.id);
        if (isLiked.length > 0) {
          setLiked(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]); // Se déclenche à chaque changement dans l'état de like

  // Gestion de l'action de like
  const handleLike = () => {
    axios
      .put(`http://localhost:9000/books/likes/${id}`, liked, {
        headers: token(), // Envoi du token d'authentification
      })
      .then((res) => {
        console.log(res.data);
        setLikes(res.data.likes); // Mise à jour du nombre de likes
        setLiked((prevLiked) => !prevLiked); // Inversion de l'état de like

        // Affichage d'une alerte en fonction de l'action de like
        if (!liked) {
          alert("Vous avez liké avec succès le livre !");
        } else {
          alert("Vous avez enlevé votre like !");
        }

        likeAdd();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    // Bouton de like avec gestion de l'événement onClick
    <button onClick={handleLike} className="btn-likecounter">
      <p className="bk-text-none2">J'aime</p>
      {/* Affichage de l'icône de cœur en fonction de l'état de like */}
      {liked ? (
        <>
          <FaHeart
            style={{
              color: "var(--hoverOrange)",
              fontSize: "1.2em",
            }}
          ></FaHeart>
        </>
      ) : (
        <>
          <FaHeart
            style={{
              color: "var(--white)",
              fontSize: "1.2em",
            }}
          />
        </>
      )}
    </button>
  );
};

export default LikeCounter;
