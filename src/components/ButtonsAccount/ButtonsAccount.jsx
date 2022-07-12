import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonAccess } from "../ButtonAccess/ButtonAccess";
import { auth, db } from "../../firebaseconfig";
import { doc, getDoc } from "firebase/firestore";
const ButtonsAccount = (props) => {
  const { uid, boolShow, setUid, updateInfoAccess, setUpdateInfoAccess } = props;
  const navigate = useNavigate();
  const logOut = () => {
    auth.signOut();
    setUid(null);
    navigate("/");
  };

  const [pfpUrl, setPfpUrl] = useState(null);
  const [nick, setNick] = useState(null);

  const getData = async () => {
    const docRef = await doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const { nick, pfpUrl } = await docSnap.data();
    await setPfpUrl(pfpUrl);
    await setNick(nick);
  };

  useEffect(() => {
    if (uid) getData(); 
  }, [uid]);

  useEffect(()=>
  {
    if(updateInfoAccess)
    {
      getData();
      setUpdateInfoAccess(false);
    }
  }, [updateInfoAccess])

  let nameClass = "";
  if (boolShow) nameClass = "divButtons";
  else nameClass = "hideAny";

  return (
    <div className={nameClass}>
      {boolShow ? (
        uid != null ? (
          <Fragment>
            <div className="userInfo">
              <img src={pfpUrl} alt={"Foto de " + nick} />
              <p>{nick}</p>
            </div>
            <ButtonAccess
              functionToCall={logOut}
              url="/"
              auth={auth}
              setUid={setUid}
            >
              Cerrar sesión
            </ButtonAccess>
          </Fragment>
        ) : (
          <Fragment>
            <ButtonAccess url="/login" auth={auth} setUid={setUid}>
              Iniciar sesión
            </ButtonAccess>
            <ButtonAccess url="/signup" auth={auth} setUid={setUid}>
              Registrarse
            </ButtonAccess>
          </Fragment>
        )
      ) : (
        ""
      )}
    </div>
  );
};
export default ButtonsAccount;
