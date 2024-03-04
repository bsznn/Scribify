import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { token } from "../../context/token";
import { useAuth } from "../../context/AuthContext";

import "../../assets/styles/profile/profile.css";
import arrow1 from "../../assets/images/home/arrow2.png";
import arrow2 from "../../assets/images/home/arrow1.png";

import userImage from "../../assets/images/users/default-profil.png";

// Composant pour récupérer les données des autres auteurs et des nouveaux livres
const GetAsideMenu = () => {
  const [authors, setAuthors] = useState([]); // État pour stocker les auteurs
  const [newBooks, setNewBooks] = useState([]); // État pour stocker les nouveaux livres
  const [err, setErr] = useState(); // État pour gérer les erreurs
  // Utilisation du contexte d'authentification
  const auth = useAuth();

  // Effet pour récupérer les auteurs depuis l'API
  useEffect(() => {
    axios
      .get("http://localhost:9000/users", { headers: token() })
      .then((response) => {
        const allUsers = response.data;
        const authors = allUsers.authors || [];
        setAuthors(authors); // Mise à jour de la liste des auteurs
      })
      .catch((err) => {
        console.log(err);
        setErr("Impossible de charger les données de l'utilisateur !");
      });
  }, []);

  // Effet pour récupérer les nouveaux livres depuis l'API
  useEffect(() => {
    axios
      .get("http://localhost:9000/books/newest-books")
      .then((res) => {
        setNewBooks(res.data); // Mise à jour de la liste des nouveaux livres
      })
      .catch((res) => {
        setErr("Impossible de charger les nouveaux livres !");
      });
  }, []);

  return (
    <>
      {/* Section pour afficher les autres auteurs et les nouveaux livres */}
      <aside className="p-aside">
        {/* Section pour afficher les autres auteurs */}
        <section className="p-aside-section">
          {/* Titre de la section des autres auteurs */}
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
          {/* Liste des autres auteurs */}
          <section className="p-section3">
            {authors.map((oneAuthor, i) => (
              <article key={oneAuthor._id} className="p-author-article">
                {/* Image de l'auteur */}
                <ul className="p-author-image">
                  {oneAuthor.image ? (
                    <li>
                      <Link to={`/profil/${oneAuthor._id}`}>
                        <img
                          src={`http://localhost:9000/assets/img/${oneAuthor.image.src}`}
                          alt={oneAuthor.image.alt}
                          className="p-author-img"
                          aria-label="author-image"
                          title={oneAuthor.image.alt}
                        />{" "}
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to={`/profil/${oneAuthor._id}`}>
                        <img
                          src={userImage}
                          alt="default-image"
                          className="p-author-img"
                          aria-label="default-image"
                          title="default-image"
                        />{" "}
                      </Link>
                    </li>
                  )}
                </ul>
                {/* Nom de l'auteur */}
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

        {/* Section pour afficher les nouveaux livres */}
        <section className="p-aside-section">
          {/* Titre de la section des nouveaux livres */}
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
          {/* Liste des nouveaux livres */}
          <section className="p-section4">
            {newBooks.map((oneNewBook) => (
              <article key={oneNewBook._id} className="p-book-article">
                {/* lien vers le détail du livre */}
                <Link to={`/livre/${oneNewBook._id}`}>
                  <ul>
                    {/* Image du nouveau livre */}
                    <li>
                      <img
                        className="p-book-img"
                        src={`http://localhost:9000/assets/img/${oneNewBook.image.src}`}
                        alt={oneNewBook.image.alt}
                        aria-label="book-image"
                        title={oneNewBook.image.alt}
                      />
                    </li>
                    {/* Titre du nouveau livre */}
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
    </>
  );
};

export default GetAsideMenu;
