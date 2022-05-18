import './style.css';
import React, {useState, useEffect, Fragment} from 'react';
const Games = (props)=>
{
    const {functionStart} = props;
    useEffect(()=>
    {
        functionStart(true);
    })
    return(
    <Fragment>

    </Fragment>);
}
export default Games;