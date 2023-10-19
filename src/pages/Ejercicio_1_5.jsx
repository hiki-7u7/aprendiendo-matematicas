import React, { useState } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import imgManzana from "../assets/img/manzana_1.png";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";

function speakText(text, rate = 1) {
  const synth = window.speechSynthesis; // Obtener la síntesis de voz
  const utterance = new SpeechSynthesisUtterance(text); // Crear un nuevo objeto de síntesis de voz
  utterance.rate = rate; // Establecer la velocidad de la voz

  // Detener cualquier síntesis de voz anterior
  synth.cancel();

  synth.speak(utterance); // Reproducir el texto
}

export function Ejercicio_1_5() {
  const [numero, setNumero] = useState(generateRandomNumber()); // Número a componer/descomponer
  const [manzanasSoltadas, setManzanasSoltadas] = useState([]); // Arreglo de manzanas soltadas
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [mensajeRespuesta, setMensajeRespuesta] = useState(""); // Mensaje de respuesta
  const [respuestasCorrectasSeguidas, setRespuestasCorrectasSeguidas] =
    useState(0); // Contador de respuestas correctas seguidas

  const handleSoltarManzana = () => {
    if (manzanasSoltadas.length < numero) {
      const nuevaManzana = `manzana-${manzanasSoltadas.length + 1}`;
      setManzanasSoltadas([...manzanasSoltadas, nuevaManzana]);
    }
  };
  function generateRandomNumber() {
    return Math.floor(Math.random() * 10);
  }

  const handleLimpiar = () => {
    setManzanasSoltadas([]);
    setRespuestaCorrecta(null);
    setMensajeRespuesta("");
  };

  const esRespuestaCorrecta = () => {
    return manzanasSoltadas.length === numero;
  };

  const handleComprobarRespuesta = () => {
    if (esRespuestaCorrecta()) {
      setRespuestaCorrecta(true);
      setMensajeRespuesta("¡Respuesta correcta!");
      setRespuestasCorrectasSeguidas(respuestasCorrectasSeguidas + 1);
      setTimeout(() => {
        setNumero(generateRandomNumber());
        handleLimpiar();
      }, 2000);
    } else {
      setRespuestaCorrecta(false);
      setMensajeRespuesta("Respuesta incorrecta, inténtalo de nuevo.");
      setTimeout(() => {
        handleLimpiar();
      }, 2000);
    }
  };

  return (
    <div className="bg-blue-200">
      <Cabecera />

      <div className="min-h-screen">
        <div
          className="text-gray-900 py-8 text-center mt-10"
          style={{ backgroundColor: "#FF5C5C" }}
        >
          <h1 className="text-3xl font-semibold">
            Ejercicio 8: Componer Números utilizando manzanas
          </h1>
        </div>
        <div className="relative">
          <BotonVolver direccion="/unidad/1/listaEjercicios" />
        </div>
        <div className="relative mr-52">
          <ContRespCorrectas contador={respuestasCorrectasSeguidas} />
        </div>

        <div className="container mx-auto mt-8 p-4 text-center">
          <h2 className="text-2xl font-semibold">
            Componer el número {numero}
          </h2>

          <div className="mb-8">
            <p className="text-3xl">Número: {numero}</p>
            <img
              src={imgManzana}
              alt="manzana"
              className="w-16 h-16 mx-auto mb-4 cursor-pointer"
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData("manzana", "manzana");
              }}
            />
          </div>

          <div className="mb-8">
            <p className="text-2xl">Arrastra las manzanas aquí:</p>
            <div
              className="w-40 h-16 mx-auto"
              onDrop={(e) => {
                e.preventDefault();
                handleSoltarManzana();
              }}
              onDragOver={(e) => e.preventDefault()}
              style={{
                border: "2px dashed #000",
                width: "400px",
                height: "300px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {manzanasSoltadas.map((manzana, index) => (
                <img
                  key={index}
                  src={imgManzana}
                  alt={manzana}
                  className="w-16 h-16 mx-2"
                  draggable="true"
                  onDragStart={(e) => {
                    e.dataTransfer.setData("manzana", "manzana");
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            {/* <button
              onClick={() => handleLimpiar()}
              className="bg-red-500 text-white py-2 px-4 rounded-full mx-2"
            >
              Limpiar
            </button> */}
            <button
              onClick={() => handleComprobarRespuesta()}
              className="bg-green-500 text-white py-2 px-4 rounded-full mx-2"
            >
              Comprobar
            </button>
          </div>

          {respuestaCorrecta !== null && (
            <div
              className={`${
                respuestaCorrecta ? "text-green-500" : "text-red-500"
              } font-semibold mt-4`}
            >
              {mensajeRespuesta}
            </div>
          )}
        </div>
      </div>

      <PieDePagina />
    </div>
  );
}
