import "./style.css";
import React, { useState, useEffect, Fragment } from "react";
import GrandientBar from "../../components/GradientBar/GradientBar";
const About = (props) => {
  const { functionStart, setLoadingState } = props;
  useEffect(() => {
    setLoadingState(false);
    functionStart(false);
  }, []);
  return (
    <Fragment>
      <GrandientBar text="Acerca de"></GrandientBar>
      <div className="p-about">
        <p>
          Rankaming es un sitio web de minijuegos hecho para el examen final de
          Programación Multimedial 3, de la carrera Tecnología Multimedial en la
          universidad Maimónides, con Leandro Amaro como profesor de la materia
          y del examen final.
        </p>
        <p>
          Este trabajo fue desarrollado por Axel Julián Dumas Cutuli, con
          intención de hacer un trabajo grande de React con Unity, y poner a prueba las habilidades de diseño web creando una estética moderna para un sitio web.<br/>Fue una gran experiencia haber desarrollado este proyecto y aprendido varias tecnologías como la comunicación entre React con Unity, el uso de Firestore de Firebase, la herramienta externa de Cropper (para recortar fotos de perfil de usuario), entre otros.
        </p>
      </div>
    </Fragment>
  );
};
export default About;
