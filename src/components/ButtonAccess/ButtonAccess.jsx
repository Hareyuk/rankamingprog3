import "./style.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const ButtonAccess = (props) => {
  const { url, children, functionToCall } = props;
  /* const logOut = () => {
    auth.signOut();
    setUser(null);
    setUid(null);
    navigate("/");
  }; */
  //const navigate = useNavigate();
  return (
    <Link to={url}>
      <button onClick={functionToCall}>{children}</button>
    </Link>
  );
};
export { ButtonAccess };
