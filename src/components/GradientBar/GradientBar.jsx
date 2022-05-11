import "./style.css";
import React from "react";
const GradientBar = (props) => {
  const {text} = props;
    return(
    <div className="gradientBar">
      <div></div>
      <span>{text}</span>
    </div>
  );
};
export default GradientBar;
