import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import imgManzana from "../assets/img/manzana_1.png";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";

function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1; // Generar un número aleatorio entre 1 y 10
}

export function Ejercicio_1_4() {
  const [numero, setNumero] = useState(generateRandomNumber()); // Número a componer/descomponer
  const [manzanasMostradas, setManzanasMostradas] = useState([]);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");
  const [respuestasCorrectasSeguidas, setRespuestasCorrectasSeguidas] =
    useState(0);

  useEffect(() => {
    // Generar 10 manzanas para mostrar en pantalla al inicio
    const nuevasManzanasMostradas = Array.from(
      { length: 10 },
      (_, index) => `manzana-${index + 1}`
    );
    setManzanasMostradas(nuevasManzanasMostradas);
  }, []);

  const handleLimpiar = () => {
    setRespuestaCorrecta(null);
    setMensajeRespuesta("");
    setNumero(generateRandomNumber());
  };

  const esRespuestaCorrecta = () => {
    return manzanasMostradas.length === numero;
  };

  const handleComprobarRespuesta = () => {
    if (esRespuestaCorrecta()) {
      setRespuestaCorrecta(true);
      setMensajeRespuesta("¡Respuesta correcta!");
      setRespuestasCorrectasSeguidas(respuestasCorrectasSeguidas + 1);
      setTimeout(() => {
        const nuevasManzanasMostradas = Array.from(
          { length: 10 },
          (_, index) => `manzana-${index + 1}`
        );
        setManzanasMostradas(nuevasManzanasMostradas);
        handleLimpiar();
      }, 2000);
    } else {
      setRespuestaCorrecta(false);
      setMensajeRespuesta("Respuesta incorrecta, intenta de nuevo.");
      setTimeout(() => {
        const nuevasManzanasMostradas = Array.from(
          { length: 10 },
          (_, index) => `manzana-${index + 1}`
        );
        setManzanasMostradas(nuevasManzanasMostradas);
        handleLimpiar();
      }, 2000);
    }
  };

  const handleQuitarManzana = () => {
    if (manzanasMostradas.length > numero) {
      // Si hay más manzanas que el número mostrado, quita una
      const nuevasManzanasMostradas = manzanasMostradas.slice(0, -1);
      setManzanasMostradas(nuevasManzanasMostradas);
    }
  };

  return (
    <div className="bg-blue-200 min-h-screen">
      <Cabecera />

      <div className="container mx-auto mt-12 p-4 text-center">
        <div
          className="text-gray-900 py-8 text-center mt-10"
          style={{ backgroundColor: "#FF5C5C" }}
        >
          <h1 className="text-3xl font-semibold">
            Ejercicio 10: Descomponer Números utilizando manzanas
          </h1>
        </div>
        <h2 className="text-2xl font-semibold">
          Descomponer el número {numero}
        </h2>
        <div className="relative">
          <BotonVolver direccion="/unidad/1/listaEjercicios" />
        </div>

        <div className="fixed top-16 right-56 ">
          <ContRespCorrectas contador={respuestasCorrectasSeguidas} />
        </div>

        <div className="mb-8">
          <p className="text-3xl mb-6">
            Borra las manzanas hasta llegar al numero: {numero}
          </p>
          <div className="flex flex-wrap justify-center">
            {manzanasMostradas.map((manzana, index) => (
              <img
                key={index}
                src={imgManzana}
                alt={manzana}
                className="w-16 h-16 mx-2 cursor-pointer"
                onClick={() => handleQuitarManzana()}
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
  );
}
