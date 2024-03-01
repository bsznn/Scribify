import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { token } from "../../context/token";
import { useAuth } from "../../context/AuthContext";

import { IoIosSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import "../../assets/styles/profile/profile.css";
import arrow1 from "../../assets/images/home/arrow2.png";
import arrow2 from "../../assets/images/home/arrow1.png";

import logo from "../../assets/images/logo/logo2.png";

const GetOneBook = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [err, setErr] = useState();

  const auth = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/my-book/${auth.user.id}`, {
        headers: token(),
      })
      .then((res) => {
        setBooks(res.data);
        setCategories(res.data);
      })
      .catch((res) => {
        setErr("Impossible de charger les livres de l'utilisateur !");
      });
  }, []);

  const handleDeleteBook = (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer le livre ?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:9000/books/delete/${id}/${auth.user.id}`, {
          headers: token(),
        })
        .then((res) => {
          alert("Le livre a été supprimé avec succès !");
          setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
        })
        .catch((err) => {
          alert("Impossible de supprimer le livre !");
        });
    }
  };

  return (
    <>
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
                        aria-label="book-image"
                        title={oneBook.image.alt}
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
                    <li className="description">{oneBook.description}</li>
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
                        </pre>
                      </li>
                      <li>
                        <pre>
                          Modifié le :
                          {new Date(oneBook.updatedAt).toLocaleDateString()}
                        </pre>
                      </li>
                    </span>

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
                      <li onClick={() => handleDeleteBook(oneBook._id)}>
                        <MdDelete className="profile-icon" id="pic4" />
                        <p className="no-text-icon">🗑️ Supprimer</p>
                      </li>
                    </ul>
                  </ul>
                </article>
              </section>
            )}
          </>
        ))}
      </section>

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
            Rappelez-vous, chaque contribution compte. Vos mots peuvent avoir un
            impact sur d'autres lecteurs et écrivains. Rejoignez-nous dans cette
            merveilleuse aventure littéraire et partagez votre passion pour
            l'écriture avec le monde entier.
          </p>

          <p>
            Nous sommes impatients de découvrir vos histoires uniques et de vous
            accueillir dans notre communauté d'écrivains. À vos plumes !
          </p>

          <img
            src={logo}
            alt="logo-image"
            className="p-logo-img"
            aria-label="logo-image"
            title="logo-image"
          />
        </article>
      )}
    </>
  );
};

export default GetOneBook;
