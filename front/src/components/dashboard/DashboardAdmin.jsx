import React, { useEffect, useState } from "react"; // Importation des modules React nécessaires
import axios from "axios"; // Importation du module Axios pour les requêtes HTTP
import { token } from "../../context/token"; // Importation du token d'authentification

import "../../assets/styles/dashboard/dashboard.css"; // Importation des styles CSS
import { NavLink, useParams } from "react-router-dom"; // Importation de NavLink et useParams pour la navigation

import arrow1 from "../../assets/images/home/arrow2.png"; // Importation des flèches d'images
import arrow2 from "../../assets/images/home/arrow1.png";

import { FaUser } from "react-icons/fa6"; // Importation de l'icône utilisateur depuis react-icons

// Déclaration du composant DashboardAdmin
const DashboardAdmin = () => {
  // Déclaration des états avec useState
  const [users, setUsers] = useState([]); // Liste des utilisateurs
  const [newRoles, setNewRoles] = useState({}); // Nouveaux rôles
  const [userBooksCount, setUserBooksCount] = useState({}); // Nombre de livres par utilisateur
  const [userViewsCount, setUserViewsCount] = useState({}); // Nombre de vues par utilisateur
  const [userLikesCount, setUserLikesCount] = useState({}); // Nombre de likes par utilisateur
  const [err, setErr] = useState(); // Gestion des erreurs

  // Utilisation du hook useEffect pour les effets secondaires
  useEffect(() => {
    // Requête pour récupérer la liste des utilisateurs
    axios
      .get("http://localhost:9000/users", { headers: token() })
      .then((res) => {
        const data = res.data; // Récupération des données de la réponse
        const allUsers = data.users || []; // Extraction de la liste des utilisateurs depuis les données

        const roles = {}; // Initialisation d'un objet pour stocker les rôles des utilisateurs

        // Parcours de tous les utilisateurs
        allUsers.forEach((user) => {
          roles[user._id] = user.role; // Attribution du rôle de chaque utilisateur

          // Requête pour obtenir les livres de l'utilisateur actuel
          axios
            .get(`http://localhost:9000/books/my-book/${user._id}`, {
              headers: token(),
            })
            .then((res) => {
              const books = res.data; // Récupération des livres de l'utilisateur
              // Mise à jour du nombre de livres pour cet utilisateur
              setUserBooksCount((prevCounts) => ({
                ...prevCounts,
                [user._id]: books.length,
              }));
            })
            .catch((err) => {
              setErr(
                "Erreur lors de la récupération des livres de l'utilisateur"
              );
            });

          // Requête pour obtenir le nombre total de vues de l'utilisateur actuel
          axios
            .get(`http://localhost:9000/books/total-views/${user._id}`, {
              headers: token(),
            })
            .then((response) => {
              const { totalViews } = response.data; // Récupération du nombre total de vues
              // Mise à jour du nombre de vues pour cet utilisateur
              setUserViewsCount((prevCounts) => ({
                ...prevCounts,
                [user._id]: totalViews,
              }));
            })
            .catch((err) => {
              setErr(
                "Erreur lors de la récupération du nombre total de vues de l'utilisateur"
              );
            });

          // Requête pour obtenir le nombre total de likes de l'utilisateur actuel
          axios
            .get(`http://localhost:9000/books/total-likes/${user._id}`, {
              headers: token(),
            })
            .then((response) => {
              const { totalLikes } = response.data; // Récupération du nombre total de likes
              // Mise à jour du nombre de likes pour cet utilisateur
              setUserLikesCount((prevCounts) => ({
                ...prevCounts,
                [user._id]: totalLikes,
              }));
            })
            .catch((err) => {
              setErr(
                "Erreur lors de la récupération du nombre total de likes de l'utilisateur"
              );
            });
        });

        // Mise à jour des nouveaux rôles et de la liste des utilisateurs
        setNewRoles(roles);
        setUsers(allUsers);
      })
      .catch((err) => {
        setErr("Impossible de récupérer les utilisateurs !");
      });
  }, []); // Le tableau vide indique que cet effet ne dépend d'aucune variable et ne doit être exécuté qu'une seule fois

  // Fonction pour gérer le changement de rôle d'un utilisateur
  const handleRoleChange = (userId, newRole) => {
    // Confirmation de la modification du rôle par l'utilisateur
    const confirmChange = window.confirm(
      "Êtes-vous sûr de vouloir changer le rôle de l'utilisateur ?"
    );

    // Si la modification est confirmée
    if (confirmChange) {
      // Requête pour mettre à jour le rôle de l'utilisateur
      axios
        .put(
          `http://localhost:9000/users/edit-role/${userId}`,
          { role: newRole },
          { headers: token() }
        )
        .then((res) => {
          // Mise à jour du rôle dans l'état local
          setNewRoles((prevRoles) => ({ ...prevRoles, [userId]: newRole }));
          alert("Le rôle de l'utilisateur a bien été mis à jour !"); // Affichage d'une alerte pour confirmer la mise à jour du rôle
        })
        .catch((err) => {
          alert("Erreur lors de la modification du rôle de l'utilisateur"); // Affichage d'une alerte en cas d'erreur
        });
    }
  };

  // Rendu du composant
  return (
    <>
      <section className="dashboard-admin">
        {/* Titre du tableau de bord */}
        <span className="home-title1">
          <img
            src={arrow1}
            alt="title-left-arrow"
            className="title-left-arrow"
          />
          <h2>Dashboard</h2>
          <img
            src={arrow2}
            alt="title-right-arrow4"
            className="title-right-arrow4"
          />
        </span>
        {/* Tableau des utilisateurs */}
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Utilisateurs</th>
              <th>Profils</th>
              <th>Rôles</th>
              <th className="th-none">Vues</th>
              <th>Livres</th>
              <th className="th-none">Likes</th>
            </tr>
          </thead>
          <tbody>
            {/* Boucle pour afficher les détails de chaque utilisateur */}
            {users.map((oneUser) => (
              <tr key={oneUser._id}>
                <td>
                  {/* Affichage du nom de l'utilisateur */}
                  {oneUser.image && (
                    <img
                      src={`http://localhost:9000/assets/img/${
                        oneUser.image.src ?? "default.jpg"
                      }`}
                      alt={oneUser.image.alt ?? "Default Alt Text"}
                      className="d-image-none"
                    />
                  )}
                  {oneUser.login}
                </td>
                {/* Lien vers le profil de l'utilisateur */}
                <td>
                  <NavLink to={`/profil/${oneUser._id}`} className="see-more">
                    <FaUser className="see-more-icon" />
                  </NavLink>
                </td>
                {/* Sélection du rôle de l'utilisateur */}
                <td>
                  <select
                    value={newRoles[oneUser._id] || oneUser.role}
                    onChange={(e) =>
                      handleRoleChange(oneUser._id, e.target.value)
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>

                {/* Affichage du nombre de vues de l'utilisateur */}
                <td className="td-none">{userViewsCount[oneUser._id] || 0}</td>

                {/* Affichage du nombre de livres de l'utilisateur */}
                <td>{userBooksCount[oneUser._id] || 0}</td>
                {/* Affichage du nombre de likes de l'utilisateur */}
                <td className="td-none">{userLikesCount[oneUser._id] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

// Exportation du composant DashboardAdmin
export default DashboardAdmin;
