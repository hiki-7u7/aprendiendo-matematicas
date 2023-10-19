import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";
import { GiBugleCall } from "react-icons/gi";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import gato from "../assets/img/icono_gato.png";
import leon from "../assets/img/icono_leon.png";
import conejo from "../assets/img/icono_conejo.png";

function speakText(text, rate = 1) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;

  synth.cancel();
  synth.speak(utterance);
}

const animales = [conejo, gato, leon];

function generatePattern() {
  const start = Math.floor(Math.random() * 3);
  const patternLength = Math.floor(Math.random() * 7) + 5; // imagenes entre 4 y 10
  const pattern = [animales[start]];

  for (let i = 1; i < patternLength; i++) {
    const nextAnimalIndex = (start + i) % 3;
    pattern.push(animales[nextAnimalIndex]);
  }

  return pattern;
}

const nombresAnimales = {
  [conejo]: "Conejo",
  [leon]: "León",
  [gato]: "Gato",
};

export function Ejercicio_1_14() {
  const [pattern, setPattern] = useState(generatePattern());
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [messageColor, setMessageColor] = useState(null);
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [respuestasCorrectasSeguidas, setRespuestasCorrectasSeguidas] =
    useState(0);

  const navegar = useNavigate();
  const { user } = useAuth();

  const RevisarRespuesta = () => {
    if (
      selectedAnimal === pattern[pattern.length - 1] &&
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
          speakText("Encuentra el siguiente animal en el patrón.");
        }, 2000);
      }
    } else {
      setRespuestaCorrecta(false);
      setMessage("Vuelve a intentarlo.");
      setMessageColor("text-red-500");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      setRespuestasCorrectasSeguidas(respuestasCorrectasSeguidas);

      setTimeout(() => {
        speakText("Encuentra el siguiente animal en el patrón.");
      }, 2000);
    }

    if (
      selectedAnimal === pattern[pattern.length - 1] &&
      respuestasCorrectasSeguidas >= 2
    ) {
      setMessage("¡Ejercicio completado!");
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

    setSelectedAnimal(null);
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
            Ejercicio 2: Patrones con Animales
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
                speakText("Encuentra el siguiente animal en el patrón.")
              }
              className="bg-blue-500 text-white py-2 px-4 rounded-full mb-2 mr-1 flex items-center"
            >
              <GiBugleCall className="text-xl" />
            </button>

            <h2 className="text-2xl font-semibold mb-4">Instrucciones</h2>
          </div>

          <h3 className="text-xl">
            Encuentra el siguiente animal en el patrón.
          </h3>

          <p className="text-3xl font-semibold mb-6 mt-6">
            Patrón:{" "}
            {pattern.map((animal, index) => (
              <span key={index} className="inline-block ">
                {index === pattern.length - 1 ? (
                  <span className="text-red-500 bg-white rounded-md px-1 text-4xl p-1 ">
                    ¿?
                  </span>
                ) : (
                  <img
                    src={animal}
                    alt={`Animal ${index}`}
                    className="animal-img"
                  />
                )}
                {index < pattern.length - 1 ? " " : ""}
              </span>
            ))}
          </p>

          <div className="mb-4">
            {animales.map((animal) => (
              <div key={animal} className="inline-block mx-2">
                <button
                  onClick={() => {
                    setSelectedAnimal(animal);
                    speakText(nombresAnimales[animal]);
                  }}
                  className={`bg-blue-500 text-white hover:bg-blue-300 py-2 px-4 rounded-full mb-2 mr-1 ml-2 mt-4 h-14 w-20`}
                >
                  <img
                    src={animal}
                    alt={nombresAnimales[animal]}
                    className="animal-img"
                  />
                </button>
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
