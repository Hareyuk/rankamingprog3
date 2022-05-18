import './style.css';
import React, {useState, useEffect, Fragment} from 'react';
const About = (props)=>
{
    const {functionStart} = props;
    useEffect(()=>
    {
        functionStart(false);
    })
    return(
    <Fragment>
        
    </Fragment>);
}
export default About;