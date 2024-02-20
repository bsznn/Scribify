import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "../../assets/styles/book/books.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [err, setErr] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:9000/books/")
      .then((res) => {
        console.log(res);
        setBooks(res.data);
      })
      .catch((res) => {
        console.log(res);
        setErr("Impossible de charger les données");
      });
  }, []);

  // Fonction pour tronquer la description à 250 caractères
  const truncateDescription = (description) => {
    if (description.length > 250) {
      return description.substring(0, 250) + "...";
    }
    return description;
  };

  return (
    <main className="m-container">
      <section className="books-title">
        <h1>Livres</h1>
        <p className="books-none">
          Découvrez une multitude d'histoires fascinantes sur Scribify, où
          chaque livre vous transporte dans un univers unique. Du suspense
          palpitant aux romances envoûtantes, de la science-fiction à la
          fantaisie, nos auteurs talentueux vous offrent une variété d'aventures
          captivantes. Plongez dans notre bibliothèque virtuelle dès maintenant
          et laissez-vous emporter par la magie des mots.
        </p>
      </section>

      <section className="books-section2">
        {books.map((oneBook) => (
          <NavLink to={`/livre/${oneBook._id}`} key={oneBook._id}>
            <section className="books-sous-section">
              <article className="books-section-bloc">
                <ul className="books-article1">
                  <li>
                    <img
                      className="books-img"
                      src={`http://localhost:9000/assets/img/${oneBook.image.src}`}
                      alt={oneBook.image.alt}
                    />
                  </li>
                  <li>
                    <NavLink to={`/livre/${oneBook._id}`}>
                      <h3 className="books-sous-title">{oneBook.title}</h3>
                    </NavLink>
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
                  <li className="b-article-pre" id="books-pre">
                    <pre>
                      Créé le:{" "}
                      {new Date(oneBook.createdAt).toLocaleDateString()}
                    </pre>
                    <pre>
                      Modifié le:{" "}
                      {new Date(oneBook.updatedAt).toLocaleDateString()}
                    </pre>
                  </li>
                </ul>
              </article>
            </section>
          </NavLink>
        ))}
      </section>
    </main>
  );
};

export default Books;
