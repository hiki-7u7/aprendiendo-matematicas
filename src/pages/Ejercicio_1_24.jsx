import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { BotonVolver } from "../components/BotonVolver";
import { GiBugleCall } from "react-icons/gi";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import pelotaFutbol from "../assets/img/icono_pelotaFutbol.png";
import { ContRespCorrectas } from "../components/ContRespCorrectas";

export function Ejercicio_1_24() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [tablaDatos, setTablaDatos] = useState([]);
  const [pregunta, setPregunta] = useState("");
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [
    contadorrespuestasCorrectasSeguidas,
    setContadorRespuestasCorrectasSeguidas,
  ] = useState(0);

  const navegar = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Generar datos aleatorios para la tabla
    const datosAleatorios = generateUniqueRandomOptions(0, 6, 5); // Limitar a 6 goles como máximo

    // Encontrar el valor más grande para la respuesta correcta
    const respuestaCorrecta = Math.max(...datosAleatorios);

    setTablaDatos(
      datosAleatorios.map((valor, index) => ({
        partido: `Partido ${index + 1}`,
        goles: valor,
      }))
    );

    // Ajusta la pregunta en base a los partidos con más goles
    const pregunta = `¿En cuál de los partidos se anotaron más goles?`;

    setPregunta(pregunta);
    setRespuestaCorrecta(respuestaCorrecta);
  }, []);

  const handleOptionClick = (opcion) => {
    setSelectedOption(opcion);

    if (opcion === respuestaCorrecta) {
      setMessage("¡Correcto!");
      setMessageColor("text-green-500");
      setContadorRespuestasCorrectasSeguidas(
        contadorrespuestasCorrectasSeguidas + 1
      );

      // Generar nuevos datos aleatorios para la tabla
      const nuevosDatosAleatorios = generateUniqueRandomOptions(0, 6, 5);

      setTablaDatos(
        nuevosDatosAleatorios.map((valor, index) => ({
          partido: `Partido ${index + 1}`,
          goles: valor,
        }))
      );

      // Actualiza la respuesta correcta para la nueva configuración
      const nuevaRespuestaCorrecta = Math.max(...nuevosDatosAleatorios);
      setRespuestaCorrecta(nuevaRespuestaCorrecta);
    } else {
      setMessage("Inténtalo de nuevo.");
      setMessageColor("text-red-500");
    }

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      setSelectedOption(null);
    }, 2000);
  };

  return (
    <div className="bg-blue-200">
      <Cabecera />

      <div className={`min-h-screen ${showMessage ? "hidden" : ""}`}>
        <div
          className="text-gray-900 py-8 text-center mt-10"
          style={{ backgroundColor: "#ADFFFF" }}
        >
          <h1 className="text-3xl font-semibold">
            Ejercicio 1: Tabla Pictórica comprensión de datos
          </h1>
        </div>

        <div className="relative">
          <BotonVolver direccion="/unidad/1/listaEjercicios" />
        </div>
        <div className="relative mr-52">
          <ContRespCorrectas contador={contadorrespuestasCorrectasSeguidas} />
        </div>

        <div className="container mx-auto mt-8 p-4 text-center">
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                speakText("Escoge una respuesta.");
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded-full mb-2 mr-1 flex items-center"
            >
              <GiBugleCall className="text-xl" />
            </button>

            <h2 className="text-2xl font-semibold mb-4">Instrucciones</h2>
          </div>
          <h3 className="text-xl">Observa la tabla y responde:</h3>

          <table className="table-auto mx-auto mt-4 border border-blue-500">
            <thead>
              <tr>
                <th className="border border-blue-500 px-4 py-2">
                  Número de Partido
                </th>
                <th className="border border-blue-500 px-4 py-2">
                  Cantidad de Goles
                </th>
              </tr>
            </thead>
            <tbody>
              {tablaDatos.map((fila, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-blue-100" : "bg-white"
                  } text-center`}
                >
                  <td className="border border-blue-500 px-4 py-2">
                    {fila.partido}
                  </td>
                  <td className="border border-blue-500 px-4 py-2">
                    {Array.from({ length: fila.goles }).map((_, i) => (
                      <img
                        key={i}
                        src={pelotaFutbol}
                        alt="Pelota de Fútbol"
                        className="w-6 h-6 inline-block"
                      />
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-xl mt-4">{pregunta}</h3>
          <div className="flex justify-center items-center">
            {tablaDatos.map((opcion) => (
              <button
                key={opcion.partido}
                onClick={() => handleOptionClick(opcion.goles)}
                className={`bg-blue-500 text-white py-2 px-4 rounded-full m-4 flex items-center ${
                  selectedOption === opcion.goles ? "opacity-70" : ""
                }`}
              >
                <span className="mr-2">{opcion.partido}</span>
              </button>
            ))}
          </div>
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

function generateUniqueRandomOptions(min, max, count) {
  const options = new Set();
  while (options.size < count) {
    options.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(options);
}
