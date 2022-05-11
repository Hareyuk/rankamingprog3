import './style.css';
import React, {useState, useEffect, Fragment} from 'react';
import BackgroundD from '../../components/BackgroundCanvas/BackgroundD';
import GradientBar from '../../components/GradientBar/GradientBar';

const Home = ()=>
{
    const buildDiv=(item)=>
    {
        return <div key={item.key} className="cardInfo">
                    <div className='pdDiv'>
                        <div className='infoDiv'>
                            <div className='divImg'><img src={item.picMin} alt={"Imagen gráfica de "+ item.nombre}/></div>
                            <h3>{item.nombre}</h3>
                            <p>{item.desc}</p>
                            <h4>géneros: {obtainGens(item)}</h4>
                        </div>
                    </div>
                </div>
    }
    const obtainGens=(item)=>
    {
        const amount = item.genres.length - 1;
        let texto = "";
        item.genres.map((genero,i)=>
        {
            (i !== amount ? texto += genero + ", " : texto += genero);
        })
        return texto;
    }
    const buildDivRank=(item)=>
    {
        return <div key={item.key} className="cardInfo">
                        
                </div>
    }

    const placeHolder=[{key:0, nombre: "Rompecabezas mineras",desc:"Un juego de armar rompecabezas en el menor tiempo posible, ¡aprovehcalo! Podés elegir a tu personaje favorito!", genres: ["puzzles","acción"], picMin:"/placeholderImg.jpg"}]

    const placeHolderUser=[{key:0, nombre: "Akslart",frase:"Mi cielo! Mi amor!", picUser:"/placeholderImg.jpg"}];

    return(
    <Fragment>
        <div className='startmain'>
            <h1><img src="RLogo.svg" alt="Letra R de Rankaming"/>ankaming</h1>

            <GradientBar text="INICIO"/>
            <section>
                <h2>Últimos juegos</h2>
                {placeHolder.map(item=>buildDiv(item))}
            </section>
            <section>
                <h2>Rankings</h2>
                {placeHolder.map(item=>buildDivRank(item))}
            </section>
        </div>
    </Fragment>);
}
export default Home;