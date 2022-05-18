import './style.css';
import React, {useState, useEffect, Fragment} from 'react';
const Surprise = (props)=>
{
    const {functionStart, uid} = props;
    useEffect(()=>
    {
        if(uid) functionStart(false);
        else functionStart(true);
    }, []);
    const buildPageHtml=()=>
    {
        return(
            <div>

            </div>
        )
    }
    return(
    <Fragment>
        {uid ? buildPageHtml : <h2 className='warningNotLogged'>Lo sentimos, es un espacio para los usuarios del sitio web, le rogamos que inicie sesión o se haga una cuenta nueva para ver esta página de sorpresa.</h2>}
    </Fragment>);
}
export default Surprise;