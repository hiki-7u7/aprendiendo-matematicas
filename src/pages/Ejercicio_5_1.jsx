import React, { useState, useEffect } from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { BotonVolver } from "../components/BotonVolver";
import { GiBugleCall } from "react-icons/gi";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import pelotaFutbol from "../assets/img/icono_pelotaFutbol.png";
import { ContRespCorrectas } from "../components/ContRespCorrectas";
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

function speakText(text, rate = 1) {
  const synth = window.speechSynthesis; // Obtener la síntesis de voz
  const utterance = new SpeechSynthesisUtterance(text); // Crear un nuevo objeto de síntesis de voz
  utterance.rate = rate; // Establecer la velocidad de la voz

  // Detener cualquier síntesis de voz anterior
  synth.cancel();

  synth.speak(utterance); // Reproducir el texto
}

export function Ejercicio_5_1() {
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
  const [ejerciciosRegistrados, setEjerciciosRegistrados] = useState([]); //valor de ejercicios registrados por el estudiante

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

    if (
      opcion === respuestaCorrecta &&
      contadorrespuestasCorrectasSeguidas < 2
    ) {
      setMessage("¡Correcto!");
      setMessageColor("text-green-500");
      speakText("¡Correcto!");
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
    } else if (
      opcion === respuestaCorrecta &&
      contadorrespuestasCorrectasSeguidas >= 2
    ) {
      speakText("Ejercicio completado");
      setShowMessage(true);
      setMessage("🎊👍¡Ejercicio completado!🎉✨");
      setMessageColor("text-blue-500");
      obtenerEjercicios();
      if (contadorrespuestasCorrectasSeguidas == 2) {
        setContadorRespuestasCorrectasSeguidas(
          contadorrespuestasCorrectasSeguidas + 1
        );
        setTimeout(() => {
          navegar("/unidad/5/listaEjercicios_22");
          speakText("");
        }, 2000);
      }
    } else {
      setMessage("Vuelve a intentarlo.");
      setMessageColor("text-red-500");
      speakText("Vuelve a intentarlo.");
      setContadorRespuestasCorrectasSeguidas(
        contadorrespuestasCorrectasSeguidas
      );
    }

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
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
      where("orden", "==", 5)
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
          <BotonVolver direccion="/unidad/5/listaEjercicios_22" />
        </div>
        <div className="relative mr-52">
          <ContRespCorrectas contador={contadorrespuestasCorrectasSeguidas} />
        </div>

        <div className="container mx-auto mt-8 p-4 text-center">
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                speakText("observa la tabla y responde:");
              }}
              className="bg-blue-500 hover:bg-white hover:text-black text-white py-2 px-4 rounded-full mb-2 mr-1 flex items-center"
            >
              <GiBugleCall className="text-xl" />
            </button>

            <h2 className="text-2xl font-semibold mb-4">Instrucciones</h2>
          </div>
          <h3 className="text-xl">Observa la tabla y responde:</h3>

          <div className="flex justify-center items-center">
            <img
              key={1}
              src={pelotaFutbol}
              alt="Pelota de Fútbol"
              className="w-10 h-10 inline-block m-2"
            />
            <h1 className="text-5xl mb-2 "> = </h1>
            <h1 className="text-3xl ml-2 mb-1 "> 1 gol </h1>
          </div>

          <table className="table-auto mx-auto mt-4 border border-blue-500">
            <thead>
              <tr>
                <th className="border border-blue-500 px-4 py-2 text-xl">
                  Partidos
                </th>
                <th className="border border-blue-500 px-4 py-2  text-xl">
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
                  <td className="border border-blue-500 px-4 py-2 text-lg">
                    {fila.partido}
                  </td>
                  <td className="border border-blue-500 px-4 py-2">
                    {Array.from({ length: fila.goles }).map((_, i) => (
                      <img
                        key={i}
                        src={pelotaFutbol}
                        alt="Pelota de Fútbol"
                        className="w-10 h-10 inline-block"
                      />
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                speakText(" en cuál de los partidos se anotaron más goles? ");
              }}
              className="bg-blue-500 hover:bg-white hover:text-black text-white py-2 px-4 rounded-full mt-5 mr-1 flex items-center"
            >
              <GiBugleCall className="text-xl" />
            </button>

            <h3 className="text-xl mt-4">{pregunta}</h3>
          </div>
          <div className="flex justify-center items-center">
            {tablaDatos.map((opcion) => (
              <button
                key={opcion.partido}
                onClick={() => handleOptionClick(opcion.goles)}
                className={`bg-blue-500 hover:bg-white hover:text-black text-white text-xl py-2 px-2 rounded-full m-3 ${
                  selectedOption === opcion.goles ? "opacity-70" : ""
                }`}
              >
                <span className="mr-2 text-center">{opcion.partido}</span>
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
