import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { token } from "../../context/token";
import { useAuth } from "../../context/AuthContext";

import { IoIosSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";

import "../../assets/styles/profile/profile.css";
import back from "../../assets/images/profile/fond.png";

import lune from "../../assets/images/forms/lune3.png";

const GetUser = () => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  const [err, setErr] = useState();
  const navigate = useNavigate();

  const { id } = useParams();

  const auth = useAuth();

  useEffect(() => {
    // Requête GET pour récupérer les données de l'utilisateur avec l'ID spécifié
    axios
      .get(`http://localhost:9000/users/${id}`, {
        headers: token(), // Envoi du token d'authentification dans les headers
      })
      .then((res) => {
        setUser(res.data); // Mise à jour de l'état 'user' avec les données récupérées
      })
      .catch((res) => {
        setErr("Impossible de charger les données"); // Gestion de l'erreur en mettant à jour l'état 'err'
      });
  }, [id]); // Cet effet ne dépend d'aucune variable et ne doit être exécuté qu'une seule fois après le rendu initial

  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/total-views/${id}`, {
        headers: token(),
      })
      .then((res) => {
        setTotalViews(res.data.totalViews);
      })
      .catch((error) => {
        console.error(error);
        setErr("Impossible de charger les données");
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/total-likes/${id}`, {
        headers: token(),
      })
      .then((res) => {
        setTotalLikes(res.data.totalLikes);
      })
      .catch((error) => {
        console.error(error);
        setErr("Impossible de charger les données");
      });
  }, [id]);

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer l'utilisateur ?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:9000/users/delete/${userId}`, {
          headers: token(),
        })
        .then((res) => {
          console.log(res.data.message);
          setUser((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );

          alert("L'utilisateur a été supprimé avec succès !");

          if (res.data.message) {
            setTimeout(() => {
              if (auth.user.role !== "admin") {
                auth.logout();
              }
              window.location.href = "/";
            }, 1000);
          }
        })
        .catch((err) => {
          alert("Impossible de supprimer l'utilisateur");
        });
    }
  };
  return (
    <>
      <section className="p-section1">
        <img src={back} alt="caroussel-fond" className="fond1" />
        {user && user.image && (
          <>
            <section className="p-section-bio">
              <span>
                <article className="p-article1">
                  <img
                    src={`http://localhost:9000/assets/img/${user.image.src}`}
                    alt={auth.user.image.alt}
                    aria-label="user-image"
                    title={auth.user.image.alt}
                  />
                </article>

                <article className="p-article2">
                  <h3>{user.login}</h3>
                </article>
              </span>

              <article>
                <p className="description">{user.description}</p>
              </article>
            </section>

            <article className="p-new-article">
              <ul>
                <li>
                  <FaBookOpen className="book-icon" />
                  {books.length} <p className="p-text-none">Oeuvres</p>
                </li>
                <li>
                  <FaHeart className="heart-icon" /> {totalLikes}
                  <p className="p-text-none">Likes</p>
                </li>
                <li>
                  <FaEye className="view-icon" />
                  {totalViews}
                  <p className="p-text-none">Vues</p>
                </li>
              </ul>
            </article>

            <article className="p-article-ul">
              <ul id="pic2">
                {auth.user && auth.user.id === id && (
                  <li>
                    <Link
                      to={`/modifier-utilisateur/${id}`}
                      className="link-bio"
                    >
                      <IoIosSettings className="profile-icon" />
                      <p className="no-text-icon">⚙️ Modifier</p>
                    </Link>
                  </li>
                )}
                {auth.user &&
                (auth.user.id === id || auth.user.role === "admin") ? (
                  <li onClick={() => handleDeleteUser(id)}>
                    <MdDelete className="profile-icon" />
                    <p className="no-text-icon">🗑️ Supprimer</p>
                  </li>
                ) : (
                  <img src={lune} alt="lune-fond" className="lune-fond" />
                )}
              </ul>
            </article>
          </>
        )}
      </section>
    </>
  );
};

export default GetUser;
