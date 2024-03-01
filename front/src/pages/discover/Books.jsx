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
        setCurrentBooks(res.data.slice(0, 6));
      })
      .catch((res) => {
        console.log(res);
        setErr("Impossible de charger les données");
      });
  }, []);

  const nextBook = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * 6;
    const endIndex = (nextPage + 1) * 6;

    if (endIndex <= books.length) {
      setCurrentBooks(books.slice(startIndex, endIndex));
      setCurrentPage(nextPage);
    } else if (startIndex < books.length) {
      setCurrentBooks(books.slice(startIndex));
      setCurrentPage(nextPage);
    }
  };

  const prevBook = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
    const startIndex = Math.max((currentPage - 1) * 6, 0);
    const endIndex = startIndex + 6;
    setCurrentBooks(books.slice(startIndex, endIndex));
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
                      aria-label="books-image"
                      title={oneBook.image.alt}
                    />
                  </li>
                  <li>
                    <NavLink to={`/livre/${oneBook._id}`}>
                      <h3 className="books-sous-title">{oneBook.title}</h3>
                    </NavLink>
                    <pre className="bk-author2">Par {oneBook.userId.login}</pre>
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

      <section className="books-section3">
        <button onClick={prevBook} className="page-buttonL" id="p-btn1">
          Précédent
        </button>
        <button onClick={nextBook} className="page-buttonR" id="p-btn2">
          Suivant
        </button>
      </section>
    </main>
  );
};

export default Books;
