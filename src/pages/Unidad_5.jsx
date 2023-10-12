import React, { useState } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { BsDice6 } from "react-icons/bs"; // Icono de operaciones matemáticas
import { GiBugleCall } from "react-icons/gi"; // Icono de audio
import { IoVideocam } from "react-icons/io5"; // Icono de video
import { Link } from "react-router-dom"; // Para el botón de ir a ejercicios
import { BotonVolver } from "../components/BotonVolver";

export function Unidad_5() {
  const [audioPlaying, setAudioPlaying] = useState(false); // Estado para controlar si el audio está reproduciéndose o no

  // Texto que se leerá en voz alta
  const audioText = `
    En esta unidad, aprenderás los conceptos fundamentales de números y
    operaciones matemáticas. Comenzaremos explorando los números
    naturales, enteros, fraccionarios y decimales. Luego,
    profundizaremos en diversas operaciones como la suma, resta,
    multiplicación y división.
  `;

  const synth = window.speechSynthesis; // API para sintetizar voz

  // Función para reproducir o detener el audio
  const toggleAudio = () => {
    if (!audioPlaying) {
      // Si el audio no se está reproduciendo

      const utterance = new SpeechSynthesisUtterance(audioText); // Crear un nuevo objeto de sintetización de voz

      synth.speak(utterance); // Reproducir el texto en voz alta

      setAudioPlaying(true); // Cambiar el estado a reproduciéndose

      utterance.onend = () => {
        // Cuando el audio termine de reproducirse

        setAudioPlaying(false); // Cambiar el estado a detenido
      };
    } else {
      // Si el audio se está reproduciendo

      synth.cancel(); // Detener la reproducción

      setAudioPlaying(false); // Cambiar el estado a detenido
    }
  };

  return (
    <div className="flex flex-col bg-blue-200 ">
      <Cabecera />
      {/* Botón para volver a la página anterior */}
      <div className="relative left-10 top-6">
        <BotonVolver direccion={"/"} />
      </div>

      {/* Contenido de la Unidad */}
      <div className="flex-grow container mx-auto mt-8 p-4">
        <div
          className=" text-gray-900  font-semibold py-6 text-center shadow-md"
          style={{ backgroundColor: "#ADFFFF" }}
        >
          <div className="flex items-center justify-center">
            <BsDice6
              className="text-6xl mx-5"
              style={{ backgroundColor: "#66ffff" }}
            />
            <h1 className="text-3xl font-bold">
              Unidad 5: Datos y probabilidades
            </h1>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mt-4">Contenido de la Unidad</h2>
        <p>
          En esta unidad, aprenderás los conceptos fundamentales de números y
          operaciones matemáticas. Comenzaremos explorando los números
          naturales, enteros, fraccionarios y decimales. Luego, profundizaremos
          en diversas operaciones como la suma, resta, multiplicación y
          división.
        </p>

        {/* Botón para convertir el texto en audio */}
        <button
          onClick={toggleAudio}
          className={`${
            audioPlaying ? "bg-red-500" : "bg-blue-500"
          } text-white py-2 px-4 rounded-full mt-4 flex items-center space-x-2`}
        >
          <GiBugleCall className="text-xl" />
          <span>{audioPlaying ? "Detener Audio" : "Reproducir Audio"}</span>
        </button>

        {/* Sección de Video */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Video Explicativo</h2>
          <div className="bg-gray-200 p-4 rounded-lg">
            {/* Aquí puedes agregar tu componente de video */}

            <iframe
              className="w-full aspect-video "
              src=""
              title="Video explicativo de la Unidad 1"
              allow=" fullscreen "
            ></iframe>
          </div>
        </div>

        {/* Botón para ir a Ejercicios */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Ejercicios</h2>
          <button>
            <Link
              to="/unidad/5/ejercicios" // Reemplaza con la ruta correcta para los ejercicios de la Unidad 5
              className="bg-green-500 text-white py-2 px-4 rounded-full mt-4 block text-center"
            >
              Ir a Ejercicios
            </Link>
          </button>
        </div>
      </div>

      <PieDePagina />
    </div>
  );
}
