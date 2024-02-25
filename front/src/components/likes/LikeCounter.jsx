/* REVOIR LA FONCTION UPDATE */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { token } from "../../context/token";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import "../../assets/styles/book/book.css";
import "../../assets/styles/book/comment.css";

const LikeCounter = ({}) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/${id}`)
      .then((res) => {
        setLikes(res.data.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [liked]);

  const handleLike = () => {
    axios
      .put(`http://localhost:9000/books/likes/${id}`, liked, {
        headers: token(),
      })
      .then((res) => {
        console.log(res.data);
        setLikes(res.data.likes);
        setLiked(!liked);
        if (!liked) {
          alert("Vous avez enlevé votre like !");
        } else {
          alert("Vous avez liké avec succès le livre !");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <button onClick={handleLike} className="btn-likecounter">
      <p className="bk-text-none2">J'aime</p>
      {liked ? (
        <>
          <FaHeart
            style={{
              color: "var(--darkGreen)",
              fontSize: "1.2em",
            }}
          ></FaHeart>
        </>
      ) : (
        <>
          <FaHeart
            style={{
              color: "var(--orange)",
              fontSize: "1.2em",
            }}
          />
        </>
      )}
    </button>
  );
};

export default LikeCounter;
