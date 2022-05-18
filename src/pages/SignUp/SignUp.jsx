import React, { useState, useEffect, Fragment } from "react";
import { auth, createUserWithEmailAndPassword } from "../../firebaseconfig";
import { Link, useNavigate } from "react-router-dom";
import GradientBar from "../../components/GradientBar/GradientBar";
const SignUp = (props) => {
  const { functionStart, uid } = props;
  const navigate = useNavigate();
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [msgError, setMsgError] = useState(null);
  useEffect(() => {
    functionStart(false);
    if (uid) {
      navigate("/");
    }
  });

  const signupUser = (e) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, userMail, userPass)
        .then((r) => {
          console.log("Usuario registrado con éxito!");
          navigate("/login");
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
          className="form-input"
          placeholder="Introduce el mail"
          type="email"
          onChange={(e) => setUserMail(e.target.value)}
          value={userMail}
        />
        <br />
        <label>Contraseña: </label>
        <input
          className="form-input"
          placeholder="Introduce la contraseña"
          type="password"
          onChange={(e) => setUserPass(e.target.value)}
          value={userPass}
        />
        <br/>
        <label>Confirmar contraseña: </label>
        <input
          className="form-input"
          placeholder="Confirmar contraseña"
          type="password"
          onChange={(e) => setUserPass(e.target.value)}
          value={userPass}
        />
        <input className="form-button" value="Registrarse" type="submit" />

        
        <Link to="/login"><p>¿Ya tienes una cuenta? ¡Ingrese aquí!</p></Link>
      </form>

    </Fragment>
  );
};
export default SignUp;
