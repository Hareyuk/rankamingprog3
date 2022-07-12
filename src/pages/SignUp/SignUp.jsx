import React, { useState, useEffect, Fragment } from "react";
import { auth, createUserWithEmailAndPassword } from "../../firebaseconfig";
import { Link, useNavigate } from "react-router-dom";
import GradientBar from "../../components/GradientBar/GradientBar";
import { getAuth } from "firebase/auth";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../../firebaseconfig";
const SignUp = (props) => {
  const { functionStart, uid, setLoadingState } = props;
  const navigate = useNavigate();
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userPassConfirm, setUserPassConfirm] = useState("");
  const [userNick, setUserNick] = useState("");
  const [msgError, setMsgError] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  useEffect(() => {
    setLoadingState(false);
    functionStart(false);
    if (uid) {
      navigate("/");
    }
  }, [uid]);

  const storage = getStorage();
  useEffect(() => {
    const setData = async () => {
      //Get placeholder pfp
      let urlPfp = "";
      await getDownloadURL(ref(storage, "placeholders/placeholder.jpg")).then(
        (url) => {
          urlPfp = url;
        }
      );

      //Set data for new user
      const docRef = await setDoc(doc(db, "users", uid), {
        nick: userNick,
        phrase: "¡Demuestra al mundo el poder del rankeo!",
        pfpUrl: urlPfp,
        insignias: {},
        clicks: 0,
      });
      setUpdateData(false);
      navigate("/login");
    };
    if (updateData) {
      setData();
    }
  }, [updateData]);

  const signupUser = (e) => {
    e.preventDefault();
    setLoadingState(true);
    if (userNick != "") {
      if (userPassConfirm != userPass) {
        setMsgError("Las contraseñas no coinciden.");
        setLoadingState(false);
      } else {
        try {
          createUserWithEmailAndPassword(auth, userMail, userPass)
            .then((r) => {
              console.log("¡Usuario registrado con éxito!");
              setUpdateData(true);
            })
            .catch((e) => {
              //auth/invalid-email
              if (e.code == "auth/invalid-email") {
                setMsgError("Formato de email inválido");
                setLoadingState(false);
              }
              //auth/weak-password
              else if (e.code == "auth/weak-password") {
                setMsgError("Contraseña débil, debe ser al menos 6 caracteres");
                setLoadingState(false);
              } else if (e.code == "auth/email-already-in-use") {
                setMsgError("Email ya utilizado");
                setLoadingState(false);
              } else if (userMail.trim() == "" || userPass == "") {
                setMsgError(
                  "Los datos están incompletos, complételo por favor."
                );
                setLoadingState(false);
              }
              console.error("Error Firebase: ", e);
            });
        } catch (err) {
          console.log(err);
          setMsgError("Ha ocurrido un error, por favor, intente más tarde.");
          setLoadingState(false);
        }
      }
    } else {
      setMsgError("Los datos están incompletos, complételo por favor.");
      setLoadingState(false);
    }
  };

  return (
    <Fragment>
      <GradientBar text="REGISTRARSE" mt={true} />
      <form
        onSubmit={(e) => {
          signupUser(e);
        }}
      >
        <label>Email: </label>
        <input
          name="email"
          className="form-input"
          placeholder="Introduce el mail"
          type="email"
          onChange={(e) => setUserMail(e.target.value)}
          value={userMail}
        />
        <br />
        <label>Apodo: </label>
        <input
          name="nick"
          className="form-input"
          placeholder="Introduce el apodo"
          type="text"
          onChange={(e) => setUserNick(e.target.value)}
          value={userNick}
        />
        <br />
        <label>Contraseña: </label>
        <input
          name="password"
          className="form-input"
          placeholder="Introduce la contraseña"
          type="password"
          onChange={(e) => setUserPass(e.target.value)}
          value={userPass}
        />
        <br />
        <label>Confirmar contraseña: </label>
        <input
          name="confirm-password"
          className="form-input"
          placeholder="Confirmar contraseña"
          type="password"
          onChange={(e) => setUserPassConfirm(e.target.value)}
          value={userPassConfirm}
        />
        <input className="form-button" value="Registrarse" type="submit" />
        {msgError ? <label className="errorAuth">{msgError}</label> : ""}
        <Link to="/login">
          <p>¿Ya tienes una cuenta? ¡Ingrese aquí para iniciar sesión!</p>
        </Link>
      </form>
    </Fragment>
  );
};
export default SignUp;
