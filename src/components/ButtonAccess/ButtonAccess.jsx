import "./style.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const ButtonAccess = (children,  ...props) => {
  const {callFunction, url, setUid, setUser, auth,}=props;
  const logOut = () => {
    auth.signOut();
    setUser(null);
    setUid(null);
    navigate("/");
  };
  const navigate = useNavigate();
  return (
    (url ? <Link to={url}> : "")
      <button onSubmit={callFunction} className="background">
        {children}
      </button>
    (url ? </Link> : "")
  );
};
export {ButtonAccess};
