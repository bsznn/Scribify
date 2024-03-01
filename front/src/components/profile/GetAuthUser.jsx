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

const GetAuthUser = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  const [err, setErr] = useState();
  const navigate = useNavigate();

  const auth = useAuth();

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

  // Fonction pour supprimer un utilisateur
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
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
          if (res.data.message) {
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
      <section className="p-section1">
        {err && <span>{err}</span>}
        <img src={back} alt="caroussel-fond" className="fond1" />
        {auth.user.login && (
          <>
            <section className="p-section-bio">
              <span>
                <article className="p-article1">
                  <img
                    src={`http://localhost:9000/assets/img/${auth.user.image.src}`}
                    alt={auth.user.image.alt}
                    aria-label="user-image"
                    title={auth.user.image.alt}
                  />
                </article>

                <article className="p-article2">
                  <h3>{auth.user.login}</h3>
                </article>
              </span>

              <article className="p-description">
                {auth.user.description}
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
                <li>
                  <Link
                    to={`/modifier-utilisateur/${auth.user.id}`}
                    className="link-bio"
                  >
                    <IoIosSettings className="profile-icon" />
                    <p className="no-text-icon">⚙️ Modifier</p>
                  </Link>
                </li>
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
