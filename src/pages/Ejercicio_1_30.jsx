import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";
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

import imag1 from "../assets/img/manzana_1.png";
import imag2 from "../assets/img/manzana_2.png";
import imag3 from "../assets/img/manzana_3.png";
import imag4 from "../assets/img/manzana_4.png";
import imag5 from "../assets/img/manzana_5.png";
import imag6 from "../assets/img/manzana_6.png";
import imag7 from "../assets/img/manzana_7.png";
import imag8 from "../assets/img/manzana_8.png";
import imag9 from "../assets/img/manzana_9.png";
import imag10 from "../assets/img/manzana_10.png";
import imag11 from "../assets/img/manzana_11.png";
import imag12 from "../assets/img/manzana_12.png";
import imag13 from "../assets/img/manzana_13.png";
import imag14 from "../assets/img/manzana_14.png";
import imag15 from "../assets/img/manzana_15.png";
import imag16 from "../assets/img/manzana_16.png";
import imag17 from "../assets/img/manzana_17.png";
import imag18 from "../assets/img/manzana_18.png";
import imag19 from "../assets/img/manzana_19.png";
import imag20 from "../assets/img/manzana_20.png";

const numeros = [
  { numero: 1, tipo: "unidad", imagen: num1, imagen2: imag1 },
  { numero: 2, tipo: "unidad", imagen: num2, imagen2: imag2 },
  { numero: 3, tipo: "unidad", imagen: num3, imagen2: imag3 },
  { numero: 4, tipo: "unidad", imagen: num4, imagen2: imag4 },
  { numero: 5, tipo: "unidad", imagen: num5, imagen2: imag5 },
  { numero: 6, tipo: "unidad", imagen: num6, imagen2: imag6 },
  { numero: 7, tipo: "unidad", imagen: num7, imagen2: imag7 },
  { numero: 8, tipo: "unidad", imagen: num8, imagen2: imag8 },
  { numero: 9, tipo: "unidad", imagen: num9, imagen2: imag9 },
  { numero: 10, tipo: "decena", imagen: num10, imagen2: imag10 },
  { numero: 11, tipo: "decena", imagen: num11, imagen2: imag11 },
  { numero: 12, tipo: "decena", imagen: num12, imagen2: imag12 },
  { numero: 13, tipo: "decena", imagen: num13, imagen2: imag13 },
  { numero: 14, tipo: "decena", imagen: num14, imagen2: imag14 },
  { numero: 15, tipo: "decena", imagen: num15, imagen2: imag15 },
  { numero: 16, tipo: "decena", imagen: num16, imagen2: imag16 },
  { numero: 17, tipo: "decena", imagen: num17, imagen2: imag17 },
  { numero: 18, tipo: "decena", imagen: num18, imagen2: imag18 },
  { numero: 19, tipo: "decena", imagen: num19, imagen2: imag19 },
  { numero: 20, tipo: "decena", imagen: num20, imagen2: imag20 },
];

// Función para sintetizar y reproducir texto en voz
function speakText(text, rate = 1) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  synth.cancel();
  synth.speak(utterance);
}

// Función para generar un índice aleatorio para los números
function generateRandomNumber(previousIndex) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * numeros.length);
  } while (randomIndex === previousIndex); // Evita que se repita el número anterior
  return randomIndex;
}

export function Ejercicio_1_30() {
  const [numeroIndex, setNumeroIndex] = useState(generateRandomNumber(-1)); // Inicia con un número aleatorio
  const [respuesta, setRespuesta] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [colorMensaje, setColorMensaje] = useState(null);
  const [respuestacorrecta, setRespuestaCorrecta] = useState(0);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const navegar = useNavigate();
  const { user } = useAuth();

  const numeroActual = numeros[numeroIndex];

  useEffect(() => {
    // Al cargar o cuando cambia el índice, se lee en voz alta la pregunta sobre unidad o decena
    /* speakText(`¿Es ${numeroActual.numero} una unidad o una decena?`); */
  }, [numeroIndex, numeroActual, mostrarMensaje]);

  const handleRespuesta = (tipo) => {
    if (tipo === numeroActual.tipo) {
      // Respuesta correcta
      setMensaje("¡Correcto!.");
      setColorMensaje("text-green-500");
      speakText("¡Correcto!.");
      setRespuestaCorrecta(respuestacorrecta + 1);
    } else {
      // Respuesta incorrecta
      setMensaje("Vuelve a intentarlo. No has identificado correctamente.");
      setColorMensaje("text-red-500");
      speakText("Vuelve a intentarlo. No has identificado correctamente.");
    }

    setMostrarMensaje(true);

    setTimeout(() => {
      setMensaje(null);
      setColorMensaje(null);
      setRespuesta(null);
      setMostrarMensaje(false);

      // Generar un nuevo número aleatorio
      const newIndex = generateRandomNumber(numeroIndex);
      setNumeroIndex(newIndex);

      speakText(`¿Es ${numeros[newIndex].numero} una unidad o una decena?`);
    }, 1000);
  };

  return (
    <div className="bg-blue-200">
      <Cabecera />
      <div className="relative top-32">
        <BotonVolver direccion="/unidad/1/listaEjercicios" />
      </div>
      <div className="relative top-40 right-52">
        <ContRespCorrectas contador={respuestacorrecta} />
      </div>
      // Otras partes del componente...
      <div className={`min-h-screen ${mostrarMensaje ? "hidden" : ""}`}>
        <div
          className="text-gray-900 py-8 text-center mt-4"
          style={{ backgroundColor: "#FF5C5C" }}
        >
          <h1 className="text-3xl font-semibold ">
            Ejercicio 11: Identificar Unidades y Decenas entre 1 a 20
          </h1>
        </div>
        <div className="container mx-auto mt-8 p-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Instrucciones</h2>
          <h3 className="text-xl">
            ¿Es {numeroActual.numero} una unidad o una decena?
          </h3>
          <img
            src={numeroActual.imagen}
            alt={numeroActual.numero}
            className="mx-auto my-4"
            style={{ width: "100px" }}
          />
          <img
            src={numeroActual.imagen2}
            alt={numeroActual.numero}
            className="mx-auto my-4 mb-5"
            style={{ width: "300px" }}
          />
          <div className="flex justify-center my-4">
            <button
              className="bg-green-500 text-white hover:bg-green-300 hover:text-black py-2 px-4 rounded-full mx-2 text-2xl"
              onClick={() => {
                handleRespuesta("unidad");
              }}
            >
              Unidad
            </button>
            <button
              className="bg-blue-500 text-white hover:bg-blue-300 hover:text-black py-2 px-4 rounded-full mx-2 text-2xl"
              onClick={() => {
                handleRespuesta("decena");
              }}
            >
              Decena
            </button>
          </div>
        </div>
      </div>
      {mostrarMensaje && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-70 flex justify-center items-center z-10`}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <span className={`text-4xl ${colorMensaje ? colorMensaje : ""}`}>
              {mensaje}
            </span>
          </div>
        </div>
      )}
      <PieDePagina />
    </div>
  );
}
