import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Game from "./pages/Game/Game";
import Games from "./pages/Games/Games";
import Rankings from "./pages/Rankings/Rankings";
import Profile from "./pages/Profile/Profile";
import Surprise from "./pages/Surprise/Surprise";
import BackgroundD from "./components/BackgroundCanvas/BackgroundD";
import React, { Fragment, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import { AlertContext} from "./components/MsgAlert/AlertContext";
import statusTogglerAlert from "./components/MsgAlert/AlertContextToggle";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebaseconfig";
import Unity, { UnityContext } from "react-unity-webgl";
import ButtonsAccount from "./components/ButtonsAccount/ButtonsAccount";
//Context

function App() {
  //Context
  //Seguir leyendo desde https://reactjs.org/docs/context.html#reactcreatecontext en app.js
  const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        handleChangeUser(user);
        handleChangeUid(user.uid);
      }
      else
      {
        handleChangeUser(null);
        handleChangeUid(null);
      }
    });
  }, []);

  const handleChangeUid=(uid)=>
  {
    setUid(uid);
  }

  const handleChangeUser=(user)=>
  {
    setUser(user);
  }

  const [boolShow, setBoolShow] = useState(false);
 /* const setBoolShowTrue=()=>
  {
    setBoolShow(true);
  }
  const setBoolShowFalse=()=>
  {
    setBoolShow(false);
  }*/
  const setBoolShowValue=(value)=>
  {
    setBoolShow(value);
  }
  return (
    <Fragment>
      <BrowserRouter>
      <BackgroundD></BackgroundD>
      <div className="organize">
          <Header uid={uid}></Header>
          <div className="divDesign">
          </div>
          <ButtonsAccount setUid={(value)=>{handleChangeUid(value)}} setUser={(value)=>{handleChangeUser(value)}} user={user} boolShow={boolShow}/>
          <main>
            <Routes>
              <Route  path="/" element={<Home functionStart={(value)=>{setBoolShowValue(value)}} />}></Route>
              <Route  path="/about" element={<About functionStart={(value)=>{setBoolShowValue(value)}}/>}></Route>
              <Route  path="/login" element={<Login uid={uid} functionStart={(value)=>{setBoolShowValue(value)}}/>}></Route>
              <Route  path="/signup" element={<SignUp uid={uid} functionStart={(value)=>{setBoolShowValue(value)}}/>}></Route>
              <Route  path="/game/:id" element={<Game uid={uid} functionStart={(value)=>{setBoolShowValue(value)}}/>}></Route>
              <Route  path="/games" element={<Games functionStart={(value)=>{setBoolShowValue(value)}} />}></Route>
              <Route  path="/rankings" element={<Rankings functionStart={(value)=>{setBoolShowValue(value)}}/>}></Route>
              <Route  path="/profile/:id" element={<Profile uid={uid} functionStart={(value)=>{setBoolShowValue(value)}}/>}></Route>
              <Route  path="/surprise/" element={<Surprise uid={uid} functionStart={(value)=>{setBoolShowValue(value)}}/>}></Route>
            </Routes>
          </main>
      </div>
        </BrowserRouter>
    </Fragment>
  );
}

export default App;
