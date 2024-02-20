import React, { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../../context/token";
import { NavLink } from "react-router-dom";

import "../../assets/styles/lists/readers.css";
import userImage from "../../assets/images/users/default-profil.png";
import logoImage from "../../assets/images/logo/logo2.png";

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
      <section className="reader-title">
        <h1>Lecteurs</h1>
        <p className="reader-none">
          Découvrez la communauté des lecteurs sur Scribify : un lieu de
          rencontre pour explorer de nouvelles œuvres littéraires, partager des
          recommandations et échanger des impressions de lecture. Rejoignez-nous
          pour une expérience de lecture enrichissante et une interaction avec
          une communauté de passionnés de livres sur Scribify.
        </p>
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
                />
              )}
              {!oneReader.image && (
                <img src={userImage} alt="user-image" className="reader-img" />
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
