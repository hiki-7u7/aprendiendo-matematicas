import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { BotonVolver } from "../components/BotonVolver";
import { Alumnos } from "../components/Alumnos";
import { Alert } from "../components/Alert";

export function JoinStudent() {
  const navegar = useNavigate();

  // codigo para obtener el nombre y rut del alumno
  const [alumnos, setAlumnos] = useState([]);
  const [rut, setRut] = useState("");
  const [error, setError] = useState(false);

  const obtenerAlumno = async () => {
    if (rut) {
      console.log("Realizando consulta...");
      const q = query(
        collection(db, "usuarios"),
        where("rut", "==", rut),
        where("rol", "==", "alumno")
      );
      const querySnapshot = await getDocs(q);

      const listaAlumnos = querySnapshot.docs.map((doc) => doc.data());

      console.log(
        "Estado actual de alumnos:",
        alumnos.map((a) => a.nombre)
      );

      const alumnoEncontrado = listaAlumnos.find(
        (alumno) => alumno.rut === rut
      );
      if (!alumnoEncontrado) {
        setError(
          "El rut ingresado no corresponde a un alumno registrado o no es válido"
        );
      } else if (alumnos.some((a) => a.rut === alumnoEncontrado.rut)) {
        setError("El alumno ya ha sido agregado");
      } else {
        setError("");
        setAlumnos([...alumnos, alumnoEncontrado]);
      }
    }
  };

  console.log(
    "Estado actual de alumnos:",
    alumnos.map((a) => a.nombre)
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto ">
      <BotonVolver direccion="/Register" />
      <h1 className="text-center text-3xl font-bold py-2 ">Ver Estudiantes</h1>
      <form className="flex flex-row">
        <div className="mb-4">
          <label
            htmlFor="rut"
            className="block text-gray-700 mr-2 text-sm font-bold"
          >
            Rut del estudiante
          </label>
          <input
            type="text"
            name="rut"
            id="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            placeholder="xxx.xxx.xxx-x"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />
        </div>

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              obtenerAlumno(e);
            }}
            className="bg-green-500 hover:bg-green-300  rounded-full px-2 focus:outline-none focus:shadow-outline ml-2 mt-7"
          >
            +
          </button>
        </div>
      </form>

      {error && (
        <Alert message={error} /> // Mostrar la alerta
      )}

      <button className="bg-orange-500 hover:bg-orange-300  rounded-full px-2 focus:outline-none focus:shadow-outline">
        Registrar
      </button>

      {alumnos.map((alumno) => (
        <Alumnos
          key={alumno.rut}
          nombre={alumno.nombre}
          apellido={alumno.apellido}
          rut={alumno.rut}
        />
      ))}
    </div>
  );
}
