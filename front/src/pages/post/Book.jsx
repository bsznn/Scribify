import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
import "../../assets/styles/book/comment.css";

import { useAuth } from "../../context/AuthContext";
import { token } from "../../context/token";
import AddComment from "../comments/AddComment";
import Comments from "../comments/Comments";

const Book = () => {
  const [book, setBook] = useState();
  const [categories, setCategories] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [err, setErr] = useState();
  const [sucessMessage, setSuccessMessage] = useState();
  const [showComments, setShowComments] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [handleCurrentChapter, setHandleCurrentChapter] = useState([]);
  const { id } = useParams();
  // const commentsRef = useRef(null);

  const auth = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/${id}`)
      .then((res) => {
        console.log(res.data);
        setBook(res.data);
        setCategories(res.data.categoryId);
        setChapters(res.data.chapters);
        setHandleCurrentChapter([res.data.chapters[0]]);
      })
      .catch((res) => {
        setErr("Impossible de récuperer le livre !");
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
          setChapters((prevChapters) =>
            prevChapters.filter((chapter) => chapter._id !== id)
          );
          alert(res.data.message);
        })
        .catch((error) => {
          return alert(error.response.data.message);
        });
    }
  };

  // const scrollToComments = () => {
  //   if (commentsRef.current) {
  //     commentsRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  // const handleCurrentChapter = chapters.slice(0, 1);
  // console.log(handleCurrentChapter);

  const nextChapter = () => {
    setCurrentChapter((prev) => prev + 1);
    if (currentChapter >= chapters.length - 1) {
      setCurrentChapter(chapters.length - 1);
      setHandleCurrentChapter([chapters[chapters.length - 1]]);
    } else {
      setHandleCurrentChapter([chapters[currentChapter + 1]]);
    }
  };

  const prevChapter = () => {
    setCurrentChapter((prev) => prev - 1);
    if (currentChapter - 1 < 0) {
      setCurrentChapter(0);
      setHandleCurrentChapter([chapters[0]]);
    } else {
      setHandleCurrentChapter([chapters[currentChapter - 1]]);
    }
  };

  return (
    <main className="m-container">
      <section className="bk-section">
        {err && <span>{err}</span>}
        {book && (
          <>
            <section className="bk-section-livre">
              <article className="article-livre">
                <img
                  className="bk-img"
                  src={`http://localhost:9000/assets/img/${book.image.src}`}
                  alt={book.image.alt}
                  aria-label="book-image"
                  title={book.image.alt}
                />
              </article>
              <article className="bk-article1">
                <ul className="bk-ul1">
                  <li>
                    <h2 className="bk-title">{book.title}</h2>
                    <pre className="bk-author"> Par {book.userId.login}</pre>
                  </li>

                  <ul className="bk-ul2">
                    <li className="description">{book.description}</li>
                    <li className="categories">
                      {categories &&
                        categories.map((category, index) => (
                          <span key={index}>#{category.name} </span>
                        ))}
                    </li>
                  </ul>
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
            </section>

            <section className="section-chapitre">
              {handleCurrentChapter.length > 0 &&
                handleCurrentChapter.map((chapter, index) => (
                  <article key={index} className="bk-article2">
                    <ul className="bk-ul4">
                      <li>
                        <h4>{chapter.title}</h4>
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
                    {auth.user &&
                    (auth.user.role === "admin" ||
                      auth.user.id === book.userId._id) ? (
                      <ul className="bk-ul5">
                        <li>
                          <Link
                            to={`/modifier-chapitre/${book._id}/${chapter._id}`}
                          >
                            <IoIosSettings className="profile-icon" />
                            <p className="bk-text-none">Modifier</p>
                          </Link>
                        </li>
                        <li onClick={() => handleDelete(book._id, chapter._id)}>
                          <MdDelete className="profile-icon" />
                          <p className="bk-text-none">Supprimer</p>
                        </li>
                      </ul>
                    ) : null}
                    <span className="page-button">
                      <button onClick={prevChapter} className="page-buttonL">
                        Précédent
                      </button>
                      <button onClick={nextChapter} className="page-buttonR">
                        Suivant
                      </button>
                    </span>
                  </article>
                ))}

              <article className="bk-article3">
                {auth.user &&
                (auth.user.role === "admin" ||
                  auth.user.id === book.userId._id) ? (
                  <>
                    <ul className="bk-ul6">
                      <span>
                        <li>
                          <Link to={`/ajouter-chapitre/${book._id}`}>
                            <IoIosAddCircle className="chapter-button" />
                            <p className="bk-text-none">Nouveau</p>
                          </Link>
                        </li>
                        <li>
                          <LikeCounter />
                        </li>
                      </span>
                    </ul>
                    <ul className="bk-ul7">
                      <li>
                        <AddComment bookId={id} />
                        <p>{showComments && <Comments bookId={id} />}</p>
                      </li>
                    </ul>
                  </>
                ) : null}
              </article>
            </section>
          </>
        )}
      </section>
    </main>
  );
};

export default Book;
