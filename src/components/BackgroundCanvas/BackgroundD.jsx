import "./style.css";
import React, { Fragment, useEffect } from "react";
const BackgroundD = () => {
  const arrayCircles = [
    { left: "80%", top: "7%", size: "270px", class: "mov1" },
    { left: "84%", top: "55%", size: "270px", class: "mov2" },
    { left: "74%", top: "69%", size: "270px", class: "mov3" },
    { left: "71%", top: "1%", size: "270px", class: "mov4" },
    { left: "90%", top: "34%", size: "120px", class: "mov1" },
    { left: "72%", top: "67%", size: "120px", class: "mov2" },
    { left: "82%", top: "56%", size: "120px", class: "mov3" },
    { left: "86%", top: "79%", size: "120px", class: "mov4" },
    { left: "80%", top: "5%", size: "42px", class: "mov1" },
    { left: "83%", top: "89%", size: "42px", class: "mov2" },
    { left: "74%", top: "88%", size: "42px", class: "mov3" },
    { left: "71%", top: "67%", size: "42px", class: "mov4" },
    { left: "81%", top: "55%", size: "42px", class: "mov1" },
    { left: "95%", top: "42%", size: "42px", class: "mov2" },
    { left: "89%", top: "37%", size: "42px", class: "mov3" },
    { left: "89%", top: "39%", size: "120px", class: "mov4" },
    { left: "68%", top: "2%", size: "42px", class: "mov1" },
    { left: "69.5%", top: "2.5%", size: "42px", class: "mov2" },
    { left: "87%", top: "54%", size: "87px", class: "mov3" },
    { left: "92%", top: "5%", size: "120px", class: "mov4" },
    { left: "87%", top: "54%", size: "120px", class: "mov1" },
    { left: "66%", top: "83%", size: "120px", class: "mov2" },
    { left: "65.5%", top: "93%", size: "42px", class: "mov3" },
  ];
  /* useEffect(() => {
        var c = document.getElementById("myCanvas");
        var width = c.width;
        var height = c.height;
        var ctx = c.getContext("2d");
        var grd = ctx.createRadialGradient(width/2, 0, 0, width/2, 0, width/1.3);
        grd.addColorStop(0, "#260094");
        grd.addColorStop(1, "#0F0714");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
        //Circles
        
    }, []) */

  return (
    <div className="background">
      {arrayCircles.map((item) => (
        <div className={item.class}>
          <div
            className="circle"
            style={{
              left: item.left,
              top: item.top,
              width: item.size,
              height: item.size,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};
export default BackgroundD;
