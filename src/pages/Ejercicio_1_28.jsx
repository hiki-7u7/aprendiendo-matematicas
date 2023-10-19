import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { BotonVolver } from "../components/BotonVolver";
import { PieDePagina } from "../components/PieDePagina";
import MayorQue from "../assets/img/icono_mayorque.png";
import IgualQue from "../assets/img/icono_igualque.png";
import MenorQue from "../assets/img/icono_menorque.png";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { ContRespCorrectas } from "../components/ContRespCorrectas";

export function Ejercicio_1_28() {
  const [numero1, setNumero1] = useState(5);
  const [numero2, setNumero2] = useState(3);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [userRespuesta, setUserRespuesta] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensajeColor, setMensajeColor] = useState("");
  const [intentos, setIntentos] = useState(0);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const navegar = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (numero1 > numero2) {
      setRespuestaCorrecta("mayor");
    } else if (numero1 < numero2) {
      setRespuestaCorrecta("menor");
    } else {
      setRespuestaCorrecta("igual");
    }
    speakText(
      "¿Cuál es la relación entre los números?" /* `¿El número ${numero1} es ${respuestaCorrecta} que ${numero2}?` */
    );
  }, [numero1, numero2, respuestaCorrecta]);

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
    if (respuesta === respuestaCorrecta && respuestasCorrectas < 2) {
      setMensaje("¡Correcto!");
      speakText("¡Correcto!");

      setRespuestaSeleccionada(respuesta);
      mostrarResultado("¡Correcto!", "text-green-500");

      setRespuestasCorrectas(respuestasCorrectas + 1);
      setTimeout(() => {
        siguientePregunta();
        setMostrarMensaje(false);
      }, 1000);
    } else {
      setMensaje("Vuelve a intentarlo.");
      speakText("Vuelve a intentarlo.");
      setRespuestaSeleccionada(respuesta);
      mostrarResultado("Vuelve a intentarlo.", "text-red-500");

      setTimeout(() => {
        setMostrarMensaje(false);
      }, 1000);
    }
    if (respuesta === respuestaCorrecta && respuestasCorrectas >= 2) {
      setRespuestasCorrectas(respuestasCorrectas + 1);
      setMensaje("¡Ejercicio completado!");
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
      setNumero1(Math.floor(Math.random() * 10) + 1);
      setNumero2(Math.floor(Math.random() * 10) + 1);
      setRespuestaSeleccionada(null);
      setUserRespuesta("");
      setIntentos(0);
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
          className="text-gray-900 py-8 text-center mt-4"
          style={{ backgroundColor: "#FF5C5C" }}
        >
          <h1 className="text-3xl font-semibold">
            Ejercicio 6: Comparación de Números
          </h1>
        </div>
        <div className="container mx-auto mt-8 p-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Instrucciones: ¿Cuál es la relación entre los números?
          </h2>
          <div className="flex justify-center flex-col items-center mb-4">
            <div className="flex items-center mb-2">
              <p className="text-8xl mr-3">{numero1}</p>
              {!respuestaSeleccionada && (
                <p className="text-8xl m-2 text-red-600 bg-white rounded-xl">
                  ?
                </p>
              )}
              {respuestaSeleccionada && (
                <img
                  src={
                    respuestaSeleccionada === "mayor"
                      ? MayorQue
                      : respuestaSeleccionada === "igual"
                      ? IgualQue
                      : MenorQue
                  }
                  alt="Relación"
                  className="m-2"
                />
              )}
              <p className="text-8xl ml-3">{numero2}</p>
            </div>
            <div className="flex items-center">
              <img
                src={MayorQue}
                alt="Mayor Que"
                className="m-2  bg-white hover:bg-blue-400"
                onClick={() => {
                  handleRespuesta("mayor");
                  setRespuestaSeleccionada("mayor");
                }}
              />
              <img
                src={IgualQue}
                alt="Igual Que"
                className="m-2 bg-white hover:bg-blue-400"
                onClick={() => {
                  handleRespuesta("igual");
                  setRespuestaSeleccionada("igual");
                }}
              />
              <img
                src={MenorQue}
                alt="Menor Que"
                className="m-2 bg-white hover:bg-blue-400"
                onClick={() => {
                  handleRespuesta("menor");
                  setRespuestaSeleccionada("menor");
                }}
              />
            </div>
          </div>
          {/* {respuestaSeleccionada && !mostrarMensaje && (
            <div className="options">
              <button
                className="bg-blue-500 text-white hover:bg-white hover:text-black py-2 px-4 rounded-full mx-2"
                onClick={siguientePregunta}
              >
                Siguiente
              </button>
              <button
                className="bg-green-500 text-white hover:bg-white hover:text-black py-2 px-4 rounded-full mx-2"
                onClick={() => {
                  handleRespuesta(userRespuesta);
                  speakSelectedOption(userRespuesta);
                  setRespuestaSeleccionada(userRespuesta);
                }}
              >
                Comprobar Respuesta
              </button>
            </div>
          )} */}
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
