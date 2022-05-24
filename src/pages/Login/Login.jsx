import './style.css';
import React, {useState, useEffect, Fragment} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GradientBar from '../../components/GradientBar/GradientBar';
import {auth, signInWithEmailAndPassword} from '../../firebaseconfig'

const Login = (props)=>
{
    const {functionStart, uid} = props;
    const navigate = useNavigate();
    const [userMail, setUserMail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [msgError, setMsgError] = useState(null);
    useEffect(()=>
    {
        functionStart(false);
        if(uid)
        {
            navigate("/")
        }
    })

    const loginUsuario = (e)=>
    {
        e.preventDefault();
        signInWithEmailAndPassword(auth, userMail,userPass)
        .then((r)=>console.info(r))
        .catch((e)=>
        {
            console.error(e);
            if(e.code == "auth/wrong-password")
            {
                setMsgError("Contraseña incorrecta");
            }
            if(e.code == "auth/user-not-found")
            {
                setMsgError("Usuario no encontrado");
            }
        });
    }
    
    return(
    <Fragment>
        <GradientBar text="INICIAR SESIÓN" mt={true} />
        <form
            onSubmit={(e) => {
                loginUsuario(e);
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
            <input className="form-button" value="Iniciar sesión" type="submit" />

            
            <Link to="/signup"><p>¿No tienes cuenta? ¡Ingrese aquí para registrarse!</p></Link>
        </form>
    </Fragment>);
}
export default Login;