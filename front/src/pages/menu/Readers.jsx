import React, { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../../context/token";
import { NavLink } from "react-router-dom";

import "../../assets/styles/lists/readers.css";
import userImage from "../../assets/images/users/default-profil.png";
import logoImage from "../../assets/images/logo/logo2.png";

import panelImg from "../../assets/images/list/reader.png";
import lune from "../../assets/images/forms/lune6.png";

const Readers = () => {
  const [readers, setReaders] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9000/users", { headers: token() })
      .then((response) => {
        const allUsers = response.data;
        const readers = allUsers.readers || [];

        setReaders(readers);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
      });
  }, []);

  return (
    <main className="m-container">
      <section className="reader-title" id="list-first">
        <h1 className="reader-h1">Lecteurs</h1>
        <ul className="list-ul">
          <li>
            <img src={panelImg} alt="reader-title" className="list-title-img" />
          </li>
          <li>
            <p className="list-none" id="reader-none">
              Découvrez la communauté des lecteurs sur Scribify : un lieu de
              rencontre pour explorer de nouvelles œuvres littéraires, partager
              des recommandations et échanger des impressions de lecture.
              Rejoignez-nous pour une expérience de lecture enrichissante et une
              interaction avec une communauté de passionnés de livres sur
              Scribify.
            </p>
          </li>

          <li>
            <img
              src={lune}
              alt="fond-lune"
              className="list-fond-img"
              id="reader-fond-img"
            />
          </li>
        </ul>
      </section>

      <section className="reader-scroll">
        {readers.map((oneReader, i) => (
          <section key={oneReader._id} className="reader-section">
            <article className="reader-image">
              {oneReader.image && ( // Vérification si 'image' est défini
                <img
                  src={`http://localhost:9000/assets/img/${oneReader.image.src}`}
                  alt={oneReader.image.alt}
                  className="reader-img"
                  aria-label="default-image"
                  title={oneReader.image.alt}
                />
              )}
              {!oneReader.image && (
                <img
                  src={userImage}
                  alt="default-image"
                  className="author-img"
                  aria-label="default-image"
                  title="default-image"
                />
              )}
            </article>

            <article className="reader-text">
              <NavLink to={`/profil/${oneReader._id}`} className="reader-link">
                <h3>{oneReader.login}</h3>
              </NavLink>
            </article>

            <article>
              <img src={logoImage} alt="logo-image" className="reader-icon" />
            </article>
          </section>
        ))}
      </section>
    </main>
  );
};

export default Readers;
