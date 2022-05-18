import './style.css';
import React, {useState, useEffect, Fragment} from 'react';
const Rankings = (props)=>
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
export default Rankings;