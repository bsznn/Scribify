import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import badgeUser from "../../assets/images/profile/badge-user.png";
import badgeAdmin from "../../assets/images/profile/badge-admin.png";

// Composant pour récupérer les informations sur l'utilisateur authentifié
const GetAuthUser = () => {
  const [books, setBooks] = useState([]); // État pour stocker les livres de l'utilisateur
  const [totalViews, setTotalViews] = useState(0); // État pour stocker le total de vues
  const [totalLikes, setTotalLikes] = useState(0); // État pour stocker le total de likes
  const [err, setErr] = useState(); // État pour gérer les erreurs
  const navigate = useNavigate(); // Hook pour la navigation
  const auth = useAuth(); // Hook pour l'authentification

  // Effet pour récupérer les livres publiés par l'utilisateur
  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/my-book/${auth.user.id}`, {
        headers: token(),
      })
      .then((res) => {
        setBooks(res.data);
      })
      .catch((res) => {
        setErr("Impossible de charger les livres de l'utilisateur !");
      });
  }, []);

  // Effet pour récupérer le total de vues de l'utilisateur
  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/total-views/${auth.user.id}`, {
        headers: token(),
      })
      .then((res) => {
        setTotalViews(res.data.totalViews);
      })
      .catch((err) => {
        setErr("Impossible de charger les nombres de vues !");
      });
  }, [auth.user._id]);

  // Effet pour récupérer le total de likes de l'utilisateur
  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/total-likes/${auth.user.id}`, {
        headers: token(),
      })
      .then((res) => {
        setTotalLikes(res.data.totalLikes);
      })
      .catch((err) => {
        setErr("Impossible de charger le nombre total de likes !");
      });
  }, [auth.user._id]);

  // Fonction pour supprimer l'utilisateur
  const handleDeleteUser = (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer l'utilisateur ?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:9000/users/delete/${id}`, {
          headers: token(),
        })
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message) {
            // Si l'utilisateur est supprimé, déconnectez-le et redirigez-le vers la page d'accueil
            setTimeout(() => {
              auth.logout();
              navigate("/");
            }, 3000);

            alert("L'utilisateur a été supprimé avec succès !");
          }
        })
        .catch((err) => {
          alert("Impossible de supprimer l'utilisateur");
        });
    }
  };

  return (
    <>
      {/* Section pour afficher les informations sur l'utilisateur */}
      <section className="p-section1">
        {/* Affichage des erreurs s'il y en a */}
        {err && <span>{err}</span>}
        <img src={back} alt="caroussel-fond" className="fond1" />
        {/* Vérification de l'existence de l'utilisateur authentifié */}
        {auth.user.login && (
          <>
            {/* Section pour afficher les informations de l'utilisateur */}
            <section className="p-section-bio">
              <span>
                <article className="p-article1">
                  {/* Affichage de l'image de l'utilisateur */}
                  <img
                    src={`http://localhost:9000/assets/img/${auth.user.image.src}`}
                    alt={auth.user.image.alt}
                    aria-label="user-image"
                    title={auth.user.image.alt}
                  />
                </article>
                <article className="p-article2">
                  <h3>
                    {auth.user.login}
                    {auth.user && auth.user.role === "admin" ? (
                      <img
                        src={badgeAdmin}
                        alt="admin-badge"
                        aria-label="admin-badge"
                        title="admin-badge"
                        className="badge"
                      />
                    ) : (
                      <img
                        src={badgeUser}
                        alt="user-badge"
                        aria-label="user-badge"
                        title="user-badge"
                        className="badge"
                      />
                    )}
                  </h3>
                </article>
              </span>
              {/* Affichage de la description de l'utilisateur */}
              <article className="p-description">
                {auth.user.description}
              </article>
            </section>
            {/* Section pour afficher les statistiques de l'utilisateur */}
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
            {/* Section pour afficher les options de gestion de profil */}
            <article className="p-article-ul">
              <ul id="pic2">
                {/* Lien pour modifier le profil */}
                <li>
                  <Link
                    to={`/modifier-utilisateur/${auth.user.id}`}
                    className="link-bio"
                  >
                    <IoIosSettings className="profile-icon" />
                    <p className="no-text-icon">⚙️ Modifier</p>
                  </Link>
                </li>
                {/* Bouton pour supprimer le profil */}
                <li onClick={() => handleDeleteUser(auth.user.id)}>
                  <MdDelete className="profile-icon" />
                  <p className="no-text-icon">🗑️ Supprimer</p>
                </li>
              </ul>
            </article>
          </>
        )}
      </section>
    </>
  );
};

export default GetAuthUser;
