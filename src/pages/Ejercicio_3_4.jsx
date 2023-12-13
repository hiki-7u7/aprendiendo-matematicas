import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";
import circulo from "../assets/img/icono_circulo.png";
import cuadrado from "../assets/img/icono_cuadrado.png";
import rectangulo from "../assets/img/icono_rectangulo.png";
import rombo from "../assets/img/icono_rombo.png";
import triangulo from "../assets/img/icono_triangulo.png";
import ovalo from "../assets/img/icono_ovalo.png";
import { GiBugleCall } from "react-icons/gi";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const figuras = [
  { imagen: circulo, nombre: "Círculo", color: "#3498DB" },
  { imagen: cuadrado, nombre: "Cuadrado", color: "#A569BD" },
  { imagen: rectangulo, nombre: "Rectángulo", color: "#F4D03F" },
  { imagen: rombo, nombre: "Rombo", color: "#E74C3C" },
  { imagen: triangulo, nombre: "Triángulo", color: "#52BE80" },
  { imagen: ovalo, nombre: "Óvalo", color: "#E67E22" },
];

function speakText(text, rate = 1) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  synth.cancel();
  synth.speak(utterance);
}

function generateRandomNumber() {
  return Math.floor(Math.random() * figuras.length);
}

export function Ejercicio_3_4() {
  const [randomFiguraIndex, setRandomFiguraIndex] = useState(
    generateRandomNumber()
  );
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [ejerciciosRegistrados, setEjerciciosRegistrados] = useState([]); //valor de ejercicios registrados por el estudiante

  const navegar = useNavigate();
  const { user } = useAuth();

  const figuraActual = figuras[randomFiguraIndex];
  const opcionesActuales = figuras.map((figura) => figura.imagen);
  const respuestaCorrecta = figuraActual.imagen;

  useEffect(() => {
    /* speakText(`¿Cuál es la imagen del "${figuraActual.nombre}"?`); */
  }, [randomFiguraIndex, figuraActual]);

  const handleOptionClick = (option, color) => {
    setSelectedOption(option);

    if (option === respuestaCorrecta && respuestasCorrectas < 2) {
      setRandomFiguraIndex(generateRandomNumber());
      setRespuestasCorrectas(respuestasCorrectas + 1);
      setMessage("Correcto");
      setMessageColor("text-green-500");
      speakText("Correcto");
    } else if (option === respuestaCorrecta && respuestasCorrectas >= 2) {
      setMessage("🎊👍¡Ejercicio completado!🎉✨");
      setMessageColor("text-blue-500");
      speakText("¡Ejercicio completado!");
      obtenerEjercicios();
      setRespuestasCorrectas(respuestasCorrectas + 1);

      setTimeout(() => {
        navegar("/unidad/3/listaEjercicios_19"); // Reemplaza con la ruta correcta  /unidad/3/listaEjercicios_19
      }, 2000);
    } else {
      setMessage("Vuelve a intentarlo.");
      setMessageColor("text-red-500");
      speakText("Vuelve a intentarlo");
    }

    // Espera 2 segundos y luego cambia la figura y el mensaje

    // Agrega la lógica para registrar el progreso del estudiante y navegar a la siguiente actividad.

    setTimeout(() => {
      setMessage(null);
      setSelectedOption(null);
    }, 2000);
  };

  //FUNCIONES PARA OBTENER LOS EJERCICIOS Y ACTUALIZAR EL PROGRESO DEL ESTUDIANTE
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
    console.log("Parte 1"); // obtengo el progreso del estudiante
    const EstudianteID = user.uid; // obtengo el id del estudiante

    const listaEjerReg = unidadesEstudiante[0].idEjercicios; // obtengo el progreso de las unidades del estudiante

    setEjerciciosRegistrados(listaEjerReg); // obtengo el progreso de los ejercicios del estudiante

    console.log("ejercicios registrados", ejerciciosRegistrados);

    const qUnidades = query(
      collection(db, "Unidades"),
      where("orden", "==", 3)
    );
    const queryUnidades2 = await getDocs(qUnidades);
    const unidades = queryUnidades2.docs.map((doc) => doc.data()); // obtengo el progreso del estudiante
    const unidadesId = queryUnidades2.docs.map((doc) => doc.id); // obtengo el id del progreso del estudiante

    const idUnidad = unidades[0].id; // obtengo el id de la unidad

    console.log("id de la unidad", idUnidad);
    console.log("Parte 2"); // obtengo el progreso del estudiante

    const qEjercicios = query(
      collection(db, "Ejercicios"),
      where("orden", "==", 4),
      where("unidadesId", "==", idUnidad)
    );

    const queryEjercicios = await getDocs(qEjercicios);
    const ejerciciosDoc = queryEjercicios.docs.map((doc) => doc.data()); // obtengo el progreso del estudiante */
    const ejerciciosId = queryEjercicios.docs.map((doc) => doc.id); // obtengo el id del progreso del estudiante

    const idEjercicio = ejerciciosDoc[0].id; // obtengo el id del ejercicio

    console.log("id del ejercicio", ejerciciosDoc[0].id);
    console.log("Parte 3"); // obtengo el progreso del estudiante

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

    if (!ejerciciosRegistrados.includes(idEjercicio)) {
      /* var lista = [];
    lista = lista.concat; */
      ejerciciosRegistrados.push(idEjercicio);

      console.log("ejercicios registrados", ejerciciosRegistrados);
      console.log("Parte 4");

      await updateDoc(progresoEstudianteRefId, {
        idEjercicios: arrayUnion(idEjercicio),
      });

      console.log("ejercicios registrados", ejerciciosRegistrados);
      console.log("ejercicio registrado correctamente");

      const q2 = query(collection(db, "Ejercicios"));
      const querySnapshot2 = await getDocs(q2);
      const ejercicios = querySnapshot2.docs.map((doc) => doc.data()); // obtengo el progreso del estudiante

      console.log("Total de ejercicios:", ejercicios.length); // obtengo el progreso del estudiante

      //
      console.log("id del estudiante MIRAR:", user.uid);
      const q3 = query(
        collection(db, "Estudiante"),
        where("id", "==", user.uid)
      );

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
      console.log("Ejercicio registrado correctamente.");
    } else {
      console.log("El ejercicio ya ha sido registrado");
      console.log("progreso actual ", nuevoProgreso2);
    }
  };

  // speakText(`¿Cuál es la imagen del "${figuraActual.nombre}"?`);

  return (
    <div className="bg-blue-200">
      <Cabecera />
      <div className="relative top-32">
        <BotonVolver direccion="/unidad/3/listaEjercicios_19" />
      </div>
      <div className="relative top-32 right-52">
        <ContRespCorrectas contador={respuestasCorrectas} />
      </div>
      <div className="min-h-screen">
        <div
          className="text-gray-900 py-8 text-center mt-10"
          style={{ backgroundColor: "#FFFF70" }}
        >
          <h1 className="text-3xl font-semibold">
            Ejercicio 4: Reconocer imagen de las Figuras Geométricas 2D
          </h1>
        </div>
        <div className="container mx-auto mt-8 p-4 text-center">
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                speakText(`¿Cuál es la imagen del "${figuraActual.nombre}"?`);
              }}
              className="bg-blue-500 hover:bg-white hover:text-black text-white py-2 px-4 rounded-full mb-2 mr-1 flex items-center"
            >
              <GiBugleCall className="text-xl" />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Instrucciones</h2>
          </div>

          <h3 className="text-3xl mb-4">
            ¿Cuál es la imagen del{" "}
            <span className="text-4xl mb-4 font-semibold bg-white rounded-lg">
              "{figuraActual.nombre}"
            </span>
            ?
          </h3>
          <div className="options">
            {opcionesActuales.map((opcion, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(opcion, figuras[index].color)}
                onMouseEnter={() => setHoveredOption(opcion)} // Agrega el evento onMouseEnter
                onMouseLeave={() => setHoveredOption(null)} // Agrega el evento onMouseLeave
                className="px-4 rounded-lg"
              >
                <img
                  src={opcion}
                  alt="Opción"
                  style={{
                    width: "100px",
                    backgroundColor: figuras[index].color,
                    background:
                      hoveredOption === opcion
                        ? "transparent linear-gradient(180deg, #FFFFFF 0%, #FFFFFF00 100%)"
                        : `${figuras[index].color}`, // Agrega la lógica para cambiar el color de fondo cuando el mouse está sobre la opción
                  }}
                  className="rounded-lg"
                />
              </button>
            ))}
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
