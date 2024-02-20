import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import LikeCounter from "../../components/likes/LikeCounter";

import { IoEyeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";

import "../../assets/styles/book/book.css";
import { useAuth } from "../../context/AuthContext";
import { token } from "../../context/token";
import AddComment from "../comments/AddComment";
import Comments from "../comments/Comments";

const Book = () => {
  const [book, setBook] = useState();
  const [categories, setCategories] = useState([]);
  const [chapters, setChapters] = useState();
  const [err, setErr] = useState();
  const [sucessMessage, setSuccessMessage] = useState();
  const [showComments, setShowComments] = useState(false);
  const { id } = useParams();

  const auth = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/${id}`)
      .then((res) => {
        console.log(res.data);
        setBook(res.data);
        setCategories(res.data.categoryId);
        setChapters(res.data.chapters);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, [id]);

  const handleDelete = (bookId, chapterId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer le chapitre ?"
    );

    if (confirmDelete) {
      axios
        .delete(
          `http://localhost:9000/books/chapter/delete/${bookId}/${chapterId}`,
          { headers: token() }
        )
        .then((res) => {
          console.log(res.data.message);
          setSuccessMessage("Le chapitre a été supprimé avec succès");
          setChapters((prevChapters) =>
            prevChapters.filter((chapter) => chapter._id !== id)
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <main className="m-container">
      <section className="bk-section">
        {book && (
          <>
            <article className="bk-article1">
              <ul className="bk-ul1">
                <li>
                  <h2 className="bk-title">{book.title}</h2>
                </li>
              </ul>

              <ul className="bk-ul2">
                <li>
                  <img
                    className="bk-img"
                    src={`http://localhost:9000/assets/img/${book.image.src}`}
                    alt={book.image.alt}
                    aria-label="book-image"
                    title={book.image.alt}
                  />
                  <li className="description">{book.description}</li>
                  <li className="categories">
                    {categories &&
                      categories.map((category, index) => (
                        <span key={index}>#{category.name} </span>
                      ))}
                  </li>
                </li>
              </ul>

              <ul className="bk-ul3">
                <li>
                  <IoEyeSharp className="book-icon" id="bic1" />
                  <pre>{book.views}</pre>
                </li>
                <li>
                  <FaHeart className="book-icon" id="bic2" />
                  {/* {book.likes} */} <pre>{book.likes.length}</pre>
                </li>

                <li>
                  <FaComment
                    className="book-icon"
                    id="bic3"
                    onClick={() => setShowComments(!showComments)}
                  />
                  <pre>{book.comments.length}</pre>
                </li>
              </ul>
            </article>

            {chapters &&
              chapters.map((chapter, index) => (
                <article key={index} className="bk-article2">
                  <ul className="bk-ul4">
                    <li>
                      <h4>{chapter.title}</h4>
                      {console.log(chapter)}
                    </li>
                    <li>
                      <p
                        className="description"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(chapter.content),
                        }}
                      />
                    </li>
                  </ul>
                  {auth.user && auth.user.id === book.userId._id ? (
                    <ul className="bk-ul5">
                      <li>
                        <Link
                          to={`/modifier-chapitre/${book._id}/${chapter._id}`}
                        >
                          <IoIosSettings className="profile-icon" />
                        </Link>
                      </li>
                      <li>
                        <MdDelete
                          className="profile-icon"
                          onClick={() => handleDelete(book._id, chapter._id)}
                        />
                      </li>
                    </ul>
                  ) : (
                    <ul className="bk-ul5"></ul>
                  )}
                </article>
              ))}

            <article className="bk-article3">
              <ul className="bk-ul6">
                <span>
                  <li>
                    <Link to={`/ajouter-chapitre/${book._id}`}>
                      <IoIosAddCircle className="chapter-button" />
                    </Link>
                  </li>
                  <li>
                    <LikeCounter />
                  </li>
                </span>

                <li>
                  <AddComment bookId={id} />
                  {showComments && <Comments bookId={id} />}
                </li>
              </ul>
            </article>
          </>
        )}
      </section>
    </main>
  );
};

export default Book;
