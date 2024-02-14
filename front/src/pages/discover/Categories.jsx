import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

import { IoIosSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { token } from "../../context/token";

import "../../assets/styles/categories/categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9000/categories/")
      .then((res) => {
        console.log(res);
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
        setError("Impossible de charger les catégories");
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer la catégorie ?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:9000/categories/delete/${id}`, {
          headers: token(),
        })
        .then((res) => {
          console.log(res.data.message);
          setSuccessMessage("La catégorie a été supprimée avec succès");
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category._id !== id)
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <main className="m-container">
      {error && <p>{error}</p>}

      <section className="category-title">
        <h1>Catégories</h1>
        <p className="category-none">
          Découvrez les catégories sur Scribify : votre outil d'organisation
          essentiel pour classer et structurer vos écrits selon thèmes et
          genres, simplifiant ainsi la navigation et la gestion de votre
          contenu.
        </p>

        <Link to={`/ajouter-categorie`}>
          <pre className="category-none" id="c-pre">
            Nouvelle Catégorie
          </pre>

          <IoIosAddCircle className="category-button" />
        </Link>
      </section>

      <section className="category-scroll">
        {categories.map((category) => (
          <section key={category._id} className="category-section">
            <article className="category-image">
              {category.image && (
                <img
                  src={`http://localhost:9000/assets/img/${category.image.src}`}
                  alt={category.image.alt}
                  className="category-img"
                />
              )}
            </article>

            <article className="category-text">
              <NavLink
                to={`/categorie/${category._id}`}
                className="category-link"
              >
                <h3 className="category-name">{category.name}</h3>
              </NavLink>
              {/* <p>{category.description}</p> */}
            </article>

            <article>
              <Link to={`/modifier-categorie/${category._id}`}>
                <IoIosSettings className="category-icon" />
              </Link>

              <span onClick={() => handleDelete(category._id)}>
                <MdDelete className="category-icon" />
              </span>
            </article>
          </section>
        ))}
      </section>
    </main>
  );
};

export default Categories;
