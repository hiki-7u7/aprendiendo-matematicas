import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";
import { GiBugleCall } from "react-icons/gi";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function speakText(text, rate = 1) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;

  synth.cancel();
  synth.speak(utterance);
}

/* function generatePattern() {
  // Define el nuevo patrón de repetición aquí
  var newPattern = [2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1];
  return newPattern;
} */

function generatePattern() {
  // Genera un patrón secuencial de 123 y varía la cantidad de números entre 4 y 10.
  const patternLength = Math.floor(Math.random() * 7) + 4; // Genera un número aleatorio entre 4 y 10.
  const newPattern = Array.from(
    { length: patternLength },
    (_, index) => (index % 3) + 1
  );
  return newPattern;
}

export function Ejercicio_1_13() {
  const [pattern, setPattern] = useState(generatePattern());
  const [selectedNumber, setSelectedNumber] = useState(null);
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
      selectedNumber === pattern[pattern.length - 1] &&
      respuestasCorrectasSeguidas < 3
    ) {
      setRespuestaCorrecta(true);
      setMessage("¡Correcto!");
      setMessageColor("text-green-500");
      speakText("¡Correcto!");
      setRespuestasCorrectasSeguidas(respuestasCorrectasSeguidas + 1);
      cambiarPatron();
    } else {
      setRespuestaCorrecta(false);
      setMessage("Vuelve a intentarlo.");
      setMessageColor("text-red-500");
      speakText("Vuelve a intentarlo");
      setRespuestasCorrectasSeguidas(0);
    }

    setShowMessage(true);

    if (
      selectedNumber === pattern[pattern.length - 1] &&
      respuestasCorrectasSeguidas >= 2
    ) {
      setRespuestasCorrectasSeguidas(respuestasCorrectasSeguidas + 1);
      setMessage("¡Ejercicio completado!");
      speakText("¡Ejercicio completado!");
    }
  };

  const cambiarPatron = () => {
    const newPattern = generatePattern();
    setPattern(newPattern);
    setSelectedNumber(null);
    setRespuestaCorrecta(null);
    setShowMessage(false);
  };

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  }, [showMessage]);

  return (
    <div className="bg-blue-200">
      <Cabecera />
      <div className={`min-h-screen ${showMessage ? "hidden" : ""}`}>
        <div
          className="text-gray-900 py-8 text-center mt-10"
          style={{ backgroundColor: "#FFB833" }}
        >
          <h1 className="text-3xl font-semibold">
            Ejercicio 3: Patrones con Números
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
            {/* <button
              onClick={cambiarPatron}
              className="bg-blue-500 text-white py-2 px-4 rounded-full mb-2 mr-1 flex items-center"
            >
              Cambiar Patrón
            </button> */}
            <h2 className="text-2xl font-semibold mb-4">Instrucciones</h2>
          </div>

          <h3 className="text-xl">
            Encuentra el siguiente número en el patrón.
          </h3>

          <p className="text-3xl font-semibold mb-6 mt-6">
            Patrón:{" "}
            {pattern.map((num, index) => (
              <span key={index} className="inline-block">
                {index ===
                /* respuestasCorrectasSeguidas */ pattern.length - 1 ? (
                  <span className="text-red-500 text-4xl bg-white rounded-lg px-1">
                    ?
                  </span>
                ) : (
                  num
                )}
                {index < pattern.length - 1 ? " → " : ""}
              </span>
            ))}
          </p>

          <div className="mb-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="inline-block mx-2">
                <button
                  onClick={() => {
                    setSelectedNumber(num);
                    speakText(num.toString());
                  }}
                  className={`bg-blue-500 text-white py-2 px-4 rounded-full mb-2 mr-1 ml-2 mt-4 text-6xl ${
                    selectedNumber === num ? "bg-blue-800" : ""
                  }`}
                >
                  {num}
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
