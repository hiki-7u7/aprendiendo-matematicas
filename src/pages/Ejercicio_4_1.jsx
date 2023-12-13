import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { BotonVolver } from "../components/BotonVolver";
import { ContRespCorrectas } from "../components/ContRespCorrectas";
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

export function Ejercicio_4_1() {
  const [pregunta, setPregunta] = useState("");
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageColor, setMessageColor] = useState(null);
  const [imagenCorta, setImagenCorta] = useState(null);
  const [imagenLarga, setImagenLarga] = useState(null);
  const [nombreLarga, setNombreLarga] = useState();
  const [nombreCorta, setNombreCorta] = useState();
  const [ejerciciosRegistrados, setEjerciciosRegistrados] = useState([]); //valor de ejercicios registrados por el estudiante

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
    } else if (respuestasCorrectas >= 2 && opcion === opcionCorrecta) {
      setMessage("🎊👍¡Ejercicio completado!🎉✨");
      speakText("¡Ejercicio completado!");
      setMessageColor("text-blue-500");
      obtenerEjercicios();

      if (respuestasCorrectas === 2) {
        setRespuestasCorrectas(respuestasCorrectas + 1);

        setTimeout(() => {
          navegar("/siguiente_actividad");
        }, 2000);
      }
    } else {
      setMessage("Vuelve a intentarlo");
      speakText("Vuelve a intentarlo");
      setMessageColor("text-red-500");
    } /* 
    if (respuestasCorrectas < 3) {
      presentarNuevaPregunta();
    } */

    setTimeout(() => {
      setMessage(null);
      setSelectedOption(null);
    }, 2000);

    /*  if (respuestasCorrectas >= 2 && opcion === opcionCorrecta) {
      setMessage("🎊👍¡Ejercicio completado!🎉✨");
      speakText("¡Ejercicio completado!");
      setMessageColor("text-blue-500");
      setRespuestasCorrectas(respuestasCorrectas + 1);

      setTimeout(() => {
        navegar("/siguiente_actividad");
      }, 2000);
    }
    if (respuestasCorrectas < 3) {
      presentarNuevaPregunta();
    } */
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
      where("orden", "==", 4)
    );
    const queryUnidades2 = await getDocs(qUnidades);
    const unidades = queryUnidades2.docs.map((doc) => doc.data()); // obtengo el progreso del estudiante
    const unidadesId = queryUnidades2.docs.map((doc) => doc.id); // obtengo el id del progreso del estudiante

    const idUnidad = unidades[0].id; // obtengo el id de la unidad

    console.log("id de la unidad", idUnidad);
    console.log("Parte 2"); // obtengo el progreso del estudiante

    const qEjercicios = query(
      collection(db, "Ejercicios"),
      where("orden", "==", 1),
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

  return (
    <div className="bg-blue-200">
      <Cabecera />
      <div className="relative top-32">
        <BotonVolver direccion="/unidad/4/listaEjercicios_21" />
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
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                speakText(pregunta);
              }}
              className="bg-blue-500 hover:bg-white hover:text-black text-white py-2 px-4 rounded-full mb-2 mr-1 flex items-center"
            >
              <GiBugleCall className="text-xl" />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Instrucciones</h2>
          </div>
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
                    className="rounded-lg hover:bg-white hover:border-4 hover:border-blue-600"
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
                    className="rounded-lg hover:bg-white hover:border-4 hover:border-blue-600"
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
