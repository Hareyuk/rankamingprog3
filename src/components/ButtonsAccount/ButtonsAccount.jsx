import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonAccess } from "../ButtonAccess/ButtonAccess";
import { auth } from "../../firebaseconfig";
const ButtonsAccount = (props) => {
  const { setUid, setUser, user, boolShow } = props;
  const navigate = useNavigate();
  const logOut = () => {
    auth.signOut();
    setUid(null);
    setUser(null);
    navigate("/");
  };
  return (
    <div className="divButtons">
      {boolShow ? (
        user != null ? (
            <Fragment>
              <ButtonAccess
                functionToCall={logOut}
                url="/"
                auth={auth}
                setUid={setUid}
                setUser={setUser}
              >
                Cerrar sesión
              </ButtonAccess>
              <div>
                <img src="" alt=""/>
              </div>
            </Fragment>
        ) : (
          <Fragment>
            <ButtonAccess
              url="/login"
              auth={auth}
              setUid={setUid}
              setUser={setUser}
            >
              Iniciar sesión
            </ButtonAccess>
            <ButtonAccess
              url="/signup"
              auth={auth}
              setUid={setUid}
              setUser={setUser}
            >
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
