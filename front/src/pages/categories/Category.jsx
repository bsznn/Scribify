import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";

import panelImg from "../../assets/images/list/cat.png";
import lune from "../../assets/images/forms/lune8.png";

const Category = () => {
  // Récupération de l'identifiant de la catégorie à partir des paramètres d'URL
  const { categoryId } = useParams();

  // États pour stocker les données de la catégorie et des livres, ainsi que pour gérer les erreurs
  const [category, setCategory] = useState([]);
  const [books, setBooks] = useState([]);
  const [err, setErr] = useState(null);

  // Utilisation de useEffect pour charger les données de la catégorie et des livres associés
  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/category/${categoryId}`)
      .then((res) => {
        setCategory(res.data.category); // Mise à jour de l'état de la catégorie
        setBooks(res.data.books); // Mise à jour de l'état des livres
      })
      .catch((error) => {
        setErr(
          "Impossible de charger la catégorie ou les livres de la catégorie"
        ); // Gestion des erreurs de chargement
      });
  }, [categoryId]); // Déclenchement de useEffect à chaque changement de l'identifiant de la catégorie

  return (
    <main className="m-container">
      {err && <p>{err}</p>} {/* Affichage de l'erreur si elle existe */}
      {/* Section affichant le titre et la description de la catégorie */}
      <section className="cat-title" id="list-first">
        <h1 className="cat-h1">{category.name}</h1>

        <ul className="list-ul">
          <li>
            <h2 className="cat-h1-v2">{category.name}</h2>
            <img
              src={panelImg}
              alt="category-title"
              className="list-title-img"
              id="cat-title-img"
              aria-label="category-image"
              title="category-image"
            />
          </li>
          <li>
            <p className="list-none" id="cat-none">
              {category.description}
            </p>
          </li>
          <li>
            <img
              src={lune}
              alt="fond-lune"
              className="list-fond-img"
              id="cat-fond-img"
            />
          </li>
        </ul>
      </section>
      {/* Section affichant la liste des livres de la catégorie */}
      <section className="cat-section2">
        {books.map((book) => (
          <NavLink to={`/livre/${book._id}`} key={book._id}>
            <section className="cat-sous-section">
              {/* Bloc représentant chaque livre */}
              <article className="cat-section-bloc">
                <ul className="cat-article1">
                  <li>
                    <img
                      className="cat-img"
                      src={`http://localhost:9000/assets/img/${book.image.src}`}
                      alt={book.image.alt}
                    />
                  </li>
                  <li>
                    <h4 className="cat-sous-title">{book.title}</h4>
                  </li>
                </ul>
              </article>

              {/* Détails du livre */}
              <article className="cat-article2">
                <ul>
                  <li className="description">{book.description}</li>
                  <li className="b-article-pre" id="cat-pre">
                    <pre>
                      Créé le: {new Date(book.createdAt).toLocaleDateString()}
                    </pre>
                    <pre>
                      Modifié le:{" "}
                      {new Date(book.updatedAt).toLocaleDateString()}
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

export default Category;
