import "./style.css";
import React, { useState, useEffect, Fragment } from "react";
import GradientBar from "../../components/GradientBar/GradientBar";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  getDocs,
  orderBy,
  limitToLast,
} from "firebase/firestore";
import { db } from "../../firebaseconfig";

const Home = (props) => {
  const [rankingData, setRankingData] = useState([]);
  const [gamesData, setGamesData] = useState([]);
  const [userDataFull, setUserDataFull] = useState([]);
  const { functionStart, setLoadingState } = props;
  useEffect(() => {
    (async () => {
      setLoadingState(true);
      functionStart(true);
      getDataUsers();
      await getDataGames().then((result) => setGamesData(result));
    })();
  }, []);

  useEffect(() => {
    if (gamesData.length > 0) {
      gamesData.map((item) => getDataRankItem(item));
      setLoadingState(false);
    }
  }, [gamesData]);

  const getDataRankItem = (item) => {
    const getData = async () => {
      const q = await query(
        collection(db, "rankings", item.id, "users"),
        orderBy("score"),
        limitToLast(10)
      );
      const qSnapshot = await getDocs(q);
      let arrGameData = { id: item.id, name: item.name, playersScores: [] };
      await qSnapshot.forEach((doc) => {
        let objData = doc.data();
        objData.id = doc.id;
        arrGameData.playersScores.push(objData);
      });
      return arrGameData;
    };
    getData().then((item) => {
      //Para evitar duplicados erróneos
      let alreadyExist = false;
      rankingData.forEach((objArr) => {
        if (objArr.id === item.id) {
          alreadyExist = true;
        }
      });
      if (alreadyExist === false)
        setRankingData((prevState) => [...prevState, item]);
    });
  };

  const getDataGames = async () => {
    //Games
    let arrayData = [];
    const q = await query(
      collection(db, "games"),
      orderBy("timestamp"),
      limitToLast(4)
    );
    const querySnapshot = await getDocs(q);
    await querySnapshot.forEach((doc) => {
      let objData = doc.data();
      objData.id = doc.id;
      arrayData.push(objData);
    });
    return arrayData;
  };

  const getDataUsers = async () => {
    //Users
    let arrayUsers = [];
    const querySnapshotUsers = await getDocs(collection(db, "users"));
    querySnapshotUsers.forEach((doc) => {
      arrayUsers[doc.id] = doc.data();
    });
    setUserDataFull(arrayUsers);
  };

  const buildDivRank = (item) => {
    return (
      <div key={item.id} className="cardInfo cardRank">
        <Link to={"/game/" + item.id}>
          <h3>{item.name}</h3>
          <div className="rankList">
            {!item.playersScores.length ? (
              <p style={{ textAlign: "center" }}>
                Aún no hay datos para este minijuego.
              </p>
            ) : (
              ""
            )}
            {item.playersScores.map((item, i) => {
              const { pfpUrl, nick } = userDataFull[item.id];
              return (
                <Link key={item.id} to={"/profile/" + item.id}>
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

  const buildDiv = (item) => {
    return (
      <div key={item.key} className="cardInfo">
        <Link to={"game/" + item.id}>
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
              i < 3 ? buildDiv(item) : buildDivPlus("/games/", "Más juegos")
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
