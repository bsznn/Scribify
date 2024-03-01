import mongoose from "mongoose"; // Importation du module mongoose pour interagir avec la base de données MongoDB
import dotenv from "dotenv"; // Importation du module dotenv pour charger les variables d'environnement depuis un fichier .env

dotenv.config(); // Chargement des variables d'environnement depuis le fichier .env

const connectDB = () => {
  // Définition de la fonction connectDB qui établit une connexion à la base de données MongoDB
  mongoose // Utilisation de l'objet mongoose pour se connecter à la base de données
    .connect(`${process.env.MONGO_URI}`) // Connexion à l'URI MongoDB spécifiée dans les variables d'environnement
    .then(() => console.log("Connexion à la BDD établie !")) // En cas de succès, affiche un message de succès
    .catch(() => console.log("Impossible de se connecter à la BDD")); // En cas d'échec, affiche un message d'erreur
};

export default connectDB; // Exportation de la fonction connectDB pour pouvoir l'utiliser dans d'autres fichiers
