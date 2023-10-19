import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";
import { PieDePagina } from "../components/PieDePagina";
import Gato from "../assets/img/icono_gato_patron.png";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export function Ejercicio_1_19() {
  const [pregunta, setPregunta] = useState(
    "¿En qué lado se encuentra el gato?"
  );
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState(null); // Modificado para inicializar en null
  const [userRespuesta, setUserRespuesta] = useState("");
  const [intentos, setIntentos] = useState(0);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [gatoEnIzquierda, setGatoEnIzquierda] = useState(true);
  const [mostrarMensaje, setMostrarMensaje] = useState(false); // Nuevo estado para controlar la visibilidad del mensaje
  const [mensajeColor, setMensajeColor] = useState(""); // Nuevo estado para controlar el color del mensaje
  const navegar = useNavigate();
  const { user } = useAuth();

  const cambiarPosicionYRespuesta = () => {
    const posicionAleatoria = Math.random() < 0.5;
    setGatoEnIzquierda(posicionAleatoria);
    setRespuestaCorrecta(posicionAleatoria ? "izquierda" : "derecha");
  };

  useEffect(() => {
    cambiarPosicionYRespuesta();
    speakText(pregunta);
  }, []);

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.cancel();
    synth.speak(utterance);
  };

  const mostrarResultado = (resultado, color) => {
    setMensaje(resultado);
    setMensajeColor(color);
    speakText(resultado);
    setMostrarMensaje(true);

    setTimeout(() => {
      setMensaje(null);
      setMostrarMensaje(false);
    }, 1000);
  };

  const handleRespuesta = (respuesta) => {
    setUserRespuesta(respuesta);
    if (respuesta === respuestaCorrecta && respuestasCorrectas <= 2) {
      speakText("¡Correcto!");
      mostrarResultado("¡Correcto!", "text-green-500");
      setRespuestasCorrectas(respuestasCorrectas + 1);
      setTimeout(() => {
        siguientePregunta();
      }, 1000);
    } else {
      speakText("Vuelve a intentarlo.");
      mostrarResultado("Vuelve a intentarlo.", "text-red-500");
    }
    if (respuesta === respuestaCorrecta && respuestasCorrectas >= 2) {
      setPregunta("¡Ejercicio completado!");
      speakText("Ejercicio completado.");
      setMensajeColor("text-blue-500");
      mostrarResultado("¡Ejercicio completado!", "text-blue-500");
      setTimeout(() => {
        navegar("/siguiente_actividad");
      }, 1000);
    }
  };

  const siguientePregunta = () => {
    if (intentos < 2 && respuestasCorrectas < 2) {
      cambiarPosicionYRespuesta();
      setRespuestaSeleccionada(null);
      setUserRespuesta("");
      setIntentos(0);
      setPregunta("¿En qué lado se encuentra el gato?");
      speakText(pregunta);
    }
  };

  const speakSelectedOption = (option) => {
    if (option) {
      speakText(`Has seleccionado ${option}`);
    }
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
            Ejercicio 1: izquierda o derecha
          </h1>
        </div>
        <div className="container mx-auto mt-8 p-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Instrucciones</h2>
          <h3 className="text-xl mb-4">{pregunta}</h3>
          <div className="flex justify-center mb-4">
            {gatoEnIzquierda ? (
              <img src={Gato} alt="Izquierda" className="mr-32" />
            ) : (
              <img src={Gato} alt="Derecha" className="ml-32" />
            )}
          </div>
          <div className="options">
            <button
              className={` bg-blue-500 text-white hover:bg-white hover:text-black py-2 px-4 rounded-full mr-2 ${
                respuestaSeleccionada === "izquierda" ? "" : ""
              }`}
              onClick={() => {
                setRespuestaSeleccionada("izquierda");
                speakSelectedOption("Izquierda");
                handleRespuesta("izquierda");
              }}
            >
              Izquierda
            </button>
            <button
              className={`bg-blue-500 text-white hover:bg-white hover:text-black py-2 px-4 rounded-full ml-2 ${
                respuestaSeleccionada === "derecha" ? "" : ""
              }`}
              onClick={() => {
                setRespuestaSeleccionada("derecha");
                speakSelectedOption("Derecha");
                handleRespuesta("derecha");
              }}
            >
              Derecha
            </button>
          </div>
          {mostrarMensaje && (
            <div
              className={`fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-70 flex justify-center items-center z-10`}
            >
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <span
                  className={`text-4xl ${mensajeColor ? mensajeColor : ""}`}
                >
                  {mensaje}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <PieDePagina />
    </div>
  );
}
