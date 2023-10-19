import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { ContRespCorrectas } from "../components/ContRespCorrectas";
import img1 from "../assets/img/icono_1.png";
import img2 from "../assets/img/icono_2.png";
import img3 from "../assets/img/icono_3.png";
import img4 from "../assets/img/icono_4.png";
import img5 from "../assets/img/icono_5.png";
import img6 from "../assets/img/icono_6.png";
import img7 from "../assets/img/icono_7.png";
import img8 from "../assets/img/icono_8.png";
import img9 from "../assets/img/icono_9.png";
import img10 from "../assets/img/icono_10.png";

function speakText(text, rate = 1) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;

  // Agrega comprobaciones y registros
  if (synth.speaking) {
    synth.cancel();
    console.log("Cancelling previous speech");
  }

  synth.speak(utterance);
}

export function Ejercicio_1_10() {
  const [numeros, setNumeros] = useState([]);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dropIndex, setDropIndex] = useState(null);
  const [intentos, setIntentos] = useState(0); // Inicializamos los intentos en 0
  const navegar = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    desorganizarNumeros();
    speakText("Ordena las imágenes de menor a mayor.");
  }, []);

  const desorganizarNumeros = () => {
    const imagenes = [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
    ];
    const numerosAleatorios = shuffleArray(imagenes);
    setNumeros(numerosAleatorios);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setDraggingIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDropIndex(index);
  };

  const handleDrop = (e, index) => {
    const sourceIndex = e.dataTransfer.getData("index");
    const newNumeros = [...numeros];
    const [removed] = newNumeros.splice(sourceIndex, 1);
    newNumeros.splice(index, 0, removed);
    setNumeros(newNumeros);
    setDraggingIndex(null);
    setDropIndex(null);
  };

  const handleComprobarRespuesta = () => {
    if (
      numeros.join("") ===
      [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10].join("")
    ) {
      if (intentos < 2) {
        // Respuesta correcta, pero no se han completado los intentos
        setRespuestaCorrecta(true);
        setShowMessage(true);
        setMessage("¡Respuesta correcta!");
        setMessageColor("text-green-500");
        setIntentos(intentos + 1);

        // Reproducir el mensaje solo si no se han completado los intentos
        speakText("¡Respuesta correcta!");
        setTimeout(() => {
          setShowMessage(false);
          desorganizarNumeros();
        }, 3000);
      } else {
        // Respuesta correcta y se han completado los intentos
        setRespuestaCorrecta(true);
        setMessage("🎊👍¡Ejercicio completado! Excelente trabajo🎉✨");
        setMessageColor("text-blue-500");
        speakText("Ejercicio completado. Excelente trabajo");
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navegar("/unidad/1/listaEjercicios");
        }, 3000);
      }
    } else {
      // Respuesta incorrecta
      setRespuestaCorrecta(false);
      setMessage("¡Respuesta incorrecta! Inténtalo de nuevo.");
      setMessageColor("text-red-500");
      speakText("¡Respuesta incorrecta! Inténtalo de nuevo.");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <div className=" bg-blue-200 min-h-screen items-center justify-center">
      <Cabecera />

      <div className="relative top-24 right-52">
        <ContRespCorrectas contador={intentos} />
      </div>

      <div className={`min-h-screen ${showMessage ? "hidden" : ""}`}>
        <div
          className="text-gray-900 py-8 text-center mt-10"
          style={{ backgroundColor: "#FF5C5C" }}
        >
          <h1 className="text-3xl font-semibold">
            Ejercicio 4: Ordena de menor a mayor
          </h1>
        </div>

        <div className="container mx-auto mt-32 p-4 text-center">
          <div className="flex flex-wrap justify-center">
            {numeros.map((numero, index) => (
              <div
                key={index}
                className={`inline-block mx-2 rounded-xl ${
                  draggingIndex === index ? "bg-gray-200" : ""
                } ${dropIndex === index ? "bg-blue-600" : ""}`}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <img
                  src={numero}
                  alt={`Número ${index}`}
                  className="w-24 h-24 cursor-pointer"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleComprobarRespuesta}
            className="bg-green-500 text-white py-2 px-4 rounded-full mt-4"
          >
            Comprobar Respuesta
          </button>
        </div>
      </div>

      {showMessage && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-70 flex justify-center items-center z-10`}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <span className={`text-4xl ${messageColor}`}>{message}</span>
          </div>
        </div>
      )}

      <PieDePagina />
    </div>
  );
}
