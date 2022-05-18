import "./style.css";
import React, { Fragment, useEffect, useState } from "react";
import ButtonHeader from "../ButtonHeader/ButtonHeader";
const Header = (props) => {
  const {uid} = props;
  const [urlProfile, setUrlProfile] = useState("");
  useEffect(()=>
  {
    if(uid) setUrlProfile("/profile/"+uid);
    else setUrlProfile("/login");
  }, [uid])
  return (
    <header className="header">
      <div className="lineGlow"></div>
      <div className="header-menu">
        <ButtonHeader url={urlProfile} icon="fa-user"></ButtonHeader>
        <ButtonHeader url="/" icon="fa-house"></ButtonHeader>
        <ButtonHeader url="/games" icon="fa-gamepad"></ButtonHeader>
        <ButtonHeader url="/rankings" icon="fa-trophy"></ButtonHeader>
        {uid ? <ButtonHeader url="/surprise" icon="fa-gift"></ButtonHeader> : ""}
        <ButtonHeader url="/about" icon="fa-exclamation"></ButtonHeader>
        <img src="/rlogo.svg" alt="Rankaming"/>
      </div>
    </header>
  );
};
export default Header;
