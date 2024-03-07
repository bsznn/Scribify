import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../assets/styles/home/home.css";
import concoursImage from "../../assets/images/home/concours-ecriture.png";
import conseilsImage from "../../assets/images/home/conseils-ecriture.png";
import recrutementImage from "../../assets/images/home/recrutement.png";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

import arrow1 from "../../assets/images/home/arrow2.png";
import arrow2 from "../../assets/images/home/arrow1.png";
import back from "../../assets/images/home/fond.png";
import lune from "../../assets/images/forms/lune5.png";

const Home = () => {
  // State pour stocker les données récupérées depuis l'API
  const [booksPopulars, setBooksPopulars] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [lastUpdates, setLastUpdates] = useState([]);
  const [categories, setCategories] = useState([]);

  // State pour gérer les erreurs
  const [err, setErr] = useState();

  // Utilisation du contexte d'authentification
  const auth = useAuth();

  // Fonction pour récupérer les livres postés par un utilisateur
  useEffect(() => {
    axios
      .get("http://localhost:9000/books/popular-books")
      .then((res) => {
        console.log(res);
        setBooksPopulars(res.data);
      })
      .catch((res) => {
        console.log(res);
        setErr("Impossible de charger les données");
      });
  }, []);

  // Fonction pour récupérer les nouveaux livres
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

  // Fonction pour récupérer les derniers chapitres
  useEffect(() => {
    axios
      .get("http://localhost:9000/books/latest-chapters")
      .then((res) => {
        console.log(res);
        setLastUpdates(res.data);
      })
      .catch((res) => {
        console.log(res);
        setErr("Impossible de charger les données");
      });
  }, []);

  // Fonction pour récupérer les catégories
  useEffect(() => {
    axios
      .get("http://localhost:9000/categories")
      .then((res) => {
        console.log(res);
        setCategories(res.data); // Supposons que res.data est un tableau d'objets contenant les catégories
      })
      .catch((res) => {
        console.log(res);
        setErr("Impossible de charger les données");
      });
  }, []);

  return (
    <>
      <main className="home">
        {/* Section principale de la page d'accueil */}
        <section className="h-section1">
          <img src={back} alt="caroussel-fond" className="caroussel-fond1" />
          <img src={lune} alt="lune-fond" className="lune-bg" />
          {/* Contenu de la première section */}
          <article className="h-article1">
            <p>
              Célébrez les mots avec Scribify : un voyage littéraire au cœur de
              l'imagination.
            </p>
            <ul className="h-section-ul">
              <li>
                {/* Liens vers différentes sections en fonction de l'état de l'authentification */}
                <Link to="/publier" className="h-link1">
                  Postez votre premier livre
                </Link>
              </li>
              {!auth.user ? (
                <li>
                  <Link to="/s-inscrire" className="h-link2">
                    Inscrivez-vous
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/livres" className="h-link2">
                    Faites vos lectures
                  </Link>
                </li>
              )}
            </ul>
          </article>
          {/* Section pour les images des sections spéciales */}
          <article className="h-article2">
            <span className="images">
              <Link to="/concours">
                <img src={concoursImage} alt="concours" />
              </Link>
              <Link to="/conseils">
                <img src={conseilsImage} alt="conseils" />
              </Link>
              <Link to="/recrutement">
                <img src={recrutementImage} alt="recrutement" />
              </Link>
            </span>
          </article>
        </section>

        {/* Section centrale de la page d'accueil */}
        <section className="home-center">
          {/* Titre et contenu pour les livres populaires */}
          <span className="home-title1">
            <img
              src={arrow1}
              alt="title-left-arrow"
              className="title-left-arrow"
            />
            <h2>Populaires</h2>
            <img
              src={arrow2}
              alt="title-right-arrow"
              className="title-right-arrow"
            />
          </span>
          <section className="h-popular-section">
            <section className="h-section2">
              {/* Affichage des livres populaires */}
              {booksPopulars.map((oneBookPopular) => (
                <article key={oneBookPopular._id} className="book-item">
                  <NavLink to={`/livre/${oneBookPopular._id}`}>
                    <span className="h-article3">
                      <img
                        className="h-img1"
                        src={`http://localhost:9000/assets/img/${oneBookPopular.image.src}`}
                        alt={oneBookPopular.image.alt}
                        aria-label="popular-books"
                        title={oneBookPopular.image.alt}
                      />
                      <p className="h-title">{oneBookPopular.title}</p>
                    </span>
                  </NavLink>
                </article>
              ))}
            </section>
          </section>

          {/* Titre et contenu pour les nouveaux livres */}
          <span className="home-title1">
            <img
              src={arrow1}
              alt="title-left-arrow2"
              className="title-left-arrow2"
            />
            <h2>Nouveautés</h2>
            <img
              src={arrow2}
              alt="title-right-arrow2"
              className="title-right-arrow2"
            />
          </span>
          <section className="h-popular-section">
            <section className="h-section2">
              {/* Affichage des nouveaux livres */}
              {newBooks.map((oneNewBook) => (
                <article key={oneNewBook._id} className="book-item">
                  <NavLink to={`/livre/${oneNewBook._id}`}>
                    <span className="h-article3">
                      <img
                        className="h-img1"
                        src={`http://localhost:9000/assets/img/${oneNewBook.image.src}`}
                        alt={oneNewBook.image.alt}
                        aria-label="new-books"
                        title={oneNewBook.image.alt}
                      />
                      <p className="h-title">{oneNewBook.title}</p>
                    </span>
                  </NavLink>
                </article>
              ))}
            </section>
          </section>

          {/* Contenu de la barre latérale */}
          <aside className="h-aside">
            {/* Section pour les récents chapitres */}
            <section>
              <span className="home-title2">
                <img
                  src={arrow1}
                  alt="title-left-arrow3"
                  className="title-left-arrow3"
                />
                <h2>Récents Chapitres</h2>
                <img
                  src={arrow2}
                  alt="title-right-arrow3"
                  className="title-right-arrow3"
                />
              </span>
              <section className="h-recent-section">
                {/* Affichage des récents chapitres */}
                {lastUpdates.map((oneLastUpdate) => (
                  <article key={oneLastUpdate._id} className="h-recent-article">
                    <NavLink to={`/livre/${oneLastUpdate._id}`}>
                      <p className="h-chapters">{oneLastUpdate.title}</p>
                    </NavLink>
                  </article>
                ))}
              </section>
            </section>

            {/* Section pour les catégories */}
            <section>
              <span className="home-title2">
                <img
                  src={arrow1}
                  alt="title-left-arrow4"
                  className="title-left-arrow4"
                />
                <h2>Catégories</h2>
                <img
                  src={arrow2}
                  alt="title-right-arrow4"
                  className="title-right-arrow4"
                />
              </span>
              <section className="h-category-section">
                {/* Affichage des catégories */}
                {categories.map((category) => (
                  <article key={category._id} className="h-category-article">
                    <NavLink to={`/categorie/${category._id}`}>
                      <p className="h-categories">{category.name}</p>
                    </NavLink>
                  </article>
                ))}
              </section>
            </section>

            {/* Section pour les actualités */}
            <section className="aside-3">
              <span className="home-title2">
                <img
                  src={arrow1}
                  alt="title-left-arrow4"
                  className="title-left-arrow4"
                />
                <h2>Actualités</h2>
                <img
                  src={arrow2}
                  alt="title-right-arrow4"
                  className="title-right-arrow4"
                />
              </span>
              <section className="h-news-section">
                {/* Affichage des actualités */}
                <article className="h-news-article">
                  <span>
                    <NavLink to="/concours">
                      <h3>Concours</h3>
                    </NavLink>
                    <blockquote>
                      ❝Explorez nos concours d'écriture en cours et
                      préparez-vous à laisser libre cours à votre créativité. ❞
                    </blockquote>
                  </span>
                  <span>
                    <NavLink to="/conseils">
                      <h3>Conseils</h3>
                    </NavLink>
                    <blockquote>
                      ❝Que vous soyez un écrivain chevronné ou un novice
                      passionné, nous sommes ravis de partager des conseils qui
                      vous aideront à affiner vos compétences littéraires. ❞
                    </blockquote>
                  </span>
                  <span>
                    <NavLink to="/recrutement">
                      <h3>Recrutement</h3>
                    </NavLink>
                    <blockquote>
                      ❝Si vous partagez notre passion pour l'écriture et
                      l'innovation, alors Scribify est l'endroit idéal pour
                      vous. ❞
                    </blockquote>
                  </span>
                </article>
              </section>
            </section>
          </aside>
        </section>
      </main>
    </>
  );
};

export default Home;
