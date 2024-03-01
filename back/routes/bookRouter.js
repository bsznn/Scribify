import express from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBooksByCategoryName,
  getBooksByUser,
  getLatestBooks,
  getLatestChapters,
  getNewestBooks,
  getOneBook,
  getPopularBooksList,
  getTotalLikesByUser,
  getTotalViewsByUser,
  likeBook,
  updateBook,
} from "../controllers/booksController.js";
import upload from "../middlewares/multer.js";
import { isAuthorized, isLogged } from "../middlewares/auth.js";

// Router pour gérer les routes liées aux livres
const bookRouter = express.Router();

// Récupérer tous les livres
bookRouter.get("/books", getAllBooks);

// Récupérer la liste des livres populaires
bookRouter.get("/books/popular-books", getPopularBooksList);

// Récupérer la liste des livres les plus récents
bookRouter.get("/books/newest-books", getNewestBooks);

// Récupérer la liste des derniers livres ajoutés
bookRouter.get("/books/latest-books", getLatestBooks);

// Récupérer la liste des derniers chapitres ajoutés
bookRouter.get("/books/latest-chapters", getLatestChapters);

// Récupérer un livre par son ID
bookRouter.get("/books/:id", getOneBook);

// Récupérer les livres par catégorie
bookRouter.get("/books/category/:id", getBooksByCategoryName);

// Récupérer les livres d'un utilisateur spécifique
bookRouter.get("/books/my-book/:userId", getBooksByUser);

// Récupérer le nombre total de vues par utilisateur
bookRouter.get("/books/total-views/:userId", getTotalViewsByUser);

// Récupérer le nombre total de likes par utilisateur
bookRouter.get("/books/total-likes/:userId", getTotalLikesByUser);

// Ajouter un nouveau livre
bookRouter.post(
  "/books/new",
  isLogged,
  isAuthorized(["admin", "user"]), // Vérifie si l'utilisateur est autorisé
  upload.single("image"), // Middleware de gestion des fichiers envoyés
  addBook
);

// Mettre à jour un livre existant
bookRouter.put(
  "/books/edit/:id",
  isLogged,
  isAuthorized(["admin", "user"]), // Vérifie si l'utilisateur est autorisé
  upload.single("image"), // Middleware de gestion des fichiers envoyés
  updateBook
);

// Ajouter un like à un livre
bookRouter.put(
  "/books/likes/:id",
  isLogged,
  isAuthorized(["admin", "user"]), // Vérifie si l'utilisateur est autorisé
  likeBook
);

// Supprimer un livre
bookRouter.delete(
  "/books/delete/:id/:userId",
  isLogged,
  isAuthorized(["admin", "user"]), // Vérifie si l'utilisateur est autorisé
  deleteBook
);

export default bookRouter;
