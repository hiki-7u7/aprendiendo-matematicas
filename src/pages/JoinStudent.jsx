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
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { BotonVolver } from "../components/BotonVolver";
import { Alumnos } from "../components/Alumnos";
import { Alert } from "../components/Alert";
import { useAuth } from "../context/authContext";
import imag1 from "../assets/img/Fondo_Login2.png";
import { toast } from "react-toastify";
export function JoinStudent() {
  //funcion que permite navegar entre paginas
  const navegar = useNavigate();

  // codigo para obtener el nombre y rut del alumno
  const { user } = useAuth(); // obtener el usuario actual
  const [alumnos, setAlumnos] = useState([]); // lista de alumnos
  const [rut, setRut] = useState(""); // rut del alumno a agregar
  const [error, setError] = useState(false); // manejo de errores
  const [message, setMessage] = useState(null); // Nuevo estado para el mensaje
  const [messageColor, setMessageColor] = useState(null); // Nueva variable de estado para el color del mensaje
  const [showMessage, setShowMessage] = useState(false); // Nuevo estado para mostrar el mensaje

  // codigo para eliminar un alumno de la lista
  const actualizarListaAlumnos = (rut) => {
    // rut del alumno a eliminar
    const listaAlumnosActualizada = alumnos.filter((alumno) => {
      return alumno.rut !== rut;
    });
    setAlumnos(listaAlumnosActualizada);
  };

  // formatear rut
  const formatearRut = (rut) => {
    // Eliminar cualquier carácter que no sea número o 'k'
    rut = rut.replace(/[^0-9kK]+/g, "");

    // Si el rut tiene al menos 2 caracteres, agrega puntos y guión
    if (rut.length > 1) {
      rut = rut.replace(/^(\d{1,2})(\d{3})(\d{3})([\dkK])$/, "$1.$2.$3-$4");
    } else if (rut.length === 1) {
      rut = rut.replace(/^(\d)([\dkK])$/, "$1-$2");
    }

    return rut;
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

  /// código para obtener el nombre y rut del alumno
  const obtenerAlumno = async () => {
    console.log("Estoy en obtener alumno");

    // Validar el rut
    if (formatearRut(rut)) {
      console.log("Realizando consulta...");

      const q = query(
        collection(db, "Estudiante"),
        where("rut", "==", formatearRut(rut)),
        where("rol", "==", "alumno")
      );

      const querySnapshot = await getDocs(q);

      const listaAlumnos = querySnapshot.docs.map((doc) => doc.data());

      const alumnoEncontrado = listaAlumnos.find(
        (alumno) => alumno.rut === formatearRut(rut)
      );

      // Si el alumno no existe, mostrar la alerta
      if (!alumnoEncontrado) {
        setError(
          "El rut ingresado no corresponde a un alumno registrado o no es válido"
        );
        toast.error(
          "El rut ingresado no corresponde a un alumno registrado o no es válido",
          {
            style: {
              backgroundColor: "#FFCDD2", //  rojo claro #FFCDD2 //rojo oscuro #EF5350  // verde mas claro #C8E6C9 // verde mas oscuro #66BB6A // rojo #E53E3E
              color: "#EF5350",
            },
            position: "top-center",
            autoClose: 4000,
            pauseOnHover: true,
          }
        );
      } else if (alumnos.some((a) => a.rut === alumnoEncontrado.rut)) {
        // Si el alumno ya está en la lista, mostrar la alerta
        // Si el alumno ya está en la lista, mostrar la alerta
        setError("Este estudiante ya ha sido consultado");
        toast.error("Este estudiante ya ha sido consultado", {
          style: {
            backgroundColor: "#FFCDD2", //  rojo claro #FFCDD2 //rojo oscuro #EF5350  // verde mas claro #C8E6C9 // verde mas oscuro #66BB6A // rojo #E53E3E
            color: "#EF5350",
          },
          position: "top-center",
          autoClose: 4000,
          pauseOnHover: true,
        });
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (alumnoEncontrado.ProfesorAsignado === idProfesor) {
        // Si el alumno ya está asignado por el profesor, mostrar la alerta
        setError("Este alumno ya está asignado por usted");
        toast.error("Este alumno ya está asignado por usted", {
          style: {
            backgroundColor: "#FFCDD2", //  rojo claro #FFCDD2 //rojo oscuro #EF5350  // verde mas claro #C8E6C9 // verde mas oscuro #66BB6A // rojo #E53E3E
            color: "#EF5350",
          },
          position: "top-center",
          autoClose: 4000,
          pauseOnHover: true,
        });
        setTimeout(() => {
          setError("");
        }, 3000);
      } else if (alumnoEncontrado.ProfesorAsignado) {
        setError("El alumno ya tiene un profesor asignado"); // Si el alumno ya tiene un profesor asignado, mostrar la alerta

        toast.error("El alumno ya tiene un profesor asignado", {
          style: {
            backgroundColor: "#FFCDD2", //  rojo claro #FFCDD2 //rojo oscuro #EF5350  // verde mas claro #C8E6C9 // verde mas oscuro #66BB6A // rojo #E53E3E
            color: "#EF5350",
          },
          position: "top-center",
          autoClose: 4000,
          pauseOnHover: true,
        });

        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("");

        // Agregar el id del profesor al alumno

        console.log("Estoy en el ELSE de obtener alumno");

        const estudianteId = querySnapshot.docs[0].id; // obtener el id del alumno
        //const estudianteRef = doc(db, "Estudiante", estudianteId);
        setAlumnos([
          ...alumnos,
          {
            id: estudianteId,
            ...alumnoEncontrado,
          },
        ]);

        console.log("el id del alumno es:", estudianteId);

        /* try {
          console.log("Estoy en el TRY de obtener alumno");
          await updateDoc(estudianteRef, {
            ProfesorAsignado: idProfesor,
            // Agrega otros campos que desees actualizar aquí
          });

          setAlumnos([
            ...alumnos,
            {
              id: estudianteId,
              ...alumnoEncontrado,
              ProfesorAsignado: idProfesor,
            },
          ]);

          console.log("Documento actualizado con éxito.");
        } catch (e) {
          console.log(
            "Estoy en el CATCH de obtener alumno, se generó un error"
          );
          console.error("Error al actualizar el documento: ", e);
        } */
      }
    } else {
      setError("Debe ingresar un rut"); // Mostrar la alerta
      toast.error("Debe ingresar un rut", {
        style: {
          backgroundColor: "#FFCDD2", //  rojo claro #FFCDD2 //rojo oscuro #EF5350  // verde mas claro #C8E6C9 // verde mas oscuro #66BB6A // rojo #E53E3E
          color: "#EF5350",
        },
        position: "top-center",
        autoClose: 4000,
        pauseOnHover: true,
      });
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
          console.log(" estoy en el 1er IF");

          const antiguoDatos = estudianteDoc.data();
          // si el alumno no tiene profesor asignado, agregar el profesor
          if (!antiguoDatos.ProfesorAsignado) {
            const nuevosDatos = {
              ...antiguoDatos,
              ProfesorAsignado: alumno.ProfesorAsignado,
            };
            console.log(" estoy en el 2do IF");
            console.log(" el id del alumno es:", estudianteDoc.id);
            batch.update(estudianteDocRef, nuevosDatos);
          }
          /*
          // eliminar los documentos duplicados
          const oldDocQuery = query(
            estudianteColeccion,
            where("rut", "==", alumno.rut)
          );
          const oldQuerySnapshot = await getDocs(oldDocQuery); // obtener los documentos duplicados

          // eliminar los documentos duplicados
          oldQuerySnapshot.forEach(async (doc) => {
            if (doc.id !== estudianteDoc.id) {
              batch.delete(doc.ref);
            }
          });*/
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

        // si el profesor NO tiene alumnos asignados, agregar la lista de alumnos
        if (!antiguoDatos.alumnos) {
          console.log("estoy en el IF");
          const nuevosDatos = {
            ...antiguoDatos,
            alumnos: alumnos.map((alumno) => alumno.rut),
          };
          batch.set(profesorDocRef, nuevosDatos);

          // si el profesor YA tiene alumnos asignados , actualizar la lista de alumnos
        } else {
          console.log("estoy en el Else");
          console.log("lista de alumnos:", alumnos);

          const totalAlumnos = antiguoDatos.alumnos.concat(
            alumnos.map((alumno) => alumno.rut)
          );
          console.log("antiguosAlumnos:", totalAlumnos);

          const nuevosDatos = {
            ...antiguoDatos,
            alumnos: totalAlumnos,
          };
          const prueba = alumnos.map((alumno) => alumno.rut);
          console.log("alumnos.map2", prueba);

          batch.update(profesorDocRef, nuevosDatos);
          console.log("nuevos Datos:", nuevosDatos);
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
        setMessage("Lista de alumnos registrada"); // Cambiar el mensaje
        setMessageColor("text-green-500"); // Cambiar el color del mensaje
        setShowMessage(true); // Mostrar el mensaje
        setTimeout(() => {
          setShowMessage(false); // Ocultar el mensaje
        }, 3000);

        toast.success("Estudiante agregado a la lista", {
          style: {
            backgroundColor: "#C8E6C9", //  rojo claro #FFCDD2 //rojo oscuro #EF5350  // verde mas claro #C8E6C9 // verde mas oscuro #66BB6A // rojo #E53E3E
            color: "#66BB6A",
          },
          position: "top-center",
          autoClose: 4000,
          pauseOnHover: true,
        });
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

  // codigo para almacenar la lista de alumnos en la coleccion de profesores
  const handleRegistrar = async () => {
    await registrarProfesorAsignado(); // registrar el profesor asignado
    await RegistrarListaAlumnos(); // registrar la lista de alumnos

    // si no hay errores, navegar a la página de profesor
    if (!error && alumnos.length > 0) {
      navegar("/Profesor");
    }
  };

  console.log(user.email);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-contain bg-no-repeat bg-center bg-blue-200 "
      /* style={{ backgroundImage: `url(${imag1})` }} */
    >
      <BotonVolver direccion="/Registro" />
      <h1 className="text-center text-3xl font-bold py-2 absolute top-2">
        Vincular Estudiantes
      </h1>
      <form className="flex flex-row absolute top-16">
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
              // Limitar el largo del rut a 12 caracteres
              if (inputRut.length <= 12) {
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
            Consultar
          </button>
        </div>
      </form>

      {/* {error && (
        <Alert message={error} /> // Mostrar la alerta
      )} */}

      {/* {showMessage && (
        <Alert message={message} color={messageColor} /> // Mostrar la alerta
      )} */}
      <div>
        <button
          onClick={handleRegistrar}
          className="bg-orange-500 hover:bg-orange-300  rounded-full px-2 focus:outline-none focus:shadow-outline  absolute top-40 items-center justify-center"
        >
          Agregar a lista
        </button>
      </div>
      <div className=" fixed top-52 ">
        {alumnos.map((alumno) => (
          <Alumnos
            id={alumno.id}
            key={alumno.rut}
            nombre={alumno.nombre}
            apellido={alumno.apellido}
            rut={alumno.rut}
            actualizarListaAlumnos={actualizarListaAlumnos}

            /* profesorAsignado={alumno.ProfesorAsignado} */
          />
        ))}
      </div>
    </div>
  );
}
