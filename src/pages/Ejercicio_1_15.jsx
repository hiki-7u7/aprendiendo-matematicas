import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";
import { GiBugleCall } from "react-icons/gi";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

import circulo from "../assets/img/icono_circulo.png";
import cuadrado from "../assets/img/icono_cuadrado.png";
import rectangulo from "../assets/img/icono_rectangulo.png";
import rombo from "../assets/img/icono_rombo.png";
import triangulo from "../assets/img/icono_triangulo.png";
import ovalo from "../assets/img/icono_ovalo.png";

const figuras = [
  { imagen: triangulo, nombre: "Triángulo", color: "#52BE80 " },
  { imagen: cuadrado, nombre: "Cuadrado", color: "#A569BD" },
  { imagen: rectangulo, nombre: "Rectángulo", color: "#F4D03F" },
  { imagen: rombo, nombre: "Rombo", color: "#E74C3C" },
  { imagen: circulo, nombre: "Círculo", color: "#3498DB" },
  { imagen: ovalo, nombre: "Óvalo", color: "#E67E22" },
];

function speakText(text, rate = 1) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;

  synth.cancel();
  synth.speak(utterance);
}

function generatePattern() {
  const pattern = [];
  const minPatternLength = 4;
  const maxPatternLength = 10;
  const figuresToUse = [...figuras];
  let repeatCount = 2;

  while (pattern.length < maxPatternLength) {
    // Shuffle the order of the figures
    for (let i = figuresToUse.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [figuresToUse[i], figuresToUse[j]] = [figuresToUse[j], figuresToUse[i]];
    }

    for (const figure of figuresToUse) {
      for (let i = 0; i < repeatCount; i++) {
        pattern.push(figure);
      }
    }
  }

  return pattern.slice(0, maxPatternLength);
}

export function Ejercicio_1_15() {
  const [pattern, setPattern] = useState(generatePattern());
  const [selectedFigure, setSelectedFigure] = useState(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [respuestasCorrectasSeguidas, setRespuestasCorrectasSeguidas] =
    useState(0);

  const navegar = useNavigate();
  const { user } = useAuth();

  const RevisarRespuesta = () => {
    if (
      selectedFigure === pattern[pattern.length - 1] &&
      respuestasCorrectasSeguidas < 3
    ) {
      setRespuestaCorrecta(true);
      setMessage("¡Correcto!");
      setMessageColor("text-green-500");
      setShowMessage(true);
      speakText("¡Correcto!");
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      setRespuestasCorrectasSeguidas(respuestasCorrectasSeguidas + 1);

      if (respuestasCorrectasSeguidas <= 2) {
        setTimeout(() => {
          speakText("Encuentra la siguiente figura en el patrón.");
        }, 2000);
      }
    } else {
      setRespuestaCorrecta(false);
      setMessage("Vuelve a intentarlo.");
      setMessageColor("text-red-500");
      speakText("Vuelve a intentarlo");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      setRespuestasCorrectasSeguidas(respuestasCorrectasSeguidas);

      setTimeout(() => {
        speakText("Encuentra la siguiente figura en el patrón.");
      }, 2000);
    }

    if (
      selectedFigure === pattern[pattern.length - 1] &&
      respuestasCorrectasSeguidas >= 2
    ) {
      setMessage("¡Ejercicio completado!");
      setMessageColor("text-blue-500");
      setShowMessage(true);
      speakText("¡Ejercicio completado!");

      setTimeout(() => {
        setShowMessage(false);
        // Agrega la lógica para registrar el progreso del estudiante y navegar a la siguiente actividad.
      }, 2000);
    }
  };

  useEffect(() => {
    if (respuestaCorrecta === true) {
      setPattern(generatePattern());
    }

    setSelectedFigure(null);
    setRespuestaCorrecta(null);
  }, [respuestaCorrecta]);

  return (
    <div className="bg-blue-200">
      <Cabecera />
      <div className={`min-h-screen ${showMessage ? "hidden" : ""}`}>
        <div
          className="text-gray-900 py-8 text-center mt-10"
          style={{ backgroundColor: "#FFB833" }}
        >
          <h1 className="text-3xl font-semibold">
            Ejercicio 1: Patrones con Figuras
          </h1>
        </div>

        <div className="relative">
          <BotonVolver direccion="/unidad/1/listaEjercicios" />
        </div>
        <div className="relative mr-52">
          <ContRespCorrectas contador={respuestasCorrectasSeguidas} />
        </div>

        <div className="container mx-auto mt-8 p-4 text-center">
          <div className="flex justify-center items-center">
            <button
              onClick={() =>
                speakText("Encuentra la siguiente figura en el patrón.")
              }
              className="bg-blue-500 text-white py-2 px-4 rounded-full mb-2 mr-1 flex items-center"
            >
              <GiBugleCall className="text-xl" />
            </button>

            <h2 className="text-2xl font-semibold mb-4">Instrucciones</h2>
          </div>

          <h3 className="text-xl">
            Encuentra la siguiente figura en el patrón.
          </h3>

          <p className="text-3xl font-semibold mb-6 mt-6">
            Patrón:{" "}
            {pattern.map((figure, index) => (
              <span key={index} className="inline-block">
                {index === pattern.length - 1 ? (
                  <span className="text-red-500 bg-white rounded-md px-1 text-4xl">
                    ¿?
                  </span>
                ) : (
                  <img
                    src={figure.imagen}
                    alt={figure.nombre}
                    style={{ backgroundColor: figure.color }}
                    className="h-8 w-12 space-x-2 inline-block"
                  />
                )}
                {index < pattern.length - 1 ? " → " : ""}
              </span>
            ))}
          </p>

          <div className="mb-4">
            {figuras.map((figure, index) => (
              <div key={index} className="inline-block mx-2">
                <img
                  src={figure.imagen}
                  alt={figure.nombre}
                  style={{ backgroundColor: figure.color }}
                  className={`h-14 w-18 cursor-pointer hover:h-16 hover:w-20 hover:border-2 hover:border-black ) ${
                    selectedFigure === figure ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => {
                    setSelectedFigure(figure);
                    speakText(`Figura ${figure.nombre}`);
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={RevisarRespuesta}
            className="bg-green-500 text-white py-2 px-4 rounded-full mt-4"
          >
            Comprobar Respuesta
          </button>
        </div>
      </div>

      {showMessage && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-70 flex justify-center items-center z-10`}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <span className={`text-4xl ${messageColor ? messageColor : ""}`}>
              {message}
            </span>
          </div>
        </div>
      )}

      <PieDePagina />
    </div>
  );
}
