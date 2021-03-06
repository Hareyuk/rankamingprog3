import "./style.css";
import React, { useState, useEffect, Fragment } from "react";
import GradientBar from "../../components/GradientBar/GradientBar";
import { db } from "../../firebaseconfig";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
const Rankings = (props) => {
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
        orderBy("score")
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
    const q = await query(collection(db, "games"), orderBy("timestamp"));
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

  return (
    <Fragment>
      <GradientBar text="Rankings"></GradientBar>
      <div className="listDesign">
        {rankingData.map((item) => buildDivRank(item))}
      </div>
    </Fragment>
  );
};
export default Rankings;
