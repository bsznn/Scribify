import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";

import panelImg from "../../assets/images/list/cat.png";
import lune from "../../assets/images/forms/lune8.png";

const Category = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState([]);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/category/${categoryId}`)
      .then((res) => {
        setCategory(res.data.category);
        console.log(res.data);
        setBooks(res.data.books);
      })
      .catch((error) => {
        setError(
          "Impossible de charger la catégorie ou les livres de la catégorie"
        );
      });
  }, [categoryId]);

  // Fonction pour tronquer la description à 250 caractères
  const truncateDescription = (description) => {
    if (description.length > 250) {
      return description.substring(0, 250) + "...";
    }
    return description;
  };

  return (
    <main className="m-container">
      {error && <p>{error}</p>}

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

      <ul>
        <li></li>
      </ul>

      <section className="cat-section2">
        {books.map((book) => (
          <NavLink to={`/livre/${book._id}`} key={book._id}>
            <section className="cat-sous-section">
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

              <article className="cat-article2">
                <ul>
                  <li className="description">
                    {truncateDescription(book.description)}
                  </li>
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
