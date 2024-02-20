import express from "express";
import {
  addBook,
  deleteAllBooks,
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

const bookRouter = express.Router();

bookRouter.get("/books", getAllBooks);
bookRouter.get("/books/popular-books", getPopularBooksList);
bookRouter.get("/books/newest-books", getNewestBooks);
bookRouter.get("/books/latest-books", getLatestBooks);
bookRouter.get("/books/latest-chapters", getLatestChapters);
bookRouter.get("/books/:id", getOneBook);

bookRouter.get("/books/category/:id", getBooksByCategoryName);

bookRouter.get("/books/my-book/:userId", isLogged, getBooksByUser);
bookRouter.get("/books/total-views/:userId", isLogged, getTotalViewsByUser);
bookRouter.get("/books/total-likes/:userId", isLogged, getTotalLikesByUser);

bookRouter.post(
  "/books/new",
  isLogged,
  isAuthorized(["admin", "user"]),
  upload.single("image"),
  addBook
);

bookRouter.put(
  "/books/edit/:id",
  isLogged,
  isAuthorized(["admin", "user"]),
  upload.single("image"),
  updateBook
);

bookRouter.put(
  "/books/likes/:id",
  isLogged,
  isAuthorized(["admin", "user"]),
  likeBook
);

bookRouter.delete(
  "/books/delete/:id/:userId",
  isLogged,
  isAuthorized(["admin", "user"]),
  deleteBook
);

bookRouter.delete(
  "/books/delete-all/:userId",
  isLogged,
  isAuthorized(["admin"]),
  deleteAllBooks
);

export default bookRouter;
