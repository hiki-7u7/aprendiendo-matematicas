// Objetivo: componente Home
import { useAuth } from "../context/authContext.jsx";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { useEffect, useState } from "react";
import { Cabecera_2 } from "../components/Cabecera_2.jsx";
import { PieDePagina } from "../components/PieDePagina.jsx";

let id = 0;

export function Profesor() {
  const { user, CerrarSesion, cargando } = useAuth();
  const [usuarioRol, setUsuarioRol] = useState();
  const [usuarioNombre, setUsuarioNombre] = useState();
  const [usuarioApellido, setUsuarioApellido] = useState();
  const [usuarioCorreo, setUsuarioCorreo] = useState();
  const [usuarioRut, setUsuarioRut] = useState();
  const [usuarioAlumnos, setUsuarioAlumnos] = useState([]); // Inicializamos como un array vacío
  const [mostrarPagina, setMostrarPagina] = useState(false); // estado para controlar la carga de la página
  const [busqueda, setBusqueda] = useState(""); // estado para controlar la búsqueda de alumnos

  const obtenerDatos = async () => {
    const q = query(
      collection(db, "Profesor"),
      where("email", "==", user.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setUsuarioRol(doc.data().rol);
      setUsuarioNombre(doc.data().nombre);
      setUsuarioApellido(doc.data().apellido);
      setUsuarioCorreo(doc.data().email);
      setUsuarioRut(doc.data().rut);
      // Verificamos si doc.data().alumnos está definido antes de establecerlo
      if (doc.data().alumnos) {
        setUsuarioAlumnos(doc.data().alumnos);
      }
    });
    setMostrarPagina(true); // ya se cargó la página
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const handlelogout = async () => {
    await CerrarSesion();
  };

  // Si el usuario no está autenticado o la página no se ha cargado, mostrar "Cargando..."
  if (cargando || !mostrarPagina)
    return (
      <h1 className="flex min-h-screen items-center justify-center">
        Cargando...
      </h1>
    );

  return (
    <div className="flex flex-col min-h-screen items-center justify-center ">
      <Cabecera_2 />

      <div className="absolute top-16">
        <h1>Busqueda de Alumnos</h1>
        <input
          type="text"
          placeholder="Buscar..."
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none  shadow-md"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div>
        <h3 className=" text-4xl ">Lista de Alumnos:</h3>

        <div className="flex justify-between border-2 border-gray-500 p-4 ">
          {usuarioAlumnos.map((alumno) => (
            <div className="border-2 border-black p-2" key={id++}>
              {alumno}
            </div>
          ))}
        </div>

        <button
          className="bg-orange-500 hover.bg-orange-300 rounded-full px-2 focus:outline-none focus:shadow-outline"
          onClick={handlelogout}
        >
          Cerrar Sesion
        </button>
      </div>
      <div className="absolute bottom-0 w-full">
        <PieDePagina />
      </div>
    </div>
  );
}

// colocar bordes en tailwindcss
// https://tailwindcss.com/docs/border-width
// https://tailwindcss.com/docs/border-color
// https://tailwindcss.com/docs/border-radius
