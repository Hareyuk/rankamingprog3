import "./style.css";
import React, { useState, useEffect, Fragment } from "react";
import GradientBar from "../../components/GradientBar/GradientBar";
import { db } from "../../firebaseconfig";
import {
  doc,
  getDocs,
  collection,
  orderBy,
  limit,
  query,
} from "firebase/firestore";
import { Link } from "react-router-dom";
const Games = (props) => {
  const { functionStart } = props;
  const [gamesData, setGamesData] = useState([]);
  
  const obtainGens = (item) => {
    const amount = item.genres.length - 1;
    let texto = "";
    item.genres.map((genero, i) => {
      i !== amount ? (texto += genero + ", ") : (texto += genero);
    });
    return texto;
  };
  const buildDiv = (item) => {
    return (
      <div key={item.key} className="cardInfo">
        <Link to={"/game/"+item.id}>
        <div className="pdDiv">
          <div className="infoDiv">
            <div className="divImg">
              <img src={item.imgsrc} alt={"Imagen gráfica de " + item.name} />
            </div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <h4>géneros: {obtainGens(item)}</h4>
          </div>
        </div>
        </Link>
      </div>
    );
  };

  useEffect(() => {
    const getDataGames = async () => {
      const q = query(collection(db, "games"), orderBy("timestamp"), limit(4));
      const querySnapshot = await getDocs(q);
      let arrayData = [];
      querySnapshot.forEach((doc) => {
        let objData = doc.data();
        objData.id = doc.id;
        arrayData.push(objData);
      });
      setGamesData(arrayData);
    };
    functionStart(true);
    getDataGames();
  });
  return (
    <Fragment>
      <GradientBar text="Juegos"></GradientBar>
      <div className="listDesign">
            {gamesData.map((item) =>
              buildDiv(item)
            )}
          </div>
    </Fragment>
  );
};
export default Games;
