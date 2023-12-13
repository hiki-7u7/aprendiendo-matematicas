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

export function ListaEjercicios_18() {
  const { user } = useAuth(); //user.email para obtener el email del usuario
  const [ejerciciosRegistrados, setEjerciciosRegistrados] = useState([]); //valor de ejercicios registrados por el estudiante
  const [cargando, setCargando] = useState(true); // valor de cargando en true para mostrar pantalla de carga
  //const [ejerciciosFaltantes, setEjerciciosFaltantes] = useState([]); //valor de ejercicios faltantes por registrar por el estudiante
  const [VALOR2, setVALOR2] = useState(); //valor de ejercicios faltantes por registrar por el estudiante
  const [idEjercicio, setIdEjercicio] = useState([]); //valor de ejercicios faltantes por registrar por el estudiante
  const [NombresEjercicios, setNombresEjercicios] = useState([]); //valor de ejercicios faltantes por registrar por el estudiante

  /*  useEffect(() => {
    obtenerEjercicios();
  }, []); */

  useEffect(() => {
    async function obtenerEjercicios() {
      //  Obtengo el progreso de las unidades del estudiante
      const qUnidades = query(
        collection(db, "ProgresoEstudiante"),
        where("estudianteId", "==", user.uid)
      );
      const queryUnidades = await getDocs(qUnidades);
      const DocEstudiante = queryUnidades.docs.map((doc) => doc.data()); // obtengo el progreso de las unidades del estudiante

      console.log("id de alumno", user.uid);

      console.log("DocEstudiante", DocEstudiante[0].idEjercicios[0]);

      const listaEjerReg = DocEstudiante[0].idEjercicios; // obtengo el progreso de las unidades del estudiante

      console.log("listaEjerDisp: ", listaEjerReg);

      setEjerciciosRegistrados(listaEjerReg); // obtengo el progreso de los ejercicios del estudiante

      console.log("ejerciciosRegistrados_1: ", ejerciciosRegistrados);

      //---------
      const qUnidad = query(
        collection(db, "Unidades"),
        where("orden", "==", 3)
      );
      const queryUnidad = await getDocs(qUnidad);
      const DocUnidad = queryUnidad.docs.map((doc) => doc.data()); // obtengo el progreso de las unidades del estudiante

      console.log("DocUnidad unit 3:", DocUnidad[0].id);
      var idUnidad = DocUnidad[0].id; // almaceno el id de la unidad 1

      const qUnidad2 = query(
        collection(db, "Unidades"),
        where("orden", "==", 2)
      );
      const queryUnidad2 = await getDocs(qUnidad2);
      const DocUnidad2 = queryUnidad2.docs.map((doc) => doc.data()); // obtengo el progreso de las unidades del estudiante

      console.log("DocUnidad unit 2:", DocUnidad2[0].id);
      var idUnidad2 = DocUnidad2[0].id; // almaceno el id de la unidad 1

      //---------
      // id del ejercicio 6 de unidad 2
      const qEjercicios = query(
        collection(db, "Ejercicios"),
        where("orden", "==", 6),
        where("unidadesId", "==", idUnidad2)
      );
      const queryEjercicios = await getDocs(qEjercicios);
      const DocEjercicios = queryEjercicios.docs.map((doc) => doc.data()); // obtengo el progreso de las unidades del estudiante

      console.log("DocEjercicios 6 unit 2:", DocEjercicios[0].id);

      // id del ejercicio 2
      const qEjercicios2 = query(
        collection(db, "Ejercicios"),
        where("orden", "==", 1),
        where("unidadesId", "==", idUnidad)
      );
      const queryEjercicios2 = await getDocs(qEjercicios2);
      const DocEjercicios2 = queryEjercicios2.docs.map((doc) => doc.data()); // obtengo el progreso de las unidades del estudiante

      console.log("DocEjercicios2: unit 3: ->", DocEjercicios2[0].id);

      // id del ejercicio 3
      const qEjercicios3 = query(
        collection(db, "Ejercicios"),
        where("orden", "==", 2),
        where("unidadesId", "==", idUnidad)
      );
      const queryEjercicios3 = await getDocs(qEjercicios3);
      const DocEjercicios3 = queryEjercicios3.docs.map((doc) => doc.data()); // obtengo el progreso de las unidades del estudiante

      console.log("DocEjercicios2: unit 3: ->", DocEjercicios3[0].id);

      var listaEjercicios = [];
      listaEjercicios.push(DocEjercicios[0].id);
      listaEjercicios.push(DocEjercicios2[0].id);

      setIdEjercicio(listaEjercicios); // almaceno el id del ejercicio 1

      var nombreEjercicios = [];
      nombreEjercicios.push(DocEjercicios2[0].nombre);
      nombreEjercicios.push(DocEjercicios3[0].nombre);

      setNombresEjercicios(nombreEjercicios);

      //---------
      console.log("ejerciciosRegistrados[0]: ", ejerciciosRegistrados[0]);
      console.log("idEjercicio: ", idEjercicio);

      console.log(
        "ejercicio registrado ? ",
        ejerciciosRegistrados.includes(idEjercicio)
      );

      console.log("idEjercicio: ", idEjercicio);

      console.log("idEjercicio Nuevo: ", idEjercicio);

      //---------

      /*  const q = query(collection(db, "Ejercicios"));
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

      console.log("valor: ", valor + "%"); */

      setCargando(false); // valor de cargando en false para mostrar pantalla de contenido
    }
    obtenerEjercicios();
  }, []);

  console.log("ejerciciosRegistrados:  VALOR FINAL", ejerciciosRegistrados);
  console.log("IDEJERCICIO:  VALOR FINAl", idEjercicio);

  //const VALOR = ejerciciosRegistrados.length;

  //console.log("VALOR: VALOR FINAL ", VALOR2);

  console.log(
    "PRUEBA DE ARRRAY: ",
    ejerciciosRegistrados.includes(idEjercicio[1])
  );

  const ejercicios = [
    {
      id: 1,
      nombre: NombresEjercicios[0],
      disponible: true, //false,
      imagen: candado,
    },
    {
      id: 2,
      nombre: NombresEjercicios[1],
      disponible: ejerciciosRegistrados.includes(idEjercicio[1]), //false
      imagen: candado,
    },
  ];

  // ejemplo de parte de la lista de ejercicios

  /* ,
    {
      id: 3,
      nombre: "Ejercicio 3: Contar imagenes entre 1 al 20",
      disponible: VALOR >= 2 ? true : false, //false
      imagen: candado,
    },
    {
      id: 4,
      nombre: "Ejercicio 4: Multiplicación de números enteros",
      disponible: VALOR >= 3 ? true : false, //false
      imagen: candado,
    },
    {
      id: 5,
      nombre: "Ejercicio 5: División de números enteros",
      disponible: VALOR >= 4 ? true : false, //false
      imagen: candado,
    }, */

  //

  return (
    <div className="flex flex-col  justify-center items-center align-middle  min-h-screen bg-blue-200">
      <Cabecera />
      <div>
        <BotonVolver direccion={"/unidad/3"} />
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
                    ? `/unidad/3/listaEjercicios/ejercicio_${ejercicio.id}`
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
                  {index >= 0 && !ejercicios[index].disponible ? (
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
                        ejercicio.id === 4 && !ejercicio.disponible
                          ? null
                          : ejercicio.imagen
                      }
                      className={`container h-10 w-10 relative ml-2 top-7  ${
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