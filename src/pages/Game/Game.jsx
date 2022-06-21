import "./style.css";
import React, { useState, useEffect, Fragment } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { RegisterExternalListener } from "react-unity-webgl";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";
const Game = (props) => {
  const [gamePic, setGPic] = useState("");
  const [gameName, setGName] = useState("");
  const [gameDescription, setGDescr] = useState("");
  const [scorePlayer, setScorePlayer] = useState(0);
  const { functionStart, uid } = props;
  const { id: idGame } = useParams();
  const [loadingGame, setLoadingGame] = useState(true);
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

  useEffect(function()
  {
    unityContext.on("SendPoints", function(score)
    {
      setScorePlayer(score);
    });
  }, [])

  const [puntaje, setPuntaje] = useState(0);
  return (
    <div className="divFlex">
      {uid ? loadingGame ? "Cargando..." : (
        <Fragment>
          <div className="gameDiv">
            <Unity unityContext={unityContext} />
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
