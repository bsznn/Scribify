import React from "react";
import { useAuth } from "../../context/AuthContext";

import "../../assets/styles/profile/profile.css";

import GetBook from "../../components/profileUser/GetBook";
import GetAside from "../../components/profileUser/GetAside";
import GetUser from "../../components/profileUser/GetUser";

const ProfileUser = () => {
  return (
    <main className="home">
      <>
        <GetUser />
      </>

      <>
        <GetBook />
      </>

      <>
        <GetAside />
      </>
    </main>
  );
};

export default ProfileUser;
