import "./style.css";
import React, { Fragment, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
const ButtonHeader = (props) => {
  const {url, name, pic, icon} = props;
    return(
    <div className="contentBoxBtn">
      <div className="borderGra">

      </div>
      <Link to={url} className="contentBox">
        {pic ? <img src={pic} alt={name}/>:""}
        <i className={"fa-solid " + icon}></i>
      </Link>
    </div>
  );
};
export default ButtonHeader;
