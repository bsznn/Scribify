import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { token } from "../../context/token";
import { useAuth } from "../../context/AuthContext";
import DashboardAdmin from "../../components/dashboard/DashboardAdmin";

import { IoIosSettings } from "react-icons/io";
import { MdAddAPhoto } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";

import "../../assets/styles/profile/profile.css";
import back from "../../assets/images/profile/fond.png";
import arrow1 from "../../assets/images/home/arrow2.png";
import arrow2 from "../../assets/images/home/arrow1.png";

import userImage from "../../assets/images/users/default-profil.png";
import logo from "../../assets/images/logo/logo2.png";
import lune from "../../assets/images/forms/lune3.png";
import lune2 from "../../assets/images/forms/lune4.png";

const MAX_DESCRIPTION_LENGTH = 250;

const ProfileUser = () => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  const [err, setErr] = useState();
  const navigate = useNavigate();

  const { id, userId } = useParams();

  const auth = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/my-book/${id}`, {
        headers: token(),
      })
      .then((res) => {
        console.log(res);
        setBooks(res.data);
      })
      .catch((res) => {
        console.log(res);
        setErr("Impossible de charger les données");
      });

    axios
      .get(`http://localhost:9000/users/${id}`, {
        headers: token(),
      })
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((res) => {
        console.log(res);
        setErr("Impossible de charger les données");
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:9000/users", { headers: token() })
      .then((response) => {
        const allUsers = response.data;
        const authors = allUsers.authors || [];

        setAuthors(authors);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
      });
  }, []);

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

  useEffect(() => {
    axios
      .get("http://localhost:9000/books/newest-books")
      .then((res) => {
        console.log(res);
        setNewBooks(res.data);
      })
      .catch((res) => {
        console.log(res);
        setErr("Impossible de charger les données");
      });
  }, []);

  const handleDelete = (userId, id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer le livre ?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:9000/books/delete/${userId}/${id}`, {
          headers: token(),
        })
        .then((res) => {
          console.log(res.data.message);
          setBooks((prevBooks) =>
            prevBooks.filter((book) => book._id !== userId)
          );

          alert("Le livre a été supprimé avec succès !");
        })
        .catch((err) => {
          alert("Impossible de supprimer le livre ! ");
        });
    }
  };

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
    <main className="home">
      <section className="p-section1">
        <img src={back} alt="caroussel-fond" className="fond1" />
        {user && user.image && (
          <>
            <section className="p-section-bio">
              <span>
                <article className="p-article1">
                  <img
                    src={`http://localhost:9000/assets/img/${user.image.src}`}
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
              {auth.user &&
              (auth.user.role === "admin" || auth.user.id === auth.user) ? (
                <ul id="pic2">
                  <li>
                    <Link
                      to={`/modifier-utilisateur/${id}`}
                      className="link-bio"
                    >
                      <IoIosSettings className="profile-icon" />
                      <p className="no-text-icon">⚙️ Modifier</p>
                    </Link>
                  </li>
                  <li onClick={() => handleDeleteUser(id)}>
                    <MdDelete className="profile-icon" />
                    <p className="no-text-icon">🗑️ Supprimer</p>
                  </li>
                </ul>
              ) : (
                <img src={lune} alt="lune-fond" className="lune-fond" />
              )}
            </article>
          </>
        )}
        <img src={back} alt="caroussel-fond" className="fond2" />
      </section>

      <span className="home-title1">
        <img src={arrow1} alt="title-left-arrow" className="title-left-arrow" />
        <h2>Publiés</h2>

        <img
          src={arrow2}
          alt="title-right-arrow"
          className="title-right-arrow"
        />
      </span>

      <section className="p-section2">
        {books.map((oneBook, i) => (
          <>
            {oneBook.image && (
              <section key={oneBook._id} className="p-sous-section">
                <article className="books-section-bloc">
                  <ul className="books-article1">
                    <li>
                      <img
                        src={`http://localhost:9000/assets/img/${oneBook.image.src}`}
                        alt={oneBook.image.alt}
                        className="books-img"
                      />
                    </li>

                    <li>
                      <Link
                        to={`/livre/${oneBook._id}`}
                        className="books-sous-title"
                      >
                        <h4> {oneBook.title}</h4>
                      </Link>
                    </li>

                    <li>
                      <pre>{oneBook.chapters.length} chapitre(s)</pre>
                    </li>
                  </ul>
                </article>

                <article className="books-article2">
                  <ul>
                    <li className="description">
                      {truncateDescription(oneBook.description)}
                    </li>
                    <li className="categories">
                      {oneBook.categoryId &&
                        oneBook.categoryId.map((category, index) => (
                          <span key={index}>#{category.name} </span>
                        ))}
                    </li>

                    <span className="ul-prebooks">
                      <li>
                        <pre>
                          Créé le :{" "}
                          {new Date(oneBook.createdAt).toLocaleDateString()}
                        </pre>{" "}
                      </li>
                      <li>
                        <pre>
                          Modifié le :{" "}
                          {new Date(oneBook.updatedAt).toLocaleDateString()}
                        </pre>{" "}
                      </li>
                    </span>

                    {auth.user &&
                    (auth.user.role === "admin" ||
                      auth.user.id === auth.user) ? (
                      <ul className="span-align">
                        <li>
                          <Link
                            to={`/modifier-livre/${oneBook._id}`}
                            className="link-bio"
                          >
                            <IoIosSettings className="profile-icon" id="pic3" />
                            <p className="no-text-icon">⚙️ Modifier</p>
                          </Link>
                        </li>
                        <li
                          onClick={() =>
                            handleDelete(oneBook._id, oneBook.userId._id)
                          }
                        >
                          {console.log(oneBook)}
                          <MdDelete className="profile-icon" id="pic4" />
                          <p className="no-text-icon">🗑️ Supprimer</p>
                        </li>
                      </ul>
                    ) : null}
                  </ul>
                </article>
              </section>
            )}
          </>
        ))}

        {books.length === 0 && (
          <article className="p-sous-section" id="none-book">
            <h1>Votre profil est encore vierge de publications.</h1>
            <p>
              Il semble que vous n'ayez pas encore eu l'occasion de partager vos
              récits et vos idées avec notre communauté. Ne vous inquiétez pas,
              c'est le moment idéal pour commencer à écrire et à partager vos
              créations !
            </p>

            <p>
              L'écriture est une aventure passionnante où chaque mot peut
              inspirer, émouvoir et divertir. Que vous soyez un romancier en
              herbe, un poète ou un essayiste, votre voix est importante pour
              enrichir notre communauté littéraire.
            </p>

            <p>
              Prenez un moment pour explorer vos idées, laisser libre cours à
              votre imagination et écrire votre première publication. Cliquez
              <Link to="/publier" className="none-book-link">
                [ici]
              </Link>
              pour commencer dès maintenant !
            </p>

            <p>
              Rappelez-vous, chaque contribution compte. Vos mots peuvent avoir
              un impact sur d'autres lecteurs et écrivains. Rejoignez-nous dans
              cette merveilleuse aventure littéraire et partagez votre passion
              pour l'écriture avec le monde entier.
            </p>

            <p>
              Nous sommes impatients de découvrir vos histoires uniques et de
              vous accueillir dans notre communauté d'écrivains. À vos plumes !
            </p>

            <img src={logo} alt="logo-img" className="p-logo-img" />
          </article>
        )}
      </section>

      <aside className="p-aside">
        <section className="p-aside-section">
          <span className="home-title1">
            <img
              src={arrow1}
              alt="title-left-arrow"
              className="title-left-arrow"
            />
            <h2>Autres Auteurs</h2>

            <img
              src={arrow2}
              alt="title-right-arrow"
              className="title-right-arrow"
            />
          </span>
          <section className="p-section3">
            {authors.map((oneAuthor, i) => (
              <article key={oneAuthor._id} className="p-author-article">
                <ul className="p-author-image">
                  {oneAuthor.image && (
                    <li>
                      <img
                        src={`http://localhost:9000/assets/img/${oneAuthor.image.src}`}
                        alt={oneAuthor.image.alt}
                        className="p-author-img"
                      />
                    </li>
                  )}
                  {!oneAuthor.image && (
                    <li>
                      <img
                        src={userImage}
                        alt="user-image"
                        className="p-author-img"
                      />
                    </li>
                  )}
                </ul>

                <ul className="p-author-text">
                  <li>
                    <Link
                      to={`/profil/${oneAuthor._id}`}
                      className="p-author-link"
                    >
                      <p className="p-author-name">{oneAuthor.login}</p>
                    </Link>
                  </li>
                </ul>
              </article>
            ))}
          </section>
        </section>

        <section className="p-aside-section">
          <span className="home-title1">
            <img
              src={arrow1}
              alt="title-left-arrow"
              className="title-left-arrow"
            />
            <h2>Nouveautés</h2>

            <img
              src={arrow2}
              alt="title-right-arrow"
              className="title-right-arrow"
            />
          </span>

          <section className="p-section4">
            {newBooks.map((oneNewBook) => (
              <article key={oneNewBook._id} className="p-book-article">
                <Link to={`/livre/${oneNewBook._id}`}>
                  <ul>
                    <li>
                      <img
                        className="p-book-img"
                        src={`http://localhost:9000/assets/img/${oneNewBook.image.src}`}
                        alt={oneNewBook.image.alt}
                      />
                    </li>
                    <li>
                      <p className="p-book-title">{oneNewBook.title}</p>
                    </li>
                  </ul>
                </Link>
              </article>
            ))}
          </section>
        </section>
      </aside>
    </main>
  );
};

export default ProfileUser;
