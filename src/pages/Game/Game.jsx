import "./style.css";
import React, { useState, useEffect, Fragment } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { RegisterExternalListener } from "react-unity-webgl";
import { useParams } from "react-router-dom";
import {limitToLast, doc, getDoc, updateDoc, collection, getDocs, setDoc, query, orderBy} from "firebase/firestore";
import { db } from "../../firebaseconfig";
const Game = (props) => {
  const [gamePic, setGPic] = useState("");
  const [gameName, setGName] = useState("");
  const [gameDescription, setGDescr] = useState("");
  const [scorePlayer, setScorePlayer] = useState(0);
  const { functionStart, uid } = props;
  const { id: idGame } = useParams();
  const [loadingGame, setLoadingGame] = useState(true);
  const [userDataFull, setUserDataFull] = useState([]);
  const [rankingData, setRankingData] = useState(null);
  //GetGameData
  useEffect(() => {
    const getDataGame = async () => {
      const docRef = doc(db, "games", idGame);
      const docSnap = await getDoc(docRef);
      const { imgsrc, name, description } = docSnap.data();
      setGPic(imgsrc);
      setGName(name);
      setGDescr(description);
      setLoadingGame(false);
    };
    if (uid) {
      getDataGame();
      functionStart(false);
    } else functionStart(true);
  });
  const unityContext = new UnityContext({
    loaderUrl: `/games/${idGame}/Build/${idGame}.loader.js`,
    dataUrl: `/games/${idGame}/Build/${idGame}.data`,
    frameworkUrl: `/games/${idGame}/Build/${idGame}.framework.js`,
    codeUrl: `/games/${idGame}/Build/${idGame}.wasm`
  });

  //Receive Points From Game
  useEffect(function()
  {
    unityContext.on("SendPoints", function(score)
    {
      setScorePlayer(score);
    });
  }, []);

  //Attempt to update
  const updateDataRanking= async ()=>
  {
    console.log("Actualizar data");
    const q = await query(collection(db, "rankings", idGame, "users"), orderBy("score"));
    const querySnapshot = await getDocs(q);
    let arrayGameData = {id: idGame, name: gameName, playersScores: []};
    await querySnapshot.forEach((doc) => {
      let objData = doc.data();
      objData.id = doc.id;
      arrayGameData.playersScores.push(objData);
    });
    setRankingData(arrayGameData);
  }
  updateDataRanking();
  

  //Update Score Player in Firebase
  useEffect(function()
  {
    const updateScorePlayer = async ()=>
    {
      await updateDoc(doc(db, "rankings", idGame, "users", uid), {
        score: -(scorePlayer),
        date: -(Date.now())
      });
      updateDataRanking();
    }

    const updateDataGame = async()=>
    {
      //Get subcollection
      const docRef = doc(db, "rankings", idGame);
      const colRef = collection(docRef, "users");
      //Get datas
      const querySnapshot = await getDocs(colRef);
      let foundUser = false;
      querySnapshot.forEach((doc) => 
      {
        if(doc.id === uid) foundUser = true;
        const scoreWritten = doc.data().score;
        const scoreNumberWritten = -parseInt(scoreWritten);
        if(scorePlayer > scoreNumberWritten)
        {
          //UpdateNewScore
          updateScorePlayer();
        }
      });
      if(!foundUser)
      {
        //The score doesn't exist, add data
        const newData = {score: -(scorePlayer), date: Date.now()};
        await setDoc(doc(db, "rankings", idGame, "users", uid), newData);
        updateDataRanking();
      }
    }
    if(scorePlayer != 0)
    {
      updateDataGame();
    }
  }, [scorePlayer]);

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
  });


  //DIv Rank
  const buildDivRank = () => {
    return (
      <div key={idGame} className="cardInfo cardRank">
        <h3>Ranking de {gameName}</h3>
        <div className="rankList">
          {
            !rankingData.playersScores.length ? <p style={{textAlign: "center"}}>Aún no hay datos para este minijuego.</p> : ""
          }
          {rankingData.playersScores.map((item, i) => {
            const {pfpUrl, nick} = userDataFull[item.id];
            let className = "userRank";
            if(item.id == uid) className+=" ownerScore"; 
            return (
              <div key={item.id} className={className}>
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
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="divFlex">
      {uid ? loadingGame ? "Cargando..." : (
        <Fragment>
          <div className="gameDiv">
            <Unity unityContext={unityContext} />
          </div>
          <div className="rankSection">
          {rankingData ? buildDivRank() : ""}
          </div>
          <div className="infoGamePage">
              <h1>{gameName}</h1>
              <img src={gamePic} alt={gameName}/>
              <p>{gameDescription}</p>
          </div>
        </Fragment>
      ) : (
        <h2 className="warningNotLogged">
          Lo sentimos, para acceder al juego debe iniciar sesión.
        </h2>
      )}
    </div>
  );
};
export default Game;
