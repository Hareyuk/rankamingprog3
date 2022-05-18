import './style.css';
import React, {useState, useEffect, Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
const Login = (props)=>
{
    const {functionStart, uid} = props;
    const navigate = useNavigate();
    useEffect(()=>
    {
        functionStart(false);
        if(uid)
        {
            navigate("/")
        }
    })
    return(
    <Fragment>

    </Fragment>);
}
export default Login;