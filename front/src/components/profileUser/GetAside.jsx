import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { token } from "../../context/token";
import { useAuth } from "../../context/AuthContext";

import "../../assets/styles/profile/profile.css";
import arrow1 from "../../assets/images/home/arrow2.png";
import arrow2 from "../../assets/images/home/arrow1.png";

import userImage from "../../assets/images/users/default-profil.png";

const GetAside = () => {
  const [authors, setAuthors] = useState([]);
  const [newBooks, setNewBooks] = useState([]);

  const [err, setErr] = useState();

  const auth = useAuth();

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

  return (
    <>
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
                        aria-label="author-image"
                        title={oneAuthor.image.alt}
                      />
                    </li>
                  )}
                  {!oneAuthor.image && (
                    <li>
                      <img
                        src={userImage}
                        alt="default-image"
                        className="p-author-img"
                        aria-label="default-image"
                        title="default-image"
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
                        aria-label="book-image"
                        title={oneNewBook.image.alt}
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
    </>
  );
};

export default GetAside;
