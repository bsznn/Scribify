import React from "react";
import { useAuth } from "../../context/AuthContext";

import "../../assets/styles/profile/profile.css";

import GetBook from "../../components/profileUser/GetBook";
import GetAside from "../../components/profileUser/GetAside";
import GetUser from "../../components/profileUser/GetUser";

// Composant principal pour afficher le profil de l'utilisateur
const ProfileUser = () => {
  return (
    // Conteneur principal avec la classe "home"
    <main className="home">
      {/* Section pour afficher les informations de l'utilisateur */}
      <>
        <GetUser />
      </>

      {/* Vérification du rôle de l'utilisateur pour afficher le tableau de bord de l'admin */}
      <>
        <GetBook />
      </>

      {/* Section pour afficher les livres publiés par l'utilisateur */}
      <>
        <GetAside />
      </>
    </main>
  );
};

export default ProfileUser;
