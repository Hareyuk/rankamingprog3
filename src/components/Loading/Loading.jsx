import "./style.css";
import React, {useState} from 'react';
const Loading = () => {
  const [loading, setLoading] = useState(false);
  let nameClass = "";
  if(loading) nameClass = "divLoading"
  else nameClass = "hideany"
  return (
    <div className={nameClass}>
     <div className="backgroundTransparent">
         </div>  
     <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Loading;
