import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

import { IoIosSettings } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { token } from "../../context/token";

import "../../assets/styles/categories/categories.css";
import logoImage from "../../assets/images/logo/logo2.png";
import { useAuth } from "../../context/AuthContext";

import panelImg from "../../assets/images/list/categories.png";
import lune from "../../assets/images/forms/lune7.png";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const auth = useAuth();

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
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category._id !== id)
          );
          alert("La catégorie a été supprimée avec succès !");
        })
        .catch((err) => {
          alert("Impossible de supprimer la catégorie !");
        });
    }
  };

  return (
    <main className="m-container">
      {error && <p>{error}</p>}

      <section className="category-title" id="list-first">
        <h1 className="category-h1">Catégories</h1>

        <ul className="list-ul">
          <li>
            <img
              src={panelImg}
              alt="category-title"
              className="list-title-img"
              id="category-title-img"
            />
          </li>
          <li>
            <p className="list-none" id="p-category-none">
              Découvrez les catégories sur Scribify : votre outil indispensable
              pour organiser et structurer vos écrits selon thèmes et genres.
              Simplifiez la navigation et la gestion de votre contenu en
              regroupant vos œuvres de manière logique. Les catégories offrent
              une expérience de lecture fluide pour vos lecteurs tout en vous
              permettant de suivre facilement vos progrès d'écriture et
              d'explorer de nouveaux thèmes et genres littéraires.
            </p>
            <li>
              <img
                src={lune}
                alt="fond-lune"
                className="list-fond-img"
                id="category-fond-img"
              />
            </li>
          </li>
          <li>
            {auth.user && auth.user.role === "admin" && (
              <Link to={`/ajouter-categorie`}>
                <IoIosAddCircle className="category-button" />
              </Link>
            )}
          </li>
        </ul>
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

            {auth.user && auth.user.role === "admin" ? (
              <article>
                <Link to={`/modifier-categorie/${category._id}`}>
                  <IoIosSettings className="category-icon" />
                </Link>

                <span onClick={() => handleDelete(category._id)}>
                  <MdDelete className="category-icon" />
                </span>
              </article>
            ) : (
              <article>
                <img
                  src={logoImage}
                  alt="logo-image"
                  className="category-icon2"
                />
              </article>
            )}
          </section>
        ))}
      </section>
    </main>
  );
};

export default Categories;
