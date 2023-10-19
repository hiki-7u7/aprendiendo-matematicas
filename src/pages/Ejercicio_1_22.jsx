import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";
import esfera from "../assets/img/icono_esfera.png";
import cubo from "../assets/img/icono_cubo.png";
import cilindro from "../assets/img/icono_cilindro.png";
import cono from "../assets/img/icono_cono.png";
import prisma from "../assets/img/icono_prisma.png";
import piramide from "../assets/img/icono_piramide.png";

const figuras3D = [
  { imagen: esfera, nombre: "Esfera", color: "#52BE80" },
  { imagen: cubo, nombre: "Cubo", color: "#A569BD" },
  { imagen: cilindro, nombre: "Cilindro", color: "#F4D03F" },
  { imagen: cono, nombre: "Cono", color: "#E74C3C" },
  { imagen: prisma, nombre: "Prisma", color: "#3498DB" },
  { imagen: piramide, nombre: "Pirámide", color: "#E67E22" },
];

function speakText(text, rate = 1) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  synth.cancel();
  synth.speak(utterance);
}

function generateRandomNumber() {
  return Math.floor(Math.random() * figuras3D.length);
}

export function Ejercicio_1_22() {
  const [randomFiguraIndex, setRandomFiguraIndex] = useState(
    generateRandomNumber()
  );
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);

  const navegar = useNavigate();
  const { user } = useAuth();

  const figuraActual = figuras3D[randomFiguraIndex];
  const opcionesActuales = figuras3D.map((figura) => figura.imagen);
  const respuestaCorrecta = figuraActual.imagen;

  useEffect(() => {
    speakText(`¿Cuál es la imagen del "${figuraActual.nombre}"?`);
  }, [randomFiguraIndex, figuraActual]);

  const handleOptionClick = (option, color) => {
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
          speakText(`¿Cuál es la imagen del "${figuraActual.nombre}"?`);
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
            Ejercicio 6: Reconocer imagen de Figuras 3D
          </h1>
        </div>
        <div className="container mx-auto mt-8 p-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Instrucciones</h2>
          <h3 className="text-3xl mb-4">
            ¿Cuál es la imagen de{" "}
            <span className="text-4xl mb-4 font-semibold bg-white rounded-lg">
              "{figuraActual.nombre}"
            </span>
            ?
          </h3>
          <div className="options">
            {opcionesActuales.map((opcion, index) => (
              <button
                key={index}
                onClick={() =>
                  handleOptionClick(opcion, figuras3D[index].color)
                }
                onMouseEnter={() => setHoveredOption(opcion)} // Agrega el evento onMouseEnter
                onMouseLeave={() => setHoveredOption(null)} // Agrega el evento onMouseLeave
                className="px-4 rounded-lg"
              >
                <img
                  src={opcion}
                  alt="Opción"
                  style={{
                    width: "100px",
                    backgroundColor: figuras3D[index].color,
                    background:
                      hoveredOption === opcion
                        ? "transparent linear-gradient(180deg, #FFFFFF 0%, #FFFFFF00 100%)"
                        : `${figuras3D[index].color}`, // Agrega la lógica para cambiar el color de fondo cuando el mouse está sobre la opción
                  }}
                  className="rounded-lg "
                />
              </button>
            ))}
          </div>
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
