import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Views = () => {
  const [totalViews, setTotalViews] = useState({});
  const [err, setErr] = useState();

  const auth = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/books/total-views/${auth.user._id}`, {
        headers: token(),
      })
      .then((res) => {
        setTotalViews(res.data.totalViews);
      })
      .catch((error) => {
        console.log(error);
        setErr("Impossible de charger les données");
      });
  }, []);

  return (
    <>
      <p>{totalViews}</p>
    </>
  );
};

export default Views;
