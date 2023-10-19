import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { GiBugleCall } from "react-icons/gi";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

// Importa todas las imágenes
import img1 from "../assets/img/manzana_1.png";
import img2 from "../assets/img/manzana_2.png";
import img3 from "../assets/img/manzana_3.png";
import img4 from "../assets/img/manzana_4.png";
import img5 from "../assets/img/manzana_5.png";
import img6 from "../assets/img/manzana_6.png";
import img7 from "../assets/img/manzana_7.png";
import img8 from "../assets/img/manzana_8.png";
import img9 from "../assets/img/manzana_9.png";
import img10 from "../assets/img/manzana_10.png";
import img11 from "../assets/img/manzana_11.png";
import img12 from "../assets/img/manzana_12.png";
import img13 from "../assets/img/manzana_13.png";
import img14 from "../assets/img/manzana_14.png";
import img15 from "../assets/img/manzana_15.png";
import img16 from "../assets/img/manzana_16.png";
import img17 from "../assets/img/manzana_17.png";
import img18 from "../assets/img/manzana_18.png";
import img19 from "../assets/img/manzana_19.png";
import img20 from "../assets/img/manzana_20.png";
import num0 from "../assets/img/icono_0.png";
import num1 from "../assets/img/icono_1.png";
import num2 from "../assets/img/icono_2.png";
import num3 from "../assets/img/icono_3.png";
import num4 from "../assets/img/icono_4.png";
import num5 from "../assets/img/icono_5.png";
import num6 from "../assets/img/icono_6.png";
import num7 from "../assets/img/icono_7.png";
import num8 from "../assets/img/icono_8.png";
import num9 from "../assets/img/icono_9.png";
import num10 from "../assets/img/icono_10.png";
import num11 from "../assets/img/icono_11.png";
import num12 from "../assets/img/icono_12.png";
import num13 from "../assets/img/icono_13.png";
import num14 from "../assets/img/icono_14.png";
import num15 from "../assets/img/icono_15.png";
import num16 from "../assets/img/icono_16.png";
import num17 from "../assets/img/icono_17.png";
import num18 from "../assets/img/icono_18.png";
import num19 from "../assets/img/icono_19.png";
import num20 from "../assets/img/icono_20.png";

const n = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
]; // Arreglo de imágenes

const numeros = [
  num0,
  num1,
  num2,
  num3,
  num4,
  num5,
  num6,
  num7,
  num8,
  num9,
  num10,
  num11,
  num12,
  num13,
  num14,
  num15,
  num16,
  num17,
  num18,
  num19,
  num20,
]; // Arreglo de números

// Función para sintetizar voz
function speakText(text, rate = 1) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;

  synth.cancel();

  synth.speak(utterance);
}

// Función para generar un número aleatorio entre 1 y 10
function generateRandomNumber() {
  const num1 = Math.floor(Math.random() * 5); // Número aleatorio entre 1 y 20
  const num2 = Math.floor(Math.random() * (5 - num1)); // Número aleatorio entre 1 y 20 - num1
  const result = num1 + num2;

  const options = [result];
  while (options.length < 4) {
    const randomOption = Math.floor(Math.random() * 5);
    if (options.indexOf(randomOption) === -1) {
      options.push(randomOption);
    }
  }

  return {
    num1,
    num2,
    result,
    options: options.sort(() => Math.random() - 0.5),
  };
}

export function Ejercicio_1_25() {
  const [numbers, setNumbers] = useState(generateRandomNumber());
  const [selectedOption, setSelectedOption] = useState(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [respuestasCorrectasSeguidas, setRespuestasCorrectasSeguidas] =
    useState(0);

  const navegar = useNavigate();

  const { user } = useAuth();

  const RevisarRespuesta = () => {
    if (selectedOption === numbers.result && respuestasCorrectasSeguidas < 3) {
      setRespuestaCorrecta(true);
      setShowMessage(true);
      setMessage("¡Correcto!");
      setMessageColor("text-green-500");
      speakText("¡Correcto!");

      setTimeout(() => {
        setShowMessage(false);
      }, 2000);

      setRespuestasCorrectasSeguidas(respuestasCorrectasSeguidas + 1);

      if (respuestasCorrectasSeguidas <= 2) {
        setTimeout(() => {
          speakText("Selecciona el resultado correcto.");
        }, 2000);
      }
    } else {
      setRespuestaCorrecta(false);
      setShowMessage(true);
      setMessage("Vuelve a intentarlo.");
      setMessageColor("text-red-500");
      speakText("Vuelve a intentarlo.");

      setTimeout(() => {
        setShowMessage(false);
      }, 2000);

      setRespuestasCorrectasSeguidas(respuestasCorrectasSeguidas);

      setTimeout(() => {
        speakText("Selecciona el resultado correcto.");
      }, 2000);
    }

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 2000);

    if (selectedOption === numbers.result && respuestasCorrectasSeguidas >= 2) {
      setShowMessage(true);
      setMessage("¡Ejercicio completado!");
      speakText("¡Ejercicio completado!");
      setMessageColor("text-green-500");

      setTimeout(() => {
        setShowMessage(false);
      }, 2000);

      /* setTimeout(() => {
        // Agrega la lógica para registrar el progreso del estudiante y navegar a la siguiente actividad.
      }, 2000); */
    }
  };

  useEffect(() => {
    if (respuestaCorrecta === true) {
      setNumbers(generateRandomNumber());
    }

    setSelectedOption(null);
    setRespuestaCorrecta(null);
  }, [respuestaCorrecta]);

  useEffect(() => {
    if (showMessage) {
      setShowMessage(false);
    }
  }, [showMessage]);

  return (
    <div className="bg-blue-200">
      <Cabecera />

      <div className={`min-h-screen ${showMessage ? "hidden" : ""}`}>
        <div
          className=" text-gray-900  py-8 text-center mt-10"
          style={{ backgroundColor: "#FF5C5C" }}
        >
          <h1 className="text-3xl font-semibold">
            Ejercicio 12: Suma del 0 al 5
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
              onClick={() => {
                speakText("Selecciona el resultado correcto.");
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded-full mb-2 mr-1 flex items-center"
            >
              <GiBugleCall className="text-xl" />
            </button>

            <h2 className="text-2xl font-semibold">Instrucciones</h2>
          </div>

          <p className="text-xl">Resuelve la operación:</p>
          <h3 className="text-8xl mb-3">
            {numbers.num1} + {numbers.num2}
          </h3>

          <div className="flex justify-center items-center">
            {numbers.num1 === 0 ? (
              ""
            ) : (
              <img
                src={n[numbers.num1 - 1]}
                alt={`Número ${numbers.num1}`}
                className="mx-2 h-40 w-64"
              />
            )}
            <span className="text-8xl"> + </span>
            {numbers.num2 === 0 ? (
              ""
            ) : (
              <img
                src={n[numbers.num2 - 1]}
                alt={`Número ${numbers.num2}`}
                className="mx-2 h-40 w-64"
              />
            )}{" "}
          </div>

          <div className="mb-6">
            {numbers.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedOption(option);
                  speakText(option.toString());
                }}
                className={`bg-blue-500 text-white text-7xl py-2 px-4 rounded-full mb-2 mr-1 ml-2 mt-4 ${
                  selectedOption === option ? " bg-white text-black" : ""
                }`}
              >
                <img
                  src={numeros[option]}
                  alt={`${option}`}
                  className="h-16 w-20"
                />
              </button>
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
