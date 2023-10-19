import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";

import pantalonLargo from "../assets/img/icono_pantalones.png";
import pantalonCorto from "../assets/img/icono_pantalones_cortos.png";
import cabelloLargo from "../assets/img/icono_pelo_largo.png";
import cabelloCorto from "../assets/img/icono_pelo_corto.png";
import calcetinLargo from "../assets/img/icono_calcetines_largo.png";
import calcetinCorto from "../assets/img/icono_calcetines_corto.png";

const parejasImagenes = [
  { imagenCorta: pantalonCorto, imagenLarga: pantalonLargo },
  { imagenCorta: cabelloCorto, imagenLarga: cabelloLargo },
  { imagenCorta: calcetinCorto, imagenLarga: calcetinLargo },
];

const parejasNombres = [
  { nombreCorta: "pantalon corto", nombreLarga: "pantalon largo" },
  { nombreCorta: "cabello corto", nombreLarga: "cabello largo" },
  { nombreCorta: "calcetin corto", nombreLarga: "calcetin largo" },
];

function speakText(text, rate = 1) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  synth.cancel();
  synth.speak(utterance);
}

export function Ejercicio_1_31() {
  const [pregunta, setPregunta] = useState("");
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);
  const [imagenCorta, setImagenCorta] = useState(null);
  const [imagenLarga, setImagenLarga] = useState(null);
  const [nombreLarga, setNombreLarga] = useState();
  const [nombreCorta, setNombreCorta] = useState();

  const navegar = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    presentarNuevaPregunta();
  }, [respuestasCorrectas]);

  const presentarNuevaPregunta = () => {
    if (respuestasCorrectas < parejasImagenes.length) {
      const nuevaPareja = parejasImagenes[respuestasCorrectas];
      const nuevaPareja2 = parejasNombres[respuestasCorrectas];

      setNombreCorta(nuevaPareja2.nombreCorta);
      setNombreLarga(nuevaPareja2.nombreLarga);
      setImagenCorta(nuevaPareja.imagenCorta);
      setImagenLarga(nuevaPareja.imagenLarga);

      const esPreguntaMasLargo = Math.random() < 0.5; // 50% de probabilidad
      setPregunta(
        `¿Cuál es ${esPreguntaMasLargo ? "más largo" : "más corto"}, ${
          nuevaPareja2.nombreCorta
        } o ${nuevaPareja2.nombreLarga}?`
      );
    }
  };

  const handleOptionClick = (opcion) => {
    setSelectedOption(opcion);

    const preguntaIndex = respuestasCorrectas;
    const parejaActual = parejasImagenes[preguntaIndex];
    const esPreguntaMasLargo = pregunta.includes("más largo");
    const opcionCorrecta = esPreguntaMasLargo
      ? parejaActual.imagenLarga
      : parejaActual.imagenCorta;

    if (opcion === opcionCorrecta && respuestasCorrectas < 2) {
      setMessage("Correcto");
      speakText("Correcto");
      setMessageColor("text-green-500");
      setRespuestasCorrectas(respuestasCorrectas + 1);
      presentarNuevaPregunta();
    } else {
      setMessage("Vuelve a intentarlo");
      speakText("Vuelve a intentarlo");
      setMessageColor("text-red-500");
      presentarNuevaPregunta();
    }

    setTimeout(() => {
      setMessage(null);
      setSelectedOption(null);
    }, 2000);

    if (respuestasCorrectas >= 2 && opcion === opcionCorrecta) {
      setMessage("¡Ejercicio completado!");
      speakText("¡Ejercicio completado!");
      setMessageColor("text-blue-500");
      setRespuestasCorrectas(respuestasCorrectas + 1);

      setTimeout(() => {
        navegar("/siguiente_actividad");
      }, 2000);
    }
    if (respuestasCorrectas < 3) {
      presentarNuevaPregunta();
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
          style={{ backgroundColor: "#B1F977" }}
        >
          <h1 className="text-3xl font-semibold">
            Ejercicio 1: Identificar y comparar la longitud de objetos
          </h1>
        </div>
        <div className="container mx-auto mt-8 p-4 text-center">
          <h2 className="text-2xl font-semibold mb-4">Instrucciones</h2>
          <h3 className="text-3xl mb-4">{pregunta}</h3>
          <div className="options">
            {imagenCorta && imagenLarga && (
              <>
                <button
                  onClick={() => handleOptionClick(imagenCorta)}
                  className="px-4 rounded-lg m-4"
                >
                  <img
                    src={imagenCorta}
                    alt={nombreCorta}
                    style={{ width: "100px" }}
                    className="rounded-lg"
                  />
                </button>
                <button
                  onClick={() => handleOptionClick(imagenLarga)}
                  className="px-4 rounded-lg m-4"
                >
                  <img
                    src={imagenLarga}
                    alt={nombreLarga}
                    style={{ width: "150px" }}
                    className="rounded-lg "
                  />
                </button>
              </>
            )}
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
