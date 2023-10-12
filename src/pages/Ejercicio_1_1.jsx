import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import perro from "../assets/img/icono_perro.png";
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
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";
import { GiBugleCall } from "react-icons/gi"; // Icono de audio
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const n = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]; // Arreglo de imágenes

// Función para sintetizar voz
/* const synth = window.speechSynthesis; // API para sintetizar voz (Text-to-Speech) */
function speakText(text, rate = 1) {
  const synth = window.speechSynthesis; // Obtener la síntesis de voz
  const utterance = new SpeechSynthesisUtterance(text); // Crear un nuevo objeto de síntesis de voz
  utterance.rate = rate; // Establecer la velocidad de la voz

  // Detener cualquier síntesis de voz anterior
  synth.cancel();

  synth.speak(utterance); // Reproducir el texto
}

// Función para generar un número aleatorio entre 1 y 10
function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

export function Ejercicio_1_1() {
  const [randomNumbers, setRandomNumbers] = useState([]); // Números aleatorios
  const [selectedImages, setSelectedImages] = useState([]); // Imágenes seleccionadas
  const [selectedNumber, setSelectedNumber] = useState(null); // Número seleccionado
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null); // Respuesta correcta
  const [message, setMessage] = useState(null); //  estado para el mensaje
  const [messageColor, setMessageColor] = useState(null); // Nueva variable de estado para el color del mensaje
  const [showMessage, setShowMessage] = useState(false); // Nuevo estado para mostrar el mensaje
  const [respuestasCorrectasSeguidas, setRespuestasCorrectasSeguidas] =
    useState(0); // Nueva variable de estado para el contador de respuestas correctas seguidas
  const [showOptions, setShowOptions] = useState(false); // Nuevo estado para mostrar las opciones

  const navegar = useNavigate();

  const { user } = useAuth(); //user.id para obtener el id del usuario

  const [ejerciciosRegistrados, setEjerciciosRegistrados] = useState([]); // Nueva variable de estado para los ejercicios registrados

  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const newRandomNumbers = Array.from(
      { length: generateRandomNumber() },
      (_, i) => i + 1
    );
    setRandomNumbers(newRandomNumbers);
  }, []);

  const RevisarRespuesta = () => {
    if (
      selectedNumber === randomNumbers.length &&
      selectedImages.length === randomNumbers.length &&
      respuestasCorrectasSeguidas < 3
    ) {
      setRespuestaCorrecta(true); // Respuesta correcta
      setMessage("Correcto");
      setMessageColor("text-green-500"); // Establecer el color del mensaje como verde
      speakText("Correcto");
      console.log("ejercicio correcto");

      setRespuestasCorrectasSeguidas(respuestasCorrectasSeguidas + 1); // Incrementa el contador si es correcto
      if (respuestasCorrectasSeguidas <= 2) {
        setTimeout(() => {
          speakText("Selecciona las imágenes y cuenta cuántas hay.");
        }, 2000);
      }
      /*  if (respuestasCorrectasSeguidas <= 2) {
        
      } */
    } /* else if (respuestasCorrectasSeguidas > 2) {
      console.log("terminar ejercicio");
    } */ else {
      setRespuestaCorrecta(false); // Respuesta incorrecta
      setMessage("Vuelve a intentarlo.");
      setMessageColor("text-red-500"); // Establecer el color del mensaje como rojo
      speakText("Vuelve a intentarlo.");
      console.log("terminar debo repetir el ejercicio");

      setRespuestasCorrectasSeguidas(respuestasCorrectasSeguidas); // si es incorrecto, no incrementa el contador

      setTimeout(() => {
        speakText("Selecciona las imágenes y cuenta cuántas hay.");
      }, 2000);
    }

    setShowMessage(true);

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);

    if (
      selectedNumber === randomNumbers.length &&
      selectedImages.length === randomNumbers.length &&
      respuestasCorrectasSeguidas >= 2
    ) {
      // Terminar el ejercicio cuando se alcanzan 3 respuestas correctas seguidas

      setMessage("🎊👍¡Ejercicio completado!🎉✨");
      speakText("¡Ejercicio completado!");
      setMessageColor("text-green-500");
      obtenerEjercicios();
      setTimeout(() => {
        navegar("/unidad/1/listaEjercicios");
        speakText("");
      }, 2000);
    }
  };

  useEffect(() => {
    if (respuestaCorrecta === true) {
      // Si la respuesta es correcta, genera nuevos números
      const newRandomNumbers = Array.from(
        { length: generateRandomNumber() },
        (_, i) => i + 1
      );
      setRandomNumbers(newRandomNumbers);
    }

    setSelectedImages([]);
    setSelectedNumber(null);
    setRespuestaCorrecta(null); // Reiniciar el estado de respuesta
  }, [respuestaCorrecta]);

  useEffect(() => {
    if (showMessage) {
      // Si el mensaje está visible, ocultar las opciones
      setShowOptions(false);
    }
  }, [showMessage]);

  //FUNCIONES PARA OBTENER LOS EJERCICIOS
  const obtenerEjercicios = async () => {
    //setCargando(true); // valor de cargando en true para mostrar pantalla de carga
    //  Obtengo el progreso de las unidades del estudiante
    const qEstudiante = query(
      collection(db, "ProgresoEstudiante"),
      where("estudianteId", "==", user.uid)
    );
    const queryUnidades = await getDocs(qEstudiante);
    const unidadesEstudiante = queryUnidades.docs.map((doc) => doc.data()); // obtengo el progreso del estudiante

    console.log("id de alumno", user.uid); // obtengo el id del estudiante
    const EstudianteID = user.uid; // obtengo el id del estudiante

    const listaEjerReg = unidadesEstudiante[0].idEjercicios; // obtengo el progreso de las unidades del estudiante

    setEjerciciosRegistrados(listaEjerReg); // obtengo el progreso de los ejercicios del estudiante

    console.log("ejercicios registrados", ejerciciosRegistrados);

    const qUnidades = query(
      collection(db, "Unidades"),
      where("Orden", "==", 1)
    );
    const queryUnidades2 = await getDocs(qUnidades);
    /* const unidades = queryUnidades2.docs.map((doc) => doc.data()); // obtengo el progreso del estudiante */
    const unidadesId = queryUnidades2.docs.map((doc) => doc.id); // obtengo el id del progreso del estudiante

    const idUnidad = unidadesId[0]; // obtengo el id de la unidad

    console.log("id de la unidad", idUnidad);

    const qEjercicios = query(
      collection(db, "Ejercicios"),
      where("Orden", "==", 1),
      where("unidadesId", "==", idUnidad)
    );

    const queryEjercicios = await getDocs(qEjercicios);
    const ejerciciosDoc = queryEjercicios.docs.map((doc) => doc.data()); // obtengo el progreso del estudiante */
    const ejerciciosId = queryEjercicios.docs.map((doc) => doc.id); // obtengo el id del progreso del estudiante

    const idEjercicio = ejerciciosDoc[0].id; // obtengo el id del ejercicio

    console.log("id del ejercicio", ejerciciosDoc[0].id);

    // Actualizar el progreso del estudiante

    /* const listaEjerDisp = unidadesEstudiante.map(
      (u) => u.ejerciciosDisponibles[0].unidad_1_disponible
    ); // obtengo el progreso de las unidades del estudiante

    const listaEjerCom = unidadesEstudiante.map(
      (u) => u.ejerciciosCompletados[0].unidad_1_completado
    ); // obtengo el progreso de las unidades del estudiante

    setEjerciciosDisponibles(listaEjerDisp[0]); // obtengo el progreso de los ejercicios del estudiante
    setEjerciciosCompletados(listaEjerCom[0]); // obtengo el progreso de los ejercicios del estudiante

    console.log("ejercicios disponibles", ejerciciosDisponibles);
    console.log("ejercicios completados", ejerciciosCompletados); */

    //setCargando(false); // valor de cargando en false para mostrar pantalla de contenido

    // Actualizar el progreso del estudiante
    const progresoEstudianteRef = collection(db, "ProgresoEstudiante");
    const q = query(
      progresoEstudianteRef,
      where("estudianteId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    const progresoEstudiante = querySnapshot.docs.map((doc) => doc.data()); // obtengo el progreso del estudiante
    const progresoEstudianteId = querySnapshot.docs.map((doc) => doc.id); // obtengo el id del progreso del estudiante
    const progresoEstudianteRefId = doc(
      progresoEstudianteRef,
      progresoEstudianteId[0]
    );

    ejerciciosRegistrados.push(idEjercicio);

    console.log("ejercicios registrados", ejerciciosRegistrados);

    await updateDoc(progresoEstudianteRefId, {
      idEjercicios: [...ejerciciosRegistrados],
    });

    console.log("ejercicios registrados", ejerciciosRegistrados);
    console.log("ejercicio registrado correctamente");

    const q2 = query(collection(db, "Ejercicios"));
    const querySnapshot2 = await getDocs(q2);
    const ejercicios = querySnapshot2.docs.map((doc) => doc.data()); // obtengo el progreso del estudiante

    console.log("Total de ejercicios:", ejercicios.length); // obtengo el progreso del estudiante

    //
    console.log("id del estudiante MIRAR:", user.uid);
    const q3 = query(collection(db, "Estudiante"), where("id", "==", user.uid));

    const querySnapshot3 = await getDocs(q3);
    const estudiantes = querySnapshot3.docs.map((doc) => doc.data()); // obtengo el progreso del estudiante
    console.log("estudiantes", estudiantes);

    const estudiantesId = querySnapshot3.docs[0].id; // obtengo el id del progreso del estudiante
    console.log("estudiantesId", estudiantesId);

    const estudiantesRefId = doc(collection(db, "Estudiante"), estudiantesId);

    console.log("progreso", ejerciciosRegistrados.length);
    console.log("totalEjercicios", ejercicios.length);

    var progreso = ejerciciosRegistrados.length / ejercicios.length;
    console.log("progreso", progreso);
    progreso = progreso * 100;
    progreso = Math.round(progreso * 100) / 100;
    progreso = progreso.toFixed(0);

    console.log("progreso", progreso);
    var nuevoProgreso = progreso.toString();
    var nuevoProgreso1 = nuevoProgreso + "%";
    var nuevoProgreso2 = nuevoProgreso1.toString();
    await updateDoc(estudiantesRefId, {
      progreso: nuevoProgreso2, // actualizo el progreso del estudiante
    });

    console.log("progreso actualizado correctamente", nuevoProgreso2);
  };

  useEffect(() => {
    obtenerEjercicios();
  }, []);

  return (
    <div className="bg-blue-200">
      <Cabecera />

      <div className={`min-h-screen ${showMessage ? "hidden" : ""}`}>
        <div
          className=" text-gray-900  py-8 text-center mt-10"
          style={{ backgroundColor: "#FF5C5C" }}
        >
          <h1 className="text-3xl font-semibold">
            Ejercicio 1: Contar entre 1 al 10
          </h1>
        </div>

        <div className="relative">
          <BotonVolver direccion="/unidad/1/listaEjercicios" />
          <ContRespCorrectas contador={respuestasCorrectasSeguidas} />
        </div>

        <div className="container mx-auto mt-8 p-4 text-center">
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                speakText("Selecciona las imágenes y cuenta cuántas hay.");
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded-full mb-2 mr-1 flex items-center"
            >
              <GiBugleCall className="text-xl" />
            </button>

            <h2 className="text-2xl font-semibold mb-4">Instrucciones</h2>
          </div>
          <h3 className="text-xl">
            Selecciona las imágenes y cuenta cuántas hay.
          </h3>

          <p className="flex flex-wrap items-center justify-center text-3xl font-semibold mb-4 mt-6">
            Imágenes seleccionadas:{" "}
            <p className="ml-3 font-semibold text-4xl px-2 py-2 border-2 border-black rounded-xl bg-white text-red-600">
              {selectedImages.length}
            </p>
            {/* {selectedImages.length} */}
          </p>
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                speakText("Selecciona las imágenes.");
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded-full mb-2 mr-1 flex items-center"
            >
              <GiBugleCall className="text-xl" />
            </button>

            <h3 className="text-xl font-semibold mb-3">
              Selecciona las imágenes:
            </h3>
          </div>

          <div className="mb-6">
            {randomNumbers.map((num) => (
              <div key={num} className="inline-block mx-2">
                <img
                  src={perro}
                  alt={`${num}`}
                  className={`inline-block cursor-pointer rounded-xl ${
                    selectedImages.includes(num)
                      ? "border-4 border-blue-500 rounded-xl"
                      : ""
                  }`}
                  onClick={() => {
                    if (!selectedImages.includes(num)) {
                      const updatedImages = [...selectedImages, num];
                      setSelectedImages(updatedImages);
                      speakText(selectedImages.length + 1);
                    }
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                speakText("¿Cuántas imágenes hay?");
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded-full mb-2 mr-1 flex items-center"
            >
              <GiBugleCall className="text-xl" />
            </button>

            <h3 className="text-xl font-semibold mb-2">
              ¿Cuántas imágenes hay?
            </h3>
          </div>

          <div className="mb-4">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i + 1} className="inline-block mx-2 rounded-xl ">
                <img
                  src={n[i]}
                  alt={`${i + 1}`}
                  className={`inline-block cursor-pointer bg-white hover:bg-blue-500  rounded-xl  ${
                    selectedNumber === i + 1 ? "border-4 border-blue-500 " : ""
                  }`}
                  onClick={() => {
                    setSelectedNumber(i + 1);
                    speakText(`${i + 1}`);
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={RevisarRespuesta}
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
