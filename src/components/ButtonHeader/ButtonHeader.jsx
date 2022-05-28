import "./style.css";
import React, { Fragment, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
const ButtonHeader = (props) => {
  const {url, icon} = props;
    return(
    <div className="contentBoxBtn">
      <div className="borderGra">

      </div>
      <Link to={url} className="contentBox">
        <i className={"fa-solid " + icon}></i>
      </Link>
    </div>
  );
};
export default ButtonHeader;
