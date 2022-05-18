import "./style.css";
import React, {useEffect} from "react";
const GradientBar = (props) => {
  const {text, mt} = props;
  var classCss = "";
  if(mt) classCss="gradientBar mt-3";
    else classCss="gradientBar";
  
    return(
      <div className={classCss}>
          <div></div>
          <span>{text}</span>
        </div>
  );
};
export default GradientBar;
