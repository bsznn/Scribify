import React, { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../../context/token";

import "../../assets/styles/dashboard/dashboard.css";
import { NavLink, useParams } from "react-router-dom";

import arrow1 from "../../assets/images/home/arrow2.png";
import arrow2 from "../../assets/images/home/arrow1.png";

import { FaUser } from "react-icons/fa6";

const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [newRoles, setNewRoles] = useState({});
  const [userBooksCount, setUserBooksCount] = useState({});
  const [userViewsCount, setUserViewsCount] = useState({});
  const [userLikesCount, setUserLikesCount] = useState({});
  const [err, setErr] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:9000/users", { headers: token() })
      .then((res) => {
        const data = res.data;
        const allUsers = data.users || [];

        const roles = {};
        allUsers.forEach((user) => {
          roles[user._id] = user.role;

          axios
            .get(`http://localhost:9000/books/my-book/${user._id}`, {
              headers: token(),
            })
            .then((res) => {
              const books = res.data;
              setUserBooksCount((prevCounts) => ({
                ...prevCounts,
                [user._id]: books.length, // Utilisez la longueur du tableau de livres pour obtenir le nombre de livres
              }));
            })
            .catch((err) => {
              setErr(
                "Erreur lors de la récupération des livres de l'utilisateur"
              );
            });

          axios
            .get(`http://localhost:9000/books/total-views/${user._id}`, {
              headers: token(),
            })
            .then((response) => {
              const { totalViews } = response.data;
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

          axios
            .get(`http://localhost:9000/books/total-likes/${user._id}`, {
              headers: token(),
            })
            .then((response) => {
              const { totalLikes } = response.data;
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

        setNewRoles(roles);
        setUsers(allUsers);
      })
      .catch((err) => {
        setErr("Impossible de récupérer les utilisateurs !");
      });
  }, []);

  const handleRoleChange = (userId, newRole) => {
    const confirmChange = window.confirm(
      "Êtes-vous sûr de vouloir changer le rôle de l'utilisateur ?"
    );

    if (confirmChange) {
      axios
        .put(
          `http://localhost:9000/users/edit-role/${userId}`,
          { role: newRole },
          { headers: token() }
        )
        .then((res) => {
          setNewRoles((prevRoles) => ({ ...prevRoles, [userId]: newRole }));
          alert("Le rôle de l'utilisateur a bien été mis à jour !");
        })
        .catch((err) => {
          alert("Erreur lors de la modification du rôle de l'utilisateur");
        });
    }
  };

  return (
    <>
      <section className="dashboard-admin">
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
            {users.map((oneUser) => (
              <tr key={oneUser._id}>
                <td>
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
                <td>
                  <NavLink to={`/profil/${oneUser._id}`} className="see-more">
                    <FaUser className="see-more-icon" />
                  </NavLink>
                </td>
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

                <td className="td-none">{userViewsCount[oneUser._id] || 0}</td>

                <td>{userBooksCount[oneUser._id] || 0}</td>
                <td className="td-none">{userLikesCount[oneUser._id] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default DashboardAdmin;
