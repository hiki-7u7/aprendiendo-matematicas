// Objetivo: componente Home
import { useAuth } from "../context/authContext.jsx";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { useEffect, useState } from "react";
import { Cabecera } from "../components/Cabecera.jsx";

//funcion que exporta el componente Home
export function Alumno() {
  //funcion que permite manejar el contexto de autenticacion
  const { user, CerrarSesion, cargando } = useAuth();
  const [usuarioRol, setUsuarioRol] = useState();
  const [usuarioNombre, setUsuarioNombre] = useState();
  const [usuarioApellido, setUsuarioApellido] = useState();
  const [usuarioRut, setUsuarioRut] = useState();

  //funcion que permite obtener los datos de la base de datos
  const obtenerDatos = async () => {
    const q = query(
      collection(db, "Estudiante"),
      where("email", "==", user.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setUsuarioRol(doc.data().rol);
      setUsuarioNombre(doc.data().nombre);
      setUsuarioApellido(doc.data().apellido);
      setUsuarioRut(doc.data().rut);
    });
  };

  //funcion que permite obtener los datos de la base de datos
  useEffect(() => {
    obtenerDatos();
  }, []);

  // funcion que permite validar si el usuario esta logueado
  const handlelogout = async () => {
    await CerrarSesion();
  };
  if (cargando) return <p>Cargando...</p>;

  //retorno del componente
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
      <Cabecera />
      <h1>Alumno</h1>
      <p>Bienvenido {usuarioNombre}</p>
      <p>Usted es: {usuarioRol}</p>
      <p>Apellido: {usuarioApellido}</p>
      <p>Rut: {usuarioRut}</p>
      <button
        className="bg-orange-500 hover:bg-orange-300  rounded-full px-2 focus:outline-none focus:shadow-outline"
        onClick={handlelogout}
      >
        Cerrar Sesion
      </button>
    </div>
  );
}
