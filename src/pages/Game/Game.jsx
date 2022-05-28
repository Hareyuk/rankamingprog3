import './style.css';
import React, {useState, useEffect, Fragment} from 'react';
import Unity, { UnityContext } from "react-unity-webgl";
import { useParams } from 'react-router-dom';

const Game = (props)=>
{
    const {functionStart,uid} = props;
    useEffect(()=>
    {
        if(uid)
        {
            functionStart(false);
        }
        else
        {
            functionStart(true);
        }
    })
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
      
    return(
    <Fragment>
        <h1>Nombre del juego</h1>
        {uid ? <Unity unityContext={unityContext}/> : <h2 className='warningNotLogged'>Lo sentimos, para acceder al juego debe iniciar sesión.</h2> }
    </Fragment>);
}
export default Game;