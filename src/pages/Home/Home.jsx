import "./style.css";
import React, { useState, useEffect, Fragment } from "react";
import BackgroundD from "../../components/BackgroundCanvas/BackgroundD";
import GradientBar from "../../components/GradientBar/GradientBar";
import { Link } from "react-router-dom";
import ButtonsAccount from "../../components/ButtonsAccount/ButtonsAccount";
import { collection, query, where, getDocs, orderBy, limit, limitToLast } from "firebase/firestore";
import { db } from "../../firebaseconfig";

const Home = (props) => {
  const [finishedLoadingGames, setFinishedLoadingGames] = useState(false);
  const [gamesData, setGamesData] = useState([]);
  const [rankingData, setRankingData] = useState([]);
  const [userDataFull, setUserDataFull] = useState([]);

  //Get all data users
  useState(()=>
  {
    let arrayUsers = [];
    const getAllDataUsers= async ()=>
    {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc)=>
      {
        arrayUsers[doc.id] = doc.data();
      })
      setUserDataFull(arrayUsers);
    }
    getAllDataUsers();
  })

  const buildDiv = (item) => {
    return (
      <div key={item.key} className="cardInfo">
        <Link to={"game/"+item.id}>
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
  const obtainGens = (item) => {
    const amount = item.genres.length - 1;
    let texto = "";
    item.genres.map((genero, i) => {
      i !== amount ? (texto += genero + ", ") : (texto += genero);
    });
    return texto;
  };
  const buildDivRank = (item) => {
    return (
      <div key={item.name} className="cardInfo cardRank">
        <Link to={"/game/"+item.id}>
        <h3>{item.name}</h3>
        <div className="rankList">
          {
            !item.playersScores.length ? <p style={{textAlign: "center"}}>Aún no hay datos para este minijuego.</p> : ""
          }
          {item.playersScores.map((item, i) => {
            const {pfpUrl, nick} = userDataFull[item.id];
            return (
              <Link to={"/profile/" + item.id}>
              <div className="userRank">
                <div className="borderPic">
                  <div></div>
                  <img src={pfpUrl} alt={nick} />
                </div>
                <div className="boxTextsRank">
                  <h4>
                    {i + 1} - {nick}
                  </h4>
                  <p>{-item.score}</p>
                </div>
              </div>
              </Link>
            );
          })}
        </div>
        </Link>
      </div>
    );
  };
  const buildDivPlus = (link, childText) => {
    return (
      <div key="none" className="cardInfo cardPlus">
        <Link to={link}></Link>
        <div>
          <i className="fa-solid fa-plus"></i>
          <p>{childText}</p>
        </div>
      </div>
    );
  };

  //First, obtain data games
  const { functionStart } = props;
  useEffect(() => {
    const getDataGames = async ()=>
    {
      const q = query(collection(db, "games"), orderBy("timestamp"), limitToLast(4));
      const querySnapshot = await getDocs(q);
      let arrayData = [];
      querySnapshot.forEach((doc) => {
        let objData = doc.data();
        objData.id = doc.id;
        arrayData.push(objData);
      });
      setGamesData(arrayData);
      setFinishedLoadingGames(true);
    }
    functionStart(true);
    getDataGames();
  });

  //Data Rankings
  useEffect(()=>
  {
    const getDataRankings = async ()=>
    {
      let arrayData = [];
      await gamesData.map(async (item, index)=>{
        const q = await query(collection(db, "rankings", item.id, "users"), orderBy("score"), limitToLast(10));
        const querySnapshot = await getDocs(q);
        let arrayGameData = {id: item.id, name: item.name, playersScores: []};
        await querySnapshot.forEach((doc) => {
          let objData = doc.data();
          objData.id = doc.id;
          arrayGameData.playersScores.push(objData);
        });
        arrayData.push(arrayGameData);
      });
      setRankingData(arrayData);
    }
    if(finishedLoadingGames)getDataRankings();
  }, [finishedLoadingGames]);
    
  return (
    <Fragment>
      <div className="startmain">
        <h1>
          <img src="/img/rlogo.svg" alt="Letra R de Rankaming" />
          ankaming
        </h1>

        <GradientBar text="INICIO" />
        <section>
          <h2>Últimos juegos</h2>
          <div className="listDesign">
            {gamesData.map((item, i) =>
              i < 3 ? buildDiv(item) : buildDivPlus(("/games/"), "Más juegos")
            )}
          </div>
        </section>
        <section>
          <h2>Rankings</h2>
          <div className="listDesign">
            {rankingData.map((item, i) =>
              i < 3
                ? buildDivRank(item)
                : buildDivPlus("/rankings", "Más rankings")
            )}
          </div>
        </section>
      </div>
    </Fragment>
  );
};
export default Home;
