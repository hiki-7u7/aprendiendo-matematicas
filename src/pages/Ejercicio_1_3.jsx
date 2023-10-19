import React, { useState } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import cuboAzul from "../assets/img/icono_cubo_unidad.png";
import cuboVerde from "../assets/img/icono_cubo2_unidad.png";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";

export function Ejercicio_1_3() {
  const [numero, setNumero] = useState(generateRandomNumber());
  const [cubosSoltados, setCubosSoltados] = useState([]);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");
  const [respuestasCorrectasSeguidas, setRespuestasCorrectasSeguidas] =
    useState(0);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 9) + 2; // Número entre 2 y 10
  }

  const handleLimpiar = () => {
    setCubosSoltados([]);
    setRespuestaCorrecta(null);
    setMensajeRespuesta("");
  };
  const esRespuestaCorrecta = () => {
    const numAzules = cubosSoltados.filter((cubo) => cubo === cuboAzul).length;
    const numVerdes = cubosSoltados.filter((cubo) => cubo === cuboVerde).length;

    // La condición verifica que haya al menos un cubo de cada color
    return numAzules > 0 && numVerdes > 0 && numAzules + numVerdes === numero;
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

  const handleSoltarCubo = (cubo) => {
    const numAzules = cubosSoltados.filter((c) => c === cuboAzul).length;
    const numVerdes = cubosSoltados.filter((c) => c === cuboVerde).length;

    if (
      cubo === cuboAzul &&
      numAzules <= numero &&
      contadorCubosTotales < numero &&
      numAzules < numero - 1
    ) {
      setCubosSoltados([...cubosSoltados, cubo]);
    } else if (
      cubo === cuboVerde &&
      numVerdes <= numero &&
      contadorCubosTotales < numero &&
      numVerdes < numero - 1
    ) {
      setCubosSoltados([...cubosSoltados, cubo]);
    }
  };

  const contarCubosAzules = cubosSoltados.filter(
    (cubo) => cubo === cuboAzul
  ).length;
  const contarCubosVerdes = cubosSoltados.filter(
    (cubo) => cubo === cuboVerde
  ).length;

  const contadorCubosTotales = contarCubosAzules + contarCubosVerdes;

  return (
    <div className="bg-blue-200">
      <Cabecera />

      <div className="min-h-screen">
        <div
          className="text-gray-900 py-8 text-center"
          style={{ backgroundColor: "#FF5C5C" }}
        >
          <h1 className="text-3xl font-semibold mt-12">
            Ejercicio 7: Componer Números utilizando cubos
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
            Componer el {/* número {numero} */}
          </h2>

          <div className="mb-8">
            <div className="flex items-center justify-center px-3">
              <p className="text-3xl  bg-white rounded-xl  px-3">
                Número: {numero}
              </p>
            </div>

            <div className="flex justify-center mt-4">
              {Array.from({ length: numero / 2 }, (_, i) => (
                <img
                  key={`cuboAzul-${i}`}
                  src={cuboAzul}
                  alt="cubo azul"
                  className="w-16 h-16 mx-2 cursor-pointer"
                  onDragStart={() => handleSoltarCubo(cuboAzul)}
                />
              ))}
              {Array.from({ length: numero / 2 }, (_, i) => (
                <img
                  key={`cuboVerde-${i}`}
                  src={cuboVerde}
                  alt="cubo verde"
                  className="w-16 h-16 mx-2 cursor-pointer"
                  onDragStart={() => handleSoltarCubo(cuboVerde)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div
              onDrop={(e) => {
                e.preventDefault();
                const data = e.dataTransfer.getData("text/plain");
                handleSoltarCubo(data);
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
              {cubosSoltados.map((cubo, index) => (
                <img
                  key={index}
                  src={cubo === cuboAzul ? cuboAzul : cuboVerde}
                  alt={cubo}
                  className="w-16 h-16 mx-2"
                />
              ))}
              <div className="flex bottom-0">
                <p className="mx-2 text-2xl">
                  Cubos Azules: {contarCubosAzules}
                </p>
                <p className="mx-2 text-2xl">
                  Cubos Verdes: {contarCubosVerdes}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-3">
            <p className="text-4xl bg-white rounded-xl text-red-600 px-2 font-semibold">
              Total de Cubos: {contadorCubosTotales}
            </p>
          </div>

          {/* <button
            onClick={() => handleLimpiar()}
            className="bg-red-500 text-white py-2 px-4 rounded-full mx-2 mt-4"
          >
            Limpiar
          </button> */}
          <button
            onClick={() => handleComprobarRespuesta()}
            className="bg-green-500 text-white py-2 px-4 rounded-full mx-2 mt-4"
          >
            Comprobar
          </button>

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
