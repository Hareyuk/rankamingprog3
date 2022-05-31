import "./style.css";
import React, { useState, useEffect, Fragment } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { getMetadata } from "firebase/storage";
const Game = (props) => {
  const [gamePic, setGPic] = useState("");
  const [gameName, setGName] = useState("");
  const [gameDescription, setGDescr] = useState("");
  const { functionStart, uid } = props;
  const { id: idGame } = useParams();
  useEffect(() => {
    const getDataGame = async () => {
      const docRef = doc(db, "games", idGame);
      const docSnap = await getDoc(docRef);
      const { imgsrc, name, description } = docSnap.data();
      setGPic(imgsrc);
      setGName(name);
      setGDescr(description);
      console.log(docSnap.data());
    };
    if (uid) {
      getDataGame();
      functionStart(false);
    } else functionStart(true);
  });
  const unityContext = new UnityContext({
    loaderUrl: `/games/${idGame}/build/${idGame}.loader.js`,
    dataUrl: `/games/${idGame}/build/${idGame}.data`,
    frameworkUrl: `/games/${idGame}/build/${idGame}.framework.js`,
    codeUrl: `/games/${idGame}/build/${idGame}.wasm`,
    /* webGLContextAttributes: {
            alpha: true,
            antialias: true,
            depth: true,
            failIfMajorPerformanceCaveat: true,
            powerPreference: "high-performance",
            premultipliedAlpha: true,
            preserveDrawingBuffer: true,
            stencil: true,
            desynchronized: true,
            xrCompatible: true,
          } */
  });

  return (
    <Fragment>
      <h1>{gameName}</h1>
      {uid ? (
        <Fragment>
          <Unity unityContext={unityContext} />
          <div className="infoGamePage">
              <img src={gamePic} alt={gameName}/>
              <p>{gameDescription}</p>
          </div>
        </Fragment>
      ) : (
        <h2 className="warningNotLogged">
          Lo sentimos, para acceder al juego debe iniciar sesión.
        </h2>
      )}
    </Fragment>
  );
};
export default Game;
