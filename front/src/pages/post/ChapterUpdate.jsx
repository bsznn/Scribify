import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { token } from "../../context/token";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/styles/forms/forms.css";

import rotate from "../../assets/images/forms/lune.png";
import rotate2 from "../../assets/images/forms/lune2.png";

const ChapterUpdate = () => {
  const [inputs, setInputs] = useState({
    chapterContent: "",
    chapterTitle: "",
  });

  const { bookId, chapterId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/${bookId}`)
      .then((res) => res.data)
      .then((bookData) => {
        const chapter = bookData.chapters.find((ch) => ch._id === chapterId);

        if (chapter) {
          setInputs({
            chapterTitle: chapter.title,
            chapterContent: chapter.content,
          });
        } else {
          return alert("Chapitre non trouvé !");
        }
      })
      .catch((error) => {
        return alert(
          "Une erreur est survenue lors de la récupération du livre."
        );
      });
  }, [bookId, chapterId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleQuill = (chapterContent, delta, source, editor) => {
    setInputs({ ...inputs, chapterContent: editor.getHTML() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      inputs.chapterContent.trim() === "" ||
      inputs.chapterTitle.trim() === ""
    ) {
      return alert("Veuillez remplir tous les champs");
    }

    const chapter = {
      title: inputs.chapterTitle,
      content: inputs.chapterContent,
    };

    const data = {
      chapters: [chapter],
    };

    axios
      .put(
        `http://localhost:9000/books/chapter/edit/${bookId}/${chapterId}`,
        { chapters: [inputs] },
        {
          headers: {
            ...token(),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        alert(res.data.message);
        navigate(`/livre/${bookId}`);
      })
      .catch((error) => {
        return alert(error.response.data.message);
      });
  };

  return (
    <main>
      <section className="section-style2">
        <img src={rotate} alt="image-lune" className="rotate-gif3" />
        <img src={rotate2} alt="image-lune" className="rotate-gif2" />

        <form onSubmit={handleSubmit} className="form-style2">
          <h2>Modifier un chapitre</h2>
          <label htmlFor="chapterTitle">Titre du chapitre : </label>
          <input
            className="form-input2"
            onChange={handleChange}
            value={inputs.chapterTitle}
            type="text"
            id="chapterTitle"
            name="chapterTitle"
          />

          <label htmlFor="chapterContent">Contenu du chapitre : </label>
          <ReactQuill
            className="ql-editor"
            theme="snow"
            value={inputs.chapterContent}
            onChange={handleQuill}
          />

          <button className="form-button">Valider</button>
        </form>
      </section>{" "}
    </main>
  );
};

export default ChapterUpdate;
