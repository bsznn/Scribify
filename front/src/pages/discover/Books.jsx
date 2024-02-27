import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "../../assets/styles/book/books.css";

import panelImg from "../../assets/images/list/book.png";
import lune from "../../assets/images/forms/lune8.png";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [err, setErr] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:9000/books/")
      .then((res) => {
        console.log(res);
        setBooks(res.data);
        setCurrentBooks(res.data.slice(0, 5));
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

  const nextBook = () => {
    setCurrentPage((prev) => {
      const nextPage = prev + 5;
      const endPage = nextPage + 5;
      setCurrentBooks(books.slice(nextPage, endPage));
    });
    console.log(currentPage);
  };

  const prevBook = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <main className="m-container">
      <section className="books-title" id="list-first">
        <h1 className="books-h1">Livres</h1>

        <ul className="list-ul">
          <li>
            <img
              src={panelImg}
              alt="category-title"
              className="list-title-img"
              id="books-title-img"
            />
          </li>
          <li>
            <p className="list-none" id="books-none">
              Découvrez une multitude d'histoires fascinantes sur Scribify, où
              chaque livre vous transporte dans un univers unique. Du suspense
              palpitant aux romances envoûtantes, de la science-fiction à la
              fantaisie, nos auteurs talentueux vous offrent une variété
              d'aventures captivantes. Plongez dans notre bibliothèque virtuelle
              dès maintenant et laissez-vous emporter par la magie des mots.
            </p>
          </li>
          <li>
            <img
              src={lune}
              alt="fond-lune"
              className="list-fond-img"
              id="books-fond-img"
            />
          </li>
        </ul>
      </section>

      <section className="books-section2">
        {currentBooks.map((oneBook) => (
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
        <button onClick={prevBook}>Précédent</button>
        <button onClick={nextBook}>Suivant</button>
      </section>
    </main>
  );
};

export default Books;
