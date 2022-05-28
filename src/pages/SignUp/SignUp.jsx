import React, { useState, useEffect, Fragment } from "react";
import { auth, createUserWithEmailAndPassword } from "../../firebaseconfig";
import { Link, useNavigate } from "react-router-dom";
import GradientBar from "../../components/GradientBar/GradientBar";
import { getAuth } from "firebase/auth";
import { doc, setDoc, addDoc, collection, } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../../firebaseconfig";
const SignUp = (props) => {
  const { functionStart, uid } = props;
  const navigate = useNavigate();
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userPassConfirm, setUserPassConfirm] = useState("");
  const [userNick, setUserNick] = useState("");
  const [msgError, setMsgError] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  useEffect(() => {
    functionStart(false);
    if (uid) {
      navigate("/");
    }
  }, []);

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
        insignias: {}
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
          }
          //auth/weak-password
          if (e.code == "auth/weak-password") {
            setMsgError("Contraseña débil, debe ser al menos 6 caracteres");
          }
          if (e.code == "auth/email-already-in-use") {
            setMsgError("Contraseña ya utilizado");
          }
          console.error("Error Firebase: ", e);
        });
    } catch (err) {
      console.log(err);
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
        <label>Nombre de usuario: </label>
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

        <Link to="/login">
          <p>¿Ya tienes una cuenta? ¡Ingrese aquí para iniciar sesión!</p>
        </Link>
      </form>
    </Fragment>
  );
};
export default SignUp;
