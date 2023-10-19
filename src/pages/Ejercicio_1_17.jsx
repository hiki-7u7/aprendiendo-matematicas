import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";
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

function generateRandomNumber() {
  return Math.floor(Math.random() * figuras.length);
}

export function Ejercicio_1_17() {
  const [randomFiguraIndex, setRandomFiguraIndex] = useState(
    generateRandomNumber()
  );
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);

  const navegar = useNavigate();
  const { user } = useAuth();

  const figuraActual = figuras[randomFiguraIndex];
  const opcionesActuales = figuras.map((figura) => figura.nombre);
  const respuestaCorrecta = figuraActual.nombre;

  useEffect(() => {
    speakText(
      `Selecciona el nombre de la figura mostrada: ${figuraActual.nombre}.`
    );
  }, [randomFiguraIndex, figuraActual]);

  const handleOptionClick = (option) => {
    speakText(figuras.find((figura) => figura.nombre === option).nombre);

    setTimeout(() => {
      setSelectedOption(option);

      if (option === respuestaCorrecta) {
        setRespuestasCorrectas(respuestasCorrectas + 1);
        setMessage("Correcto");
        setMessageColor("text-green-500");
        speakText("Correcto");
      } else {
        setMessage("Vuelve a intentarlo.");
        setMessageColor("text-red-500");
        speakText("Vuelve a intentarlo");
      }

      // Espera 2 segundos y luego cambia la figura y el mensaje
      setTimeout(() => {
        setMessage(null);
        setSelectedOption(null);

        if (respuestasCorrectas < 2) {
          setRandomFiguraIndex(generateRandomNumber());
          speakText(`Selecciona el nombre de la nueva figura.`);
        } else if (respuestasCorrectas === 2) {
          setMessage("¡Ejercicio completado!");
          speakText("¡Ejercicio completado!");
          // Agrega la lógica para registrar el progreso del estudiante y navegar a la siguiente actividad.
          setTimeout(() => {
            navegar("/siguiente_actividad"); // Reemplaza con la ruta correcta
          }, 2000);
        }
      }, 2000);
    }, 2000);
  };

  return (
    <div className="bg-blue-200">
      <Cabecera />
      <div className="relative top-32">
        <BotonVolver direccion="/unidad/1/listaEjercicios" />
      </div>
      <div className="relative top-32 right-52">
        <ContRespCorrectas contador={respuestasCorrectas} />
      </div>
      <div className="min-h-screen">
        <div
          className="text-gray-900 py-8 text-center mt-10"
          style={{ backgroundColor: "#FFFF70" }}
        >
          <h1 className="text-3xl font-semibold">
            Ejercicio 3: Reconocer nombre de las Figuras Geométricas 2D
          </h1>
        </div>
        <div className="container mx-auto mt-8 p-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Instrucciones</h2>
          <h3 className="text-xl">
            Selecciona el nombre de la figura mostrada.
          </h3>
          <img
            src={figuraActual.imagen}
            alt="Figura Geométrica"
            style={{ backgroundColor: figuraActual.color }}
            className="mx-auto my-4 h-48 w-48"
          />
          {opcionesActuales.map((opcion, index) => (
            <button
              key={index}
              className={`bg-blue-500 text-white hover:bg-white hover:text-black py-2 px-4 rounded-full my-2 mx-1`}
              onClick={() => handleOptionClick(opcion)}
            >
              {opcion}
            </button>
          ))}
        </div>
      </div>
      {message && (
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