import './style.css';
import React, {useState, useEffect, Fragment} from 'react';
import GrandientBar from '../../components/GradientBar/GradientBar';
const About = (props)=>
{
    const {functionStart} = props;
    useEffect(()=>
    {
        functionStart(false);
    })
    return(
    <Fragment>
        <GrandientBar text="Acerca de"></GrandientBar>
        <div className='p-about'>
            <p>Rankaming es un sitio web de minijuegos hecho para el examen final de Programación Multimedial 3, de la carrera Tecnología Multimedial en la universidad Maimónides, con Leandro Amaro como profesor de la materia y del examen.</p>
            <p>Este trabajo fue desarrollado por Axel Julián Dumas Cutuli, con intención de hacer un trabajo más grande integrándolo con Unity, para así realizar react + unity. Ha sido una experiencia valiosa haber realizado el proyecto.</p>
        </div>
    </Fragment>);
}
export default About;