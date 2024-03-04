import React from "react";
import { useAuth } from "../../context/AuthContext";
import DashboardAdmin from "../../components/dashboard/DashboardAdmin";
import GetOneBook from "../../components/profile/GetOneBook";
import GetAsideMenu from "../../components/profile/GetAsideMenu";
import GetAuthUser from "../../components/profile/GetAuthUser";

import "../../assets/styles/profile/profile.css";

// Composant principal pour afficher le profil de l'utilisateur
const Profile = () => {
  const auth = useAuth(); // Utilisation du contexte d'authentification

  return (
    // Conteneur principal avec la classe "home"
    <main className="home">
      {/* Section pour afficher les informations de l'utilisateur */}
      <>
        <GetAuthUser />
      </>

      {/* Vérification du rôle de l'utilisateur pour afficher le tableau de bord de l'admin */}
      {auth.user.role === "admin" && (
        <section>
          <DashboardAdmin />
        </section>
      )}

      {/* Section pour afficher les livres publiés par l'utilisateur */}
      <>
        <GetOneBook />
      </>

      {/* Section pour afficher le menu latéral */}
      <>
        <GetAsideMenu />
      </>
    </main>
  );
};

export default Profile;
