import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { Cabecera_2 } from "../components/Cabecera_2.jsx";
import { PieDePagina } from "../components/PieDePagina.jsx";
import { BarraProgreso } from "../components/BarraProgreso.jsx";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export function Profesor() {
  const { user, cargando } = useAuth();
  const [ProfesorRol, setProfesorRol] = useState("");
  const [listaAlumnos, setListaAlumnos] = useState([]);
  const [mostrarPagina, setMostrarPagina] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [alumnosData, setAlumnosData] = useState([]);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [alumnoBuscado, setAlumnoBuscado] = useState(null);
  const [rutSeleccionado, setRutSeleccionado] = useState("");
  const [alumnoID, setAlumnoID] = useState("");
  const navigate = useNavigate();

  const obtenerID = async () => {
    try {
      const ConsultaAlumno = query(
        collection(db, "Estudiante"),
        where("rut", "==", rutSeleccionado)
      );

      const ConsultaAlumnoSnapshot = await getDocs(ConsultaAlumno);

      if (!ConsultaAlumnoSnapshot.empty) {
        const ConsultaAlumnoDoc = ConsultaAlumnoSnapshot.docs[0].data();
        console.log("ConsultaAlumnoDoc", ConsultaAlumnoDoc);

        setAlumnoID(ConsultaAlumnoDoc.id);
        console.log("ID obtenido:", alumnoID);
        /* navigate("/Profesor/DetalleAlumno", {
          state: { rutAlumno },
          state2: { alumnoID },
        }); */
      } else {
        console.log("No se encontró el alumno");
      }
    } catch (error) {
      console.error("Error al obtener el ID del alumno:", error);
    }

    // Navegar a la página de detalle del alumno
    //navigate("/Profesor/DetalleAlumno", { state: { rutAlumno } });
  };

  const handleAlumnoClick = (rutAlumno) => {
    // Guardar el rut del alumno seleccionado en el estado global
    setRutSeleccionado(rutAlumno);
    //console.log("rutAlumno", rutSeleccionado);
    //obtenerID();
    // Navegar a la página de detalle del alumno
    navigate("/Profesor/DetalleAlumno", {
      state: { rutAlumno },
    });
  };

  // Función para obtener los datos de los alumnos del profesor
  const obtenerDatos = async () => {
    try {
      const profesorQuery = query(
        collection(db, "Profesor"),
        where("email", "==", user.email)
      );
      const profesorSnapshot = await getDocs(profesorQuery);

      if (!profesorSnapshot.empty) {
        const profesorDoc = profesorSnapshot.docs[0].data();
        setProfesorRol(profesorDoc.rol);

        if (profesorDoc.alumnos && profesorDoc.alumnos.length > 0) {
          // Si el profesor tiene alumnos en su lista
          setListaAlumnos(profesorDoc.alumnos);
          setMostrarPagina(true);

          // Obtener los datos de cada alumno
          const alumnosDataPromises = profesorDoc.alumnos.map(
            async (alumnoRut) => {
              const alumnoQuery = query(
                collection(db, "Estudiante"),
                where("rut", "==", alumnoRut)
              );
              const alumnoSnapshot = await getDocs(alumnoQuery);

              if (!alumnoSnapshot.empty) {
                const alumnoDoc = alumnoSnapshot.docs[0].data();

                return {
                  rut: alumnoDoc.rut,
                  nombre: alumnoDoc.nombre,
                  apellido: alumnoDoc.apellido,
                  progreso: alumnoDoc.progreso || 0,
                  id: alumnoDoc.id,
                };
              }
            }
          );

          const alumnosDataResult = await Promise.all(alumnosDataPromises);
          setAlumnosData(alumnosDataResult);

          setCargandoDatos(false);
        } else {
          // Si el profesor no tiene alumnos en su lista
          setMostrarPagina(true);
          setCargandoDatos(false);
        }
      }
    } catch (error) {
      console.error(
        "Error al obtener los datos del profesor o alumnos:",
        error
      );
      setCargandoDatos(false);
    }
  };

  useEffect(() => {
    setCargandoDatos(true);
    obtenerDatos();
  }, []);

  // Función para buscar un alumno por nombre, apellido o rut
  const handleBuscarAlumno = () => {
    const busquedaLowerCase = busqueda.toLowerCase();
    const alumnoEncontrado = alumnosData.find((alumno) => {
      return (
        alumno.nombre.toLowerCase().includes(busquedaLowerCase) ||
        alumno.apellido.toLowerCase().includes(busquedaLowerCase) ||
        alumno.rut.toLowerCase().includes(busquedaLowerCase)
      );
    });

    if (alumnoEncontrado) {
      setAlumnoBuscado(alumnoEncontrado);
    } else {
      setAlumnoBuscado(null);
    }
  };

  // Controlador de evento para buscar cuando se presiona "Enter"
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleBuscarAlumno();
    }
  };

  if (cargandoDatos || !mostrarPagina) {
    return (
      <h1 className="flex min-h-screen items-center justify-center">
        Cargando...
      </h1>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-contain bg-no-repeat bg-center bg-blue-200">
      <Cabecera_2 />

      <div className="px-4 py-2 bg-gray-200 rounded-md shadow-md">
        <div className="flex">
          <h1 className="text-2xl">Búsqueda de Alumnos</h1>
          <button
            onClick={handleBuscarAlumno}
            className="ml-4 bg-white hover:bg-orange-400 border-2 h-10 px-3 rounded-md text-sm focus:outline-none shadow-md"
          >
            Buscar
          </button>
        </div>
        <input
          type="text"
          list="alumnos-list"
          placeholder="Buscar..."
          className="w-full border-2 border-gray-300 bg-white h-10 px-3 rounded-md text-sm focus:outline-none shadow-md"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            handleBuscarAlumno(e.target.value);
          }}
          onKeyPress={handleKeyPress} // Controlador de evento para "Enter"
        />
        <datalist id="alumnos-list">
          {alumnosData.map((alumno) => (
            <option key={alumno.rut} value={alumno.nombre} />
          ))}
        </datalist>
      </div>

      <div className="flex flex-col px-4 mt-4 border-2 border-black rounded-lg items-center justify-center bg-white">
        <div>
          <h3 className="text-2xl">Progreso de Alumnos:</h3>
        </div>

        <div className="flex flex-wrap space-x-4 space-y-4 mt-4 mb-4">
          {/* Lista de Alumnos */}
          {busqueda === "" ? (
            // Mostrar todos los alumnos cuando la búsqueda está vacía
            alumnosData.map((alumnoData, index) => (
              <div
                key={index}
                className="flex mt-4 px-2 py-2 space-x-4 space-y-4 items-center justify-center border-2 border-black hover:bg-slate-100 rounded-lg shadow-md"
              >
                <button onClick={() => handleAlumnoClick(alumnoData.rut)}>
                  <div className="flex flex-col items-center bg-white hover:bg-slate-100 rounded-lg shadow-md p-4">
                    <BsPersonCircle className="text-4xl text-blue-600" />
                    <h4 className="text-lg font-semibold">{alumnoData.rut}</h4>

                    <h3 className="text-gray-600 text-xl">
                      {alumnoData.nombre} {alumnoData.apellido}
                    </h3>
                    <p className="text-gray-800">
                      Progreso:{" "}
                      {alumnoData.progreso ? alumnoData.progreso : "0%"}
                    </p>
                    <BarraProgreso
                      progress={
                        alumnoData.progreso ? alumnoData.progreso : "0%"
                      }
                    />
                  </div>
                </button>
              </div>
            ))
          ) : alumnoBuscado ? (
            // Mostrar solo el alumno buscado
            <div className="flex flex-col mt-4 px-2 py-2 space-x-4 space-y-4 items-center justify-center border-2 border-black rounded-lg shadow-md">
              <Link to="/Profesor/DetalleAlumno">
                <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4">
                  <BsPersonCircle className="text-4xl text-blue-600" />
                  <h4 className="text-lg font-semibold">{alumnoBuscado.rut}</h4>

                  <h3 className="text-gray-600 text-xl">
                    {alumnoBuscado.nombre} {alumnoBuscado.apellido}
                  </h3>
                  <p className="text-gray-600">
                    Progreso: {alumnoBuscado.progreso}
                  </p>
                  <BarraProgreso progress={alumnoBuscado.progreso} />
                </div>
              </Link>
            </div>
          ) : (
            // Si no se ha encontrado un alumno, mostrar un mensaje
            <p>No se encontraron alumnos.</p>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <PieDePagina />
      </div>
    </div>
  );
}
