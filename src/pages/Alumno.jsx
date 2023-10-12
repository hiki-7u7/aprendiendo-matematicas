import React from "react";
import { Link } from "react-router-dom";
import { Cabecera } from "../components/Cabecera.jsx";
import { PieDePagina } from "../components/PieDePagina.jsx";
import { BiMath } from "react-icons/bi";
import { MdPattern } from "react-icons/md";
import { GoCircle } from "react-icons/go";
import { PiRulerBold } from "react-icons/pi";
import { BsDice6 } from "react-icons/bs";
import { useAuth } from "../context/authContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import candado from "../assets/img/icono_candado.png";

var VALOR = 0;

export function Alumno() {
  const { user } = useAuth(); //user.email para obtener el email del usuario

  const [ejerciciosRegistrados, setEjerciciosRegistrados] = useState([]); //valor de unidades
  const [cargando, setCargando] = useState(true); //valor de unidadesDisponibles

  const obtenerUnidades = async () => {
    /* setCargando(true); // valor de cargando en true para mostrar pantalla de carga */
    // Obtengo el id del estudiante

    // Obtengo el progreso de las unidades del estudiante
    const qUnidades = query(
      collection(db, "ProgresoEstudiante"),
      where("estudianteId", "==", user.uid)
    );
    const queryUnidades = await getDocs(qUnidades);
    const unidadesEstudiante = queryUnidades.docs.map((doc) => doc.data()); // obtengo el progreso de las unidades del estudiante

    console.log("id de alumno", user.uid);

    console.log(
      "valor de unidades: ",
      unidadesEstudiante.map((u) => u.idEjercicios[0]) // obtengo el progreso de las unidades del estudiante
    );
    let valor = unidadesEstudiante.map((u) => u.idEjercicios[0]); // obtengo array de idEjercicios del estudiante

    setEjerciciosRegistrados(valor); // asigno el array de idEjercicios del estudiante a la variable ejerciciosRegistrados

    console.log("valor es: ", ejerciciosRegistrados); // obtengo el valor de ejerciciosRegistrados

    console.log(
      "valor de ejerciciosRegistrados: ",
      ejerciciosRegistrados.length
    ); // obtengo el valor de ejerciciosRegistrados

    setCargando(false); // valor de cargando en false para mostrar pantalla de contenido
  };

  useEffect(() => {
    obtenerUnidades();
  }, []);

  //agregar mas elementos al array de ejerciciosRegistrados - Prueba de control de conteo de ejercicios
  /* 
  ejerciciosRegistrados.push(1);
  ejerciciosRegistrados.push(2);
  ejerciciosRegistrados.push(3);
  ejerciciosRegistrados.push(4);
  ejerciciosRegistrados.push(5);
  ejerciciosRegistrados.push(6); */

  VALOR = ejerciciosRegistrados.length;

  console.log("valor de VALOR: ", VALOR);
  const unidades = [
    {
      id: 1,
      nombre: "Unidad 1: Números y operaciones",
      icono: (
        <BiMath
          className="h-14 w-14 rounded-md shadow-lg"
          style={{ backgroundColor: "#F50000" }}
        />
      ),
      color: "#FF5C5C",
      disponible: VALOR >= 0 ? true : false, // verdad
    },
    {
      id: 2,
      nombre: "Unidad 2: Patrones y álgebra",
      icono: (
        <MdPattern
          className="h-14 w-14 rounded-md shadow-lg"
          style={{ backgroundColor: "#FFA500" }}
        />
      ),
      color: "#FFB833",
      disponible: VALOR >= 5 ? true : false, // falso
      imagen: candado,
    },
    {
      id: 3,
      nombre: "Unidad 3: Geometría",
      icono: (
        <GoCircle
          className="rounded-full h-14 w-14 shadow-lg"
          style={{ backgroundColor: "#F5F500" }}
        />
      ),
      color: "#FFFF70",
      disponible: VALOR >= 10 ? true : false, // falso
      imagen: candado,
    },
    {
      id: 4,
      nombre: "Unidad 4: Medición",
      icono: (
        <PiRulerBold
          className="h-14 w-14 rounded-md shadow-lg"
          style={{ backgroundColor: "#8ff638" }}
        />
      ),
      color: "#B1F977",
      disponible: VALOR >= 15 ? true : false, // falso
      imagen: candado,
    },
    {
      id: 5,
      nombre: "Unidad 5: Datos y probabilidades",
      icono: (
        <BsDice6
          className="h-14 w-14 rounded-md shadow-lg"
          style={{ backgroundColor: "#66ffff" }}
        />
      ),
      color: "#ADFFFF",
      disponible: VALOR >= 20 ? true : false, // falso
      imagen: candado,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-contain bg-no-repeat bg-center bg-blue-200">
      <Cabecera />
      {cargando ? (
        // PANTALLA DE CARGA
        <div className="flex-1 flex items-center justify-center ">
          <p className=" text-xl ">Cargando...</p>
        </div>
      ) : (
        // PANTALLA DE CONTENIDO
        <div className="flex-1 flex items-center justify-center ">
          <div className="max-w-screen-xl mx-auto ">
            <div className="grid grid-rows-1 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4 gap-4 mt-16 p-4 ">
              {unidades.map((unidad, index) => (
                <Link
                  to={unidad.disponible ? `/unidad/${unidad.id}` : "#"}
                  key={unidad.id}
                >
                  <div
                    className={`flex flex-grow bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center mb-5 ${
                      unidad.disponible
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    style={{ backgroundColor: unidad.color }}
                  >
                    <div className=" items-center justify-center ">
                      {unidad.disponible ? (
                        <button className="text-4xl mr-2">
                          {unidad.icono}
                        </button>
                      ) : (
                        <button className="text-4xl mr-2 cursor-not-allowed">
                          {unidad.icono}
                        </button>
                      )}{" "}
                    </div>
                    <h2 className="text-4xl font-semibold mt-2">
                      {unidad.nombre}
                    </h2>
                    <div className="relative flex mb-4">
                      {index > 0 && !unidades[index].disponible ? (
                        <span></span>
                      ) : (
                        <div
                          className={`text-blue-500 hover:underline mt-4 ml-2 block text-xl font-semibold bg-white rounded-full shadow-md px-4 py-1      ${
                            unidad.disponible ? " " : "pointer-events-none"
                          }`}
                        >
                          Ver unidad
                        </div>
                      )}

                      <div>
                        <img
                          src={
                            unidad.id === 1 && !unidad.disponible // lo inverso {!unidad.completado ? null : unidad.imagen} ---- original src={unidad.id === 1 && unidad.completado
                              ? null
                              : unidad.imagen
                          }
                          className={`h-10 w-10 relative ml-2 top-2 ${
                            unidad.disponible ? "hidden" : ""
                          }`} // lo inverso {!unidad.completado ? "hidden" : ""}  ---- original className={`h-10 w-10 relative ml-2 top-2 ${unidad.bloqueada ? "" : "hidden"}`}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <PieDePagina />
    </div>
  );
}
