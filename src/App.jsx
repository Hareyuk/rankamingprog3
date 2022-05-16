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
import { Fragment, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebaseconfig";
import { ButtonAccess } from "./components/ButtonAccess/ButtonAccess";
import Unity, { UnityContext } from "react-unity-webgl";
const unityContext = new UnityContext({
  loaderUrl: "build/myunityapp.loader.js",
  dataUrl: "build/myunityapp.data",
  frameworkUrl: "build/myunityapp.framework.js",
  codeUrl: "build/myunityapp.wasm",
});

function App() {
  const [uid, setUid] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        handleChangeUser(user);
        handleChangeUid(user.uid);
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

  return (
    <Fragment>
      <BrowserRouter>
      <BackgroundD></BackgroundD>
      <div className="organize">
          <Header></Header>
          <div className="divDesign">
            {user !== null ? (
              <ButtonAccess auth={auth} setUid={setUid} setUser={setUser} >Cerrar sesión</ButtonAccess>
            ) : (
              <ButtonAccess auth={auth} setUid={setUid} setUser={setUser} >Iniciar sesión</ButtonAccess> && (
                <ButtonAccess auth={auth} setUid={setUid} setUser={setUser} >Registrarse</ButtonAccess>
              )
            )}
          </div>
          <main>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/game/:id" element={<Game />}></Route>
              <Route path="/games" element={<Games />}></Route>
              <Route path="/rankings" element={<Rankings />}></Route>
              <Route path="/profile/:id" element={<Profile />}></Route>
              <Route path="/surprise/" element={<Surprise />}></Route>
            </Routes>
          </main>
      </div>
        </BrowserRouter>
    </Fragment>
  );
}

export default App;
