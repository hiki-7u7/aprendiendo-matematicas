import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import cuboAzul from "../assets/img/icono_cubo_unidad.png";
import cuboVerde from "../assets/img/icono_cubo2_unidad.png";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";

export function Ejercicio_1_29() {
  const [numero, setNumero] = useState(generateRandomNumber());
  const [cubosSoltadosZona1, setCubosSoltadosZona1] = useState([]);
  const [cubosSoltadosZona2, setCubosSoltadosZona2] = useState([]);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");
  const [respuestasCorrectasSeguidas, setRespuestasCorrectasSeguidas] =
    useState(0);

  var totalCubos = cubosSoltadosZona1.length + cubosSoltadosZona2.length;

  function generateRandomNumber() {
    return Math.floor(Math.random() * 9) + 2; // Número entre 2 y 10
  }

  useEffect(() => {
    setNumero(generateRandomNumber());
  }, []);

  const handleLimpiar = () => {
    setCubosSoltadosZona1([]);
    setCubosSoltadosZona2([]);
    setRespuestaCorrecta(null);
    setMensajeRespuesta("");
    setNumero(generateRandomNumber());
  };

  const handleComprobarRespuesta = () => {
    if (
      totalCubos === numero &&
      cubosSoltadosZona1.length > 0 &&
      cubosSoltadosZona2.length > 0
    ) {
      setRespuestaCorrecta(true);
      setMensajeRespuesta("¡Respuesta correcta!");
      setRespuestasCorrectasSeguidas(respuestasCorrectasSeguidas + 1);
      setTimeout(() => {
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

  /* const handleSoltarCuboZona1 = () => {
    if (cubosSoltadosZona1.length < numero / 2) {
      setCubosSoltadosZona1([...cubosSoltadosZona1, cuboAzul]);
    }
  };

  const handleSoltarCuboZona2 = () => {
    if (cubosSoltadosZona2.length < numero / 2) {
      setCubosSoltadosZona2([...cubosSoltadosZona2, cuboVerde]);
    }
  }; */

  const handleSoltarCuboZona1 = () => {
    if (
      (cubosSoltadosZona1.length >= cubosSoltadosZona2.length &&
        totalCubos < numero &&
        cubosSoltadosZona1.length < numero - 1) ||
      (cubosSoltadosZona1.length <= cubosSoltadosZona2.length &&
        totalCubos < numero &&
        cubosSoltadosZona1.length < numero - 1)
    ) {
      setCubosSoltadosZona1([...cubosSoltadosZona1, cuboAzul]);
    } /*  else if (totalCubos <= numero && cubosSoltadosZona2.length == 1) {
      setCubosSoltadosZona1([...cubosSoltadosZona1, cuboAzul]);
    } */
  };

  const handleSoltarCuboZona2 = () => {
    if (
      (cubosSoltadosZona2.length <= cubosSoltadosZona1.length &&
        totalCubos < numero &&
        cubosSoltadosZona2.length < numero - 1) ||
      (cubosSoltadosZona2.length >= cubosSoltadosZona1.length &&
        totalCubos < numero &&
        cubosSoltadosZona2.length < numero - 1)
    ) {
      setCubosSoltadosZona2([...cubosSoltadosZona2, cuboVerde]);
    } /*  else if (totalCubos <= numero && cubosSoltadosZona1.length == 1) {
      setCubosSoltadosZona2([...cubosSoltadosZona2, cuboVerde]);
    } */
  };

  return (
    <div className="bg-blue-200">
      <Cabecera />

      <div className="min-h-screen">
        <div
          className="text-gray-900 py-8 text-center"
          style={{ backgroundColor: "#FF5C5C" }}
        >
          <h1 className="text-3xl font-semibold mt-12">
            Ejercicio 9: Descomponer Números utilizando cubos
          </h1>
        </div>
        <div className="relative">
          <BotonVolver direccion="/unidad/1/listaEjercicios" />
        </div>
        <div className="relative mr-52">
          <ContRespCorrectas contador={respuestasCorrectasSeguidas} />
        </div>

        <div className="container mx-auto mt-6 p-4 text-center">
          <h2 className="text-2xl font-semibold">
            Descomponer el {/* número {numero} */}
          </h2>

          <div className="mb-8">
            <div className="flex items-center justify-center px-3">
              <p className="text-3xl  bg-white rounded-xl  px-3">
                Número: {numero}
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <div className="cubos-zona flex flex-row">
                {Array.from({ length: numero / 2 }, (_, i) => (
                  <img
                    key={`cubo-${i}`}
                    src={cuboAzul}
                    alt="cubo azul"
                    className="w-16 h-16 mx-2 cursor-pointer"
                    onClick={handleSoltarCuboZona1}
                  />
                ))}
              </div>
              <div className="cubos-zona flex flex-row">
                {Array.from({ length: numero / 2 }, (_, i) => (
                  <img
                    key={`cubo-${i}`}
                    src={cuboVerde}
                    alt="cubo verde"
                    className="w-16 h-16 mx-2 cursor-pointer"
                    onClick={handleSoltarCuboZona2}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  handleSoltarCuboZona1();
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
                {cubosSoltadosZona1.map((cubo, index) => (
                  <img
                    key={index}
                    src={cuboAzul}
                    alt="cubo azul"
                    className="w-16 h-16 mx-2"
                  />
                ))}
              </div>
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  handleSoltarCuboZona2();
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
                {cubosSoltadosZona2.map((cubo, index) => (
                  <img
                    key={index}
                    src={cuboVerde}
                    alt="cubo verde"
                    className="w-16 h-16 mx-2"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-3">
            <p className="text-4xl bg-white rounded-xl text-red-600 px-2 font-semibold">
              Total de Cubos: {totalCubos}
            </p>
          </div>

          <button
            onClick={() => handleLimpiar()}
            className="bg-red-500 text-white py-2 px-4 rounded-full mx-2 mt-4"
          >
            Limpiar
          </button>
          <button
            onClick={() => handleComprobarRespuesta()}
            className="bg-green-500 text-white py-2 px-4 rounded-full mx-2 mt-4"
            /* disabled={
              cubosSoltadosZona1.length === numero / 2 &&
              cubosSoltadosZona2.length === numero / 2
            } */
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
