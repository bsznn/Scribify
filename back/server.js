// Import des dépendances et des modules
import express from "express"; // Framework web pour Node.js
import dotenv from "dotenv"; // Module pour charger des variables d'environnement depuis un fichier .env
import connectDB from "./config/db.js"; // Fonction pour établir la connexion à la base de données MongoDB
import cors from "cors"; // Middleware pour gérer les requêtes CORS (Cross-Origin Resource Sharing)
import bookRouter from "./routes/bookRouter.js"; // Routeur pour les fonctionnalités liées aux livres
import userRouter from "./routes/userRouter.js"; // Routeur pour les fonctionnalités liées aux utilisateurs
import commentRouter from "./routes/commentRouter.js"; // Routeur pour les fonctionnalités liées aux commentaires
import chapterRouter from "./routes/chapterRouter.js"; // Routeur pour les fonctionnalités liées aux chapitres
import answerRouter from "./routes/answerRouter.js"; // Routeur pour les fonctionnalités liées aux réponses
import categoryRouter from "./routes/categoryRouter.js"; // Routeur pour les fonctionnalités liées aux catégories

// Création de l'application Express
const app = express();

// Utilisation de middlewares
app.use(express.json()); // Middleware pour analyser les corps des requêtes au format JSON
app.use(express.urlencoded({ extended: true })); // Middleware pour analyser les corps des requêtes avec des données URL encodées
app.use(express.static("public")); // Middleware pour servir les fichiers statiques depuis le répertoire "public"
app.use(
  cors({
    origin: "http://localhost:5173", // Autorise les requêtes provenant de cette origine
    credentials: true, // Autorise l'envoi de cookies avec les requêtes CORS
  })
);

// Chargement des variables d'environnement à partir du fichier .env
dotenv.config();

// Connexion à la base de données MongoDB
connectDB();

// Configuration des routes de l'application
app.use(bookRouter); // Routes liées aux livres
app.use(userRouter); // Routes liées aux utilisateurs
app.use(commentRouter); // Routes liées aux commentaires
app.use(answerRouter); // Routes liées aux réponses
app.use(chapterRouter); // Routes liées aux chapitres
app.use(categoryRouter); // Routes liées aux catégories

// Démarrage du serveur Express
app.listen(process.env.PORT, () => {
  console.log(`Le serveur est exécuté à : ${process.env.BASE_URL}`);
});
