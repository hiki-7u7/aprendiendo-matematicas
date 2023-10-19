import React from "react";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";
import { Link } from "react-router-dom";
import { BotonVolver } from "../components/BotonVolver";
import candado from "../assets/img/icono_candado.png";
import { useAuth } from "../context/authContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { GiBugleCall } from "react-icons/gi"; // Icono de audio

function speakText(text, rate = 1) {
  const synth = window.speechSynthesis; // Obtener la síntesis de voz
  const utterance = new SpeechSynthesisUtterance(text); // Crear un nuevo objeto de síntesis de voz
  utterance.rate = rate; // Establecer la velocidad de la voz

  // Detener cualquier síntesis de voz anterior
  synth.cancel();

  synth.speak(utterance); // Reproducir el texto
}

export function ListaEjercicios_2() {
  const { user } = useAuth(); //user.email para obtener el email del usuario
  const [ejerciciosCompletados, setEjerciciosCompletados] = useState([]); //valor de unidadesCompletadas
  const [ejerciciosDisponibles, setEjerciciosDisponibles] = useState([]); //valor de unidadesDisponibles

  const [ejerciciosRegistrados, setEjerciciosRegistrados] = useState([]); //valor de unidades
  const [cargando, setCargando] = useState(true); // valor de cargando en true para mostrar pantalla de carga

  const obtenerEjercicios = async () => {
    // valor de cargando en true para mostrar pantalla de carga
    //  Obtengo el progreso de las unidades del estudiante
    const qUnidades = query(
      collection(db, "ProgresoEstudiante"),
      where("estudianteId", "==", user.uid)
    );
    const queryUnidades = await getDocs(qUnidades);
    const unidadesEstudiante = queryUnidades.docs.map((doc) => doc.data()); // obtengo el progreso de las unidades del estudiante

    console.log("id de alumno", user.uid);

    console.log("unidadesEstudiante", unidadesEstudiante[0].idEjercicios);

    const listaEjerReg = unidadesEstudiante[0].idEjercicios; // obtengo el progreso de las unidades del estudiante

    console.log("listaEjerDisp: ", listaEjerReg);

    setEjerciciosRegistrados(listaEjerReg); // obtengo el progreso de los ejercicios del estudiante

    console.log("ejerciciosRegistrados_1: ", ejerciciosRegistrados);

    /*  const listaEjerCom = unidadesEstudiante.map(
      (u) => u.ejerciciosCompletados[0].unidad_1_completado
    ); // obtengo el progreso de las unidades del estudiante

    setEjerciciosDisponibles(listaEjerDisp[0]); // obtengo el progreso de los ejercicios del estudiante
    setEjerciciosCompletados(listaEjerCom[0]); // obtengo el progreso de los ejercicios del estudiante */

    const q = query(collection(db, "Ejercicios"));
    const querySnapshot = await getDocs(q);
    const ejercicios = querySnapshot.docs.map((doc) => doc.data()); // obtengo el progreso de las unidades del estudiante

    console.log("Cantidad Ejercicios: ", ejercicios.length);

    let n = 1;
    console.log("Ejercicios registrados: ", n);
    var valor = n / ejercicios.length;
    // convertir a porcentaje
    valor = valor * 100;
    // redondear el resultado
    valor = Math.round(valor * 100) / 100;
    // quitamos los decimales
    valor = valor.toFixed(0);

    console.log("valor: ", valor + "%");

    setCargando(false); // valor de cargando en false para mostrar pantalla de contenido
  };

  useEffect(() => {
    obtenerEjercicios();
  }, []);

  console.log("ejerciciosRegistrados: ", ejerciciosRegistrados);

  const VALOR = ejerciciosRegistrados.length;

  console.log("VALOR: ", VALOR);

  const ejercicios = [
    /*  {
      id: 1,
      nombre: "Ejercicio 1: Contar imagenes entre 1 al 10",
      disponible: VALOR >= 0 ? true : false, //true,
    }, */
    {
      id: 1,
      nombre: "Ejercicio 5: Reconocer nombre Figuras 3D",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
    {
      id: 2,
      nombre: "Ejercicio 6: Reconocer imagen de Figuras 3D",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
    /*{
      id: 3,
      nombre: "Ejercicio 5: Patrones del 1 al 20",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    } 
    {
      id: 2,
      nombre: "Ejercicio 4: Patrones del 1 al 10",
      disponible: VALOR >= 2 ? true : false, //false
      imagen: candado,
    },
    {
      id: 3,
      nombre: "Ejercicio 4: Multiplicación de números enteros",
      disponible: VALOR >= 3 ? true : false, //false
      imagen: candado,
    },
    {
      id: 4,
      nombre: "Ejercicio 5: División de números enteros",
      disponible: VALOR >= 4 ? true : false, //false
      imagen: candado,
    }, */
    ,
    ,
  ];

  // Lista de ejercicios de la unidad 1 video 2

  const ejercicio2 = [
    {
      id: 1,
      nombre: "Ejercicio 3:  Contar entre 1 al 20",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // Lista de ejercicios de la unidad 1 video 3

  const ejercicio3 = [
    {
      id: 1,
      nombre: "Ejercicio 4:  Ordena de menor a mayor (del 1 al 10)",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
    {
      id: 2,
      nombre: "Ejercicio 5: Ordena de menor a mayor (del 11 al 20)",
      disponible: VALOR >= 2 ? true : false, //false
      imagen: candado,
    },
  ];

  // lista de ejercicios de la unidad 1 video 4

  const ejercicio4 = [
    {
      id: 1,
      nombre: "Ejercicio 6: Comparación de Números (mayor, igual o menor que)",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // lista de ejercicios de la unidad 1 video 5

  const ejercicio5 = [
    {
      id: 1,
      nombre: "Ejercicio 7: Componer Números utilizando cubos",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
    {
      id: 2,
      nombre: "Ejercicio 8: Componer Números utilizando manzanas",
      disponible: VALOR >= 2 ? true : false, //false
      imagen: candado,
    },
  ];

  // lista de ejercicios de la unidad 1 video 6

  const ejercicio6 = [
    {
      id: 1,
      nombre: "Ejercicio 9: Descomponer Números",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
    {
      id: 2,
      nombre: "Ejercicio 10: Descomponer Números utilizando manzanas",
      disponible: VALOR >= 2 ? true : false, //false
      imagen: candado,
    },
  ];

  // lista de ejercicios de la unidad 1 video 7

  const ejercicio7 = [
    {
      id: 1,
      nombre: "Ejercicio 11: Identificar Unidades y Decenas entre 1 a 20",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // lista de ejercicios de la unidad 1 video 8

  const ejercicio8 = [
    {
      id: 1,
      nombre: "Ejercicio 12: Suma del 0 al 5",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // lista de ejercicios de la unidad 1 video 9

  const ejercicio9 = [
    {
      id: 1,
      nombre: "Ejercicio 13: Suma (Máximo 10)",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // lista de ejercicios de la unidad 1 video 10

  const ejercicio10 = [
    {
      id: 1,
      nombre: "Ejercicio 14: Suma (Máximo 20)",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // lista de ejercicios de la unidad 1 video 11

  const ejercicio11 = [
    {
      id: 1,
      nombre: "Ejercicio 15: Resta (Números menores o iguales a 5)",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // lista de ejercicios de la unidad 1 video 12

  const ejercicio12 = [
    {
      id: 1,
      nombre: "Ejercicio 16: Resta (Números menores o iguales a 10)",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // lista de ejercicios de la unidad 1 video 13

  const ejercicio13 = [
    {
      id: 1,
      nombre: "Ejercicio 17: Resta (Números menores o iguales a 20)",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // lista de ejercicios de la unidad 2 video 1

  const ejercicio14 = [
    {
      id: 1,
      nombre: "Ejercicio 1: Patrones con Figuras",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // lista de ejercicios de la unidad 2 video 2

  const ejercicio15 = [
    {
      id: 1,
      nombre: "Ejercicio 2: Patrones con Animales",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // Lista de ejercicios de la unidad 2 video 3

  const ejercicio16 = [
    {
      id: 1,
      nombre: "Ejercicio 3: Patrones con Números",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
    {
      id: 2,
      nombre: "Ejercicio 4: Patrones del 1 al 10",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
    {
      id: 3,
      nombre: "Ejercicio 5: Patrones del 1 al 20",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // Lista de ejercicios de la unidad 2 video 4

  const ejercicio17 = [
    {
      id: 1,
      nombre: "Ejercicio 6: Patrones del 1 al 20",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // Lista de ejercicios de la unidad 3 video 1

  const ejercicio18 = [
    {
      id: 1,
      nombre: " Ejercicio 1: izquierda o derecha",
      disponible: VALOR >= 0 ? true : false, //true,
    },
    {
      id: 2,
      nombre: "Ejercicio 2: Contar y Marcar las Imágenes del 1 al 10",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // Lista de ejercicios de la unidad 3 video 2

  const ejercicio19 = [
    {
      id: 1,
      nombre: "Ejercicio 3: Reconocer nombre de las Figuras Geométricas 2D",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
    {
      id: 2,
      nombre: "Ejercicio 4: Reconocer imagen de las Figuras Geométricas 2D",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // Lista de ejercicios de la unidad 3 video 3

  const ejercicio20 = [
    {
      id: 1,
      nombre: "Ejercicio 5: Reconocer nombre Figuras 3D",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
    {
      id: 2,
      nombre: "Ejercicio 6: Reconocer imagen de Figuras 3D",
      disponible: VALOR >= 1 ? true : false, //false,
      imagen: candado,
    },
  ];

  // Lista de ejercicios de la unidad 4 video 1

  const ejercicio21 = [
    {
      id: 1,
      nombre: "Ejercicio 1: Identificar y comparar la longitud de objetos",
      disponible: VALOR >= 0 ? true : false, //true,
    },
  ];

  // Lista de ejercicios de la unidad 5 video 1

  const ejercicio22 = [
    {
      id: 1,
      nombre: "Ejercicio 1: Identificar y comparar la longitud de objetos",
      disponible: VALOR >= 0 ? true : false, //true,
    },
  ];

  return (
    <div className="flex flex-col  justify-center items-center align-middle  min-h-screen bg-blue-200">
      <Cabecera />
      <div>
        <BotonVolver direccion={"/unidad/1"} />
      </div>

      <h1
        className="text-4xl font-semibold mb-4 rounded-xl p-2 text-center w-96"
        style={{ backgroundColor: "#FFFF70" }}
      >
        Lista de Ejercicios
      </h1>

      {cargando ? (
        // PANTALLA DE CARGA
        <div className="flex-1 flex items-center justify-center ">
          <p className=" text-xl ">Cargando...</p>
        </div>
      ) : (
        // PANTALLA DE CONTENIDO

        <div className=" bg-gray-200  rounded-lg p-10 shadow-md w-96 items-center justify-center align-middle">
          <ul className=" flex flex-col list-disc list-inside">
            {ejercicios.map((ejercicio, index) => (
              <Link
                to={
                  ejercicio.disponible
                    ? `/unidad/1/listaEjercicios/ejercicio_${ejercicio.id}`
                    : "#"
                }
                key={ejercicio.id}
                className={`flex flex-grid ${
                  ejercicio.disponible ? "cursor-pointer" : "cursor-not-allowed" // inverso  "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <button
                  key={index}
                  className={`text-lg mt-4 mb-4 border-2 rounded-lg p-1 bg-white hover:bg-blue-500  hover:text-white transition duration-300 ${
                    ejercicio.disponible
                      ? "cursor-pointer"
                      : "cursor-not-allowed" // inverso  "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {ejercicio.nombre}
                </button>

                <div className="relative flex mb-4">
                  {!ejercicios[index].disponible ? (
                    <span></span>
                  ) : (
                    <div
                      className={` text-blue-500 hover:underline mt-8 ml-2 container text-sm font-semibold bg-white hover:bg-blue-500 hover:text-white rounded-full shadow-md w-24 h-10 px-0 py-2 text-center border-2 align-top ${
                        ejercicio.disponible ? "" : "pointer-events-none"
                      }`}
                    >
                      Ver ejercicio
                    </div>
                  )}
                  <div>
                    <img
                      src={
                        /* ejercicio.id === 1 && */ ejercicio.disponible
                          ? null
                          : ejercicio.imagen
                      }
                      className={`container h-10 w-10 relative ml-2 top-4  ${
                        ejercicio.disponible ? "hidden" : ""
                      }`}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      )}

      <div className="absolute bottom-0 w-full pt-32">
        {" "}
        <PieDePagina />
      </div>
    </div>
  );
}
