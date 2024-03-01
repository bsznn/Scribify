import React from "react";
import { useAuth } from "../../context/AuthContext";
import DashboardAdmin from "../../components/dashboard/DashboardAdmin";
import GetOneBook from "../../components/profile/GetOneBook";
import GetAsideMenu from "../../components/profile/GetAsideMenu";
import GetAuthUser from "../../components/profile/GetAuthUser";

import "../../assets/styles/profile/profile.css";

const Profile = () => {
  const auth = useAuth();
  return (
    <main className="home">
      <>
        <GetAuthUser />
      </>

      {auth.user.role === "admin" && (
        <section>
          <DashboardAdmin />
        </section>
      )}

      <>
        <GetOneBook />
      </>

      <>
        <GetAsideMenu />
      </>
    </main>
  );
};

export default Profile;
