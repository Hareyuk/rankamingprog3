import "./style.css";
import React from "react";
import { Link } from "react-router-dom";
const ButtonAccess = (children,  ...props) => {
  const {callFunction, url}=props;
  return (
    (url ? <Link to={url}> : "")
      <button onSubmit={callFunction} className="background">
        {children}
      </button>
    (url ? </Link> : "")
  );
};
export {ButtonAccess};
