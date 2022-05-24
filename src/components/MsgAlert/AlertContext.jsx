import React from "react";
import "./style.css";

export const AlertContext = React.createContext({
  icon: "",
  text: "",
  toggleState: ()=>{},
});