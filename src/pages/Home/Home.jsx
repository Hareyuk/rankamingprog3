import "./style.css";
import React, { useState, useEffect, Fragment } from "react";
import BackgroundD from "../../components/BackgroundCanvas/BackgroundD";
import GradientBar from "../../components/GradientBar/GradientBar";
import { Link } from "react-router-dom";

const Home = () => {
  const buildDiv = (item) => {
    return (
      <div key={item.key} className="cardInfo">
        <div className="pdDiv">
          <div className="infoDiv">
            <div className="divImg">
              <img src={item.picMin} alt={"Imagen gráfica de " + item.nombre} />
            </div>
            <h3>{item.nombre}</h3>
            <p>{item.desc}</p>
            <h4>géneros: {obtainGens(item)}</h4>
          </div>
        </div>
      </div>
    );
  };
  const obtainGens = (item) => {
    const amount = item.genres.length - 1;
    let texto = "";
    item.genres.map((genero, i) => {
      i !== amount ? (texto += genero + ", ") : (texto += genero);
    });
    return texto;
  };
  const buildDivRank = (item) => {
    return <div key={item.key} className="cardInfo cardRank"><h3>{item.nombre}</h3>
    <div className="rankList">
      {item.arrayPuntos.map((item, i)=>
        {
          return <div className="userRank"><div className="borderPic"><div></div><img src={item.picUser} alt={item.nombre}/></div><div className="boxTextsRank">
            <h4>{(i+1)} - {item.nombre}</h4><p>{item.puntaje}</p></div></div>;
        })}
      </div>
      </div>;
  };
  const buildDivPlus = (link, childText) => {
    return (
      <div key="none" className="cardInfo cardPlus">
        <Link to={link}></Link>
        <div>
          <i className="fa-solid fa-plus"></i>
          <p>{childText}</p>
        </div>
      </div>
    );
  };

  const placeHolder = [
    {
      key: 0,
      nombre: "Rompecabezas mineras",
      desc: "Un juego de armar rompecabezas en el menor tiempo posible, ¡aprovehcalo! Podés elegir a tu personaje favorito!",
      genres: ["puzzles", "acción"],
      picMin: "/placeholderImg.jpg",
    },
    {
      key: 1,
      nombre: "Rompecabezas mineras",
      desc: "Un juego de armar rompecabezas en el menor tiempo posible, ¡aprovehcalo! Podés elegir a tu personaje favorito!",
      genres: ["puzzles", "acción"],
      picMin: "/placeholderImg.jpg",
    },
    {
      key: 2,
      nombre: "Rompecabezas mineras",
      desc: "Un juego de armar rompecabezas en el menor tiempo posible, ¡aprovehcalo! Podés elegir a tu personaje favorito!",
      genres: ["puzzles", "acción"],
      picMin: "/placeholderImg.jpg",
    },
    {
      key: 3,
      nombre: "Rompecabezas mineras",
      desc: "Un juego de armar rompecabezas en el menor tiempo posible, ¡aprovehcalo! Podés elegir a tu personaje favorito!",
      genres: ["puzzles", "acción"],
      picMin: "/placeholderImg.jpg",
    },
  ];

  const placeHolderUser = [
    {
      nombre: "Juego1",
      arrayPuntos: [
        {
          key: "a1",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 200,
        },
        {
          key: "a2",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 900,
        },
        {
          key: "a3",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 600,
        },
        {
          key: "a4",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 700,
        },
      ]
    },
    {
      nombre: "Juego2",
      arrayPuntos: [
        {
          key: "a1",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 7600,
        },
        {
          key: "a2",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 900,
        },
        {
          key: "a3",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 100,
        },
        {
          key: "a4",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 9900,
        },
      ]
    },
    {
      nombre: "Juego3",
      arrayPuntos: [
        {
          key: "a1",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 5100,
        },
        {
          key: "a2",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 2200,
        },
        {
          key: "a3",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 6500,
        },
        {
          key: "a4",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 1200,
        },
      ]
    },
    {
      nombre: "Juego4",
      arrayPuntos: [
        {
          key: "a1",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 5100,
        },
        {
          key: "a2",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 2200,
        },
        {
          key: "a3",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 6500,
        },
        {
          key: "a4",
          nombre: "Akslart",
          frase: "Mi cielo! Mi amor!",
          picUser: "/placeholderImgProfile.jpg",
          puntaje: 1200,
        },
      ]
    },
  ];

  useEffect(() => {
    placeHolderUser.forEach((arrayGame) => {
      arrayGame.arrayPuntos.sort((a, b) => {
        return a.puntaje - b.puntaje;
      });
    });
  }, [placeHolderUser]);

  return (
    <Fragment>
      <div className="startmain">
        <h1>
          <img src="RLogo.svg" alt="Letra R de Rankaming" />
          ankaming
        </h1>

        <GradientBar text="INICIO" />
        <section>
          <h2>Últimos juegos</h2>
          <div className="listDesign">
            {placeHolder.map((item, i) =>
              i < 3 ? buildDiv(item) : buildDivPlus("/games", "Más juegos")
            )}
          </div>
        </section>
        <section>
          <h2>Rankings</h2>
          <div className="listDesign">
            {placeHolderUser.map((item, i) => i<3 ? buildDivRank(item) : buildDivPlus("/rankings", "Más rankings"))}
          </div>
        </section>
      </div>
    </Fragment>
  );
};
export default Home;
