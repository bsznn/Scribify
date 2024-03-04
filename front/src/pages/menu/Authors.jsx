import React, { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../../context/token";
import { NavLink } from "react-router-dom";

import "../../assets/styles/lists/authors.css";
import userImage from "../../assets/images/users/default-profil.png";
import logoImage from "../../assets/images/logo/logo2.png";

import panelImg from "../../assets/images/list/author.png";
import lune from "../../assets/images/forms/lune5.png";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [err, setErr] = useState(null);

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
  return (
    <main className="m-container">
      <section className="author-title" id="list-first">
        <h1 className="author-h1">Auteurs</h1>
        <ul className="list-ul">
          <li>
            <img src={panelImg} alt="author-title" className="list-title-img" />
          </li>
          <li>
            <p className="list-none" id="author-none">
              Découvrez les profils d'auteurs sur Scribify : votre compagnon
              essentiel pour explorer une variété d'écrivains, chacun apportant
              sa voix unique et son expertise à travers une diversité de genres
              et de sujets. Scribify vous offre un accès privilégié à une
              communauté d'auteurs passionnés, vous permettant d'explorer, de
              vous inspirer et de collaborer avec des talents émergents et des
              auteurs établis.
            </p>
          </li>
          <li>
            <img src={lune} alt="fond-lune" className="list-fond-img" />
          </li>
        </ul>
      </section>

      <section className="author-scroll">
        {authors.map((oneAuthor, i) => (
          <section key={oneAuthor._id} className="author-section">
            <article className="author-image">
              {oneAuthor.image && ( // Vérification si 'image' est défini
                <img
                  src={`http://localhost:9000/assets/img/${oneAuthor.image.src}`}
                  alt={oneAuthor.image.alt}
                  className="author-img"
                  aria-label="author-image"
                  title={oneAuthor.image.alt}
                />
              )}
              {!oneAuthor.image && (
                <img
                  src={userImage}
                  alt="default-image"
                  className="author-img"
                  aria-label="default-image"
                  title="default-image"
                />
              )}
            </article>

            <article className="author-text">
              <NavLink to={`/profil/${oneAuthor._id}`} className="author-link">
                <h3 className="author-name">{oneAuthor.login}</h3>
              </NavLink>
            </article>

            <article>
              <img src={logoImage} alt="logo-image" className="author-icon" />
            </article>
          </section>
        ))}
      </section>
    </main>
  );
};

export default Authors;