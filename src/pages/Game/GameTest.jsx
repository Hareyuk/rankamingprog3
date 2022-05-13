import './style.css';
import React, {useState, useEffect, Fragment} from 'react';
import Unity, { UnityContext } from "react-unity-webgl";
import { useParams } from 'react-router-dom';

const Game = ()=>
{
    const {id: idGame} = useParams();
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

      const sendText=()=>
      {
          unityContext.send("Canvas","RecibirDataTxt","Recibido!");
      }
      const sendNumber=()=>
      {
          unityContext.send("Canvas","RecibirDataNum",20);
      }
      const updateInfo=()=>
      {
          unityContext.send("Canvas","UpdateText");
      }

      const executeCall=()=>
      {
        sendText();
        sendNumber();
        updateInfo();
      }
      
    return(
    <Fragment>
        <Unity unityContext={unityContext} />
        <button onClick={executeCall}>1</button>
    </Fragment>);
}
export default Game;