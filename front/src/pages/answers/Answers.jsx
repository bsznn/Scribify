import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "../../assets/styles/book/comment.css";

// Importation du token pour les requêtes HTTP.
import { token } from "../../context/token";

// Importation du composant Answer.
import Answer from "./Answer";

// Définition du composant Answers prenant en paramètres bookId et commentId.
const Answers = ({ bookId, commentId, updateAnswer }) => {
  // Déclaration de l'état local pour gérer les réponses et les erreurs.
  const [answers, setAnswers] = useState([]);
  const [err, setErr] = useState();

  // Utilisation du hook useAuth pour accéder aux informations d'authentification de l'utilisateur.
  const auth = useAuth();

  // Effet useEffect pour charger les réponses au commentaire au chargement du composant ou lors de la mise à jour des dépendances.
  const getAnswers = () => {
    axios
      .get(
        `http://localhost:9000/books/comment/answers/${bookId}/${commentId}`,
        {
          headers: token(),
        }
      )
      .then((res) => {
        console.log(res);
        setAnswers(res.data);
      })
      .catch((res) => {
        console.log(res);
        setErr("Impossible de charger les données");
      });
  };

  // Effet de chargement pour récupérer les réponses liés au livre
  useEffect(() => {
    getAnswers();
  }, [bookId, commentId, updateAnswer]); // Déclenché à chaque changement de bookId

  // Rendu du composant Answers avec la liste des réponses.
  return (
    <main>
      {/* Affichage d'un titre pour les réponses au commentaire */}
      <h5 className="label-answer">Réponses au commentaire :</h5>

      {/* Affichage d'un message si aucune réponse n'est disponible */}
      {answers.length === 0 && (
        <p className="none-answer">
          Il semble que ce commentaire n'ait encore reçu aucune réponse.
        </p>
      )}

      {/* Boucle sur les réponses pour afficher chaque réponse */}
      {answers.map((oneAnswer) => (
        <section key={oneAnswer._id}>
          {/* Utilisation du composant Answer pour afficher chaque réponse */}
          <Answer
            bookId={bookId}
            commentId={commentId}
            answerId={oneAnswer._id}
          />
        </section>
      ))}
    </main>
  );
};

export default Answers;
