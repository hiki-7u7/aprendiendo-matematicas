import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { BotonVolver } from "../components/BotonVolver";
import { Alumnos } from "../components/Alumnos";
import { Alert } from "../components/Alert";
import { useAuth } from "../context/authContext";

export function JoinStudent() {
  const navegar = useNavigate();

  // codigo para obtener el nombre y rut del alumno
  const { user } = useAuth();
  const [alumnos, setAlumnos] = useState([]);
  const [rut, setRut] = useState("");
  const [error, setError] = useState(false);

  const actualizarListaAlumnos = (rut) => {
    const listaAlumnosActualizada = alumnos.filter((alumno) => {
      return alumno.rut !== rut;
    });
    setAlumnos(listaAlumnosActualizada);
  };

  // codigo para almacenar el RUT del profesor
  const [idProfesor, setIdProfesor] = useState("");

  // codigo para obtener el RUT del profesor
  const obtenerIdProfesor = async () => {
    try {
      const q = query(
        collection(db, "Profesor"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        if (docData.email === user.email) {
          setIdProfesor(docData.rut);
        }
      });
    } catch (error) {
      console.log("Error al obtener el ID del profesor", error);
    }
  };

  // codigo para obtener el RUT del profesor
  useEffect(() => {
    obtenerIdProfesor();
  }, []);

  // codigo para obtener el nombre y rut del alumno
  const obtenerAlumno = async () => {
    if (rut) {
      console.log("Realizando consulta...");
      const q = query(
        collection(db, "Estudiante"),
        where("rut", "==", rut),
        where("rol", "==", "alumno")
      );
      const querySnapshot = await getDocs(q);

      const listaAlumnos = querySnapshot.docs.map((doc) => doc.data());

      const alumnoEncontrado = listaAlumnos.find(
        (alumno) => alumno.rut === rut
      );
      if (!alumnoEncontrado) {
        setError(
          "El rut ingresado no corresponde a un alumno registrado o no es válido"
        );
      } else if (alumnos.some((a) => a.rut === alumnoEncontrado.rut)) {
        setError("El alumno ya ha sido agregado");
      } else if (alumnoEncontrado.ProfesorAsignado === idProfesor) {
        setError("Este alumno ya está asignado por usted");
      } else if (alumnoEncontrado.ProfesorAsignado) {
        setError("El alumno ya tiene un profesor asignado");
      } else {
        setError("");

        const EstudianteConIdProfesor = {
          ...alumnoEncontrado,
          ProfesorAsignado: idProfesor,
        };
        try {
          const docRef = await addDoc(
            collection(db, "Estudiante"),
            EstudianteConIdProfesor
          );
          const estudianteId = docRef.id;

          setAlumnos([
            ...alumnos,
            { id: estudianteId, ...EstudianteConIdProfesor },
          ]);
          //console.log("Document written with ID: ", idProfesor);
          //console.log(docRef);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  };

  // codigo para almacenar el RUT del profesor en la coleccion de alumnos
  const registrarProfesorAsignado = async () => {
    const alumnosConIdProfesor = alumnos.map((alumno) => ({
      ...alumno,
      ProfesorAsignado: idProfesor,
    }));
    setAlumnos(alumnosConIdProfesor);
    console.log("Alumnos con id profesor:", alumnosConIdProfesor);
    // actualizar los datos de los alumnos en la base de datos
    try {
      const estudianteColeccion = collection(db, "Estudiante");
      const batch = writeBatch(db);
      // bucle para actualizar los datos de los alumnos
      for (const alumno of alumnosConIdProfesor) {
        const querySnapshot = await getDocs(
          query(estudianteColeccion, where("rut", "==", alumno.rut))
        );
        // si el alumno existe, actualizar el campo ProfesorAsignado
        if (!querySnapshot.empty) {
          const estudianteDoc = querySnapshot.docs[0];
          const estudianteDocRef = doc(db, "Estudiante", estudianteDoc.id);

          const antiguoDatos = estudianteDoc.data();
          // si el alumno no tiene profesor asignado, agregar el profesor
          if (!antiguoDatos.ProfesorAsignado) {
            const nuevosDatos = {
              ...antiguoDatos,
              ProfesorAsignado: alumno.ProfesorAsignado,
            };
            batch.set(estudianteDocRef, nuevosDatos);
          }
          const oldDocQuery = query(
            estudianteColeccion,
            where("rut", "==", alumno.rut)
          );
          const oldQuerySnapshot = await getDocs(oldDocQuery);

          oldQuerySnapshot.forEach(async (doc) => {
            if (doc.id !== estudianteDoc.id) {
              batch.delete(doc.ref);
            }
          });
        }
      }
      await batch.commit();
      console.log("Profesor asignado a los alumnos");
    } catch (error) {
      console.log("Error al obtener el ID del alumno", error);
    }
  };

  // codigo para almacenar la lista de alumnos en la coleccion de profesores
  const RegistrarListaAlumnos = async () => {
    try {
      const q = query(
        collection(db, "Profesor"),
        where("rut", "==", idProfesor)
      );
      const querySnapshot = await getDocs(q);

      // si el profesor existe, actualizar la lista de alumnos
      if (!querySnapshot.empty) {
        const profesorDoc = querySnapshot.docs[0]; // obtener el documento del profesor
        const profesorDocRef = doc(db, "Profesor", profesorDoc.id);

        const batch = writeBatch(db);

        // obtener los datos antiguos del profesor
        const antiguoDatos = profesorDoc.data();

        // si el profesor no tiene alumnos asignados, agregar la lista de alumnos
        if (!antiguoDatos.alumnos) {
          const nuevosDatos = {
            ...antiguoDatos,
            alumnos: alumnos.map((alumno) => alumno.rut),
          };
          batch.set(profesorDocRef, nuevosDatos);
        } else {
          // si el profesor ya tiene alumnos asignados, actualizar la lista de alumnos
          const nuevosDatos = {
            ...antiguoDatos,
            alumnos: alumnos.map((alumno) => alumno.rut),
          };
          batch.update(profesorDocRef, nuevosDatos);
        }

        const oldDocQuery = query(
          collection(db, "Profesor"),
          where("rut", "==", idProfesor)
        );
        const oldQuerySnapshot = await getDocs(oldDocQuery);

        oldQuerySnapshot.forEach(async (doc) => {
          if (doc.id !== profesorDoc.id) {
            batch.delete(doc.ref);
          }
        });

        await batch.commit();

        console.log("Lista de alumnos registrada");
      } else {
        console.log("No se encontró el profesor");
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          if (docData.rut === idProfesor) {
            addDoc(collection(db, "Profesor"), {
              ...docData,
              alumnos: alumnos.map((alumno) => alumno.rut),
            });
          }
        });
      }
    } catch (error) {
      console.log("Error al obtener el ID del profesor", error);
    }
  };

  /*console.log(
    "Estado actual de alumnos:",
    alumnos.map((a) => a.nombre)
  );*/
  //console.log("ID del profesor:", idProfesor);

  // almacenar lista de alumnos en la base de datos como campo del profesor
  /*const almacenarListaAlumnos = async () => {
    try {
      const docRef = doc(db, "Profesor", idProfesor);
      await updateDoc(docRef, {
        alumnos: alumnos,
      });
      console.log("Documento Actualizado");
    } catch (e) {
      console.error("Error en Actualizacion de Documento: ", e);
    }
  };*/

  /*console.log(
    "Lista de alumnos:",
    alumnos.map((a) => a.rut)
  );*/

  console.log(user.email);

  return (
    <div className="flex flex-col items-center justify-center   ">
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
            onChange={(e) => {
              const inputRut = e.target.value;
              // Limitar el largo del rut a 9 caracteres
              if (inputRut.length <= 9) {
                setRut(inputRut);
              }
            }}
            placeholder="xxx.xxx.xxx-x"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />
        </div>

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              obtenerAlumno();
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

      <button
        onClick={() => {
          registrarProfesorAsignado(), RegistrarListaAlumnos();
        }}
        className="bg-orange-500 hover:bg-orange-300  rounded-full px-2 focus:outline-none focus:shadow-outline"
      >
        Registrar
      </button>

      {alumnos.map((alumno) => (
        <Alumnos
          id={alumno.id}
          key={alumno.rut}
          nombre={alumno.nombre}
          apellido={alumno.apellido}
          rut={alumno.rut}
          actualizarListaAlumnos={actualizarListaAlumnos}
          profesorAsignado={alumno.ProfesorAsignado}
        />
      ))}
    </div>
  );
}
