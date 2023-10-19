import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import {
  collection,
  getDocs,
  getDoc,
  where,
  query,
  doc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { Cabecera_2 } from "../components/Cabecera_2.jsx";
import { PieDePagina } from "../components/PieDePagina.jsx";
import { BarraProgreso } from "../components/BarraProgreso.jsx"; // Importa un componente de barra de progreso
import { Link } from "react-router-dom";
import { BotonVolver } from "../components/BotonVolver.jsx";
import { BsPersonCircle } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { TbTrashX } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export function DetalleAlumno() {
  const { user, CerrarSesion, cargando } = useAuth();
  const [mostrarPagina, setMostrarPagina] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [alumnoData, setAlumnoData] = useState([]);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [alumnoBuscado, setAlumnoBuscado] = useState(null);
  const [rutSeleccionado, setRutSeleccionado] = useState("");
  const [idprofesor, setIdprofesor] = useState("");
  const [idAlumno, setIdAlumno] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const { state } = useLocation();
  const alumnoID = state.rutAlumno;

  const navegar = useNavigate();

  const [progresoUnidad1, setProgresoUnidad1] = useState("60%");
  const [progresoUnidad2, setProgresoUnidad2] = useState("25%");
  const [progresoUnidad3, setProgresoUnidad3] = useState("25%");
  const [progresoUnidad4, setProgresoUnidad4] = useState("50%");
  const [progresoUnidad5, setProgresoUnidad5] = useState("100%");
  const [progresoTotal, setProgresoTotal] = useState("");
  const [idUnidades, setIdUnidades] = useState([]);
  const [ejerciciosUnidad, setEjerciciosUnidad] = useState([]);
  const [idEjerciciosUnidad, setIdEjerciciosUnidad] = useState([]);
  const [listaunidades, setListaunidades] = useState([]);

  const [idEjerciciosUnidad1, setIdEjerciciosUnidad1] = useState([]);
  const [idEjerciciosUnidad2, setIdEjerciciosUnidad2] = useState([]);
  const [idEjerciciosUnidad3, setIdEjerciciosUnidad3] = useState([]);
  const [idEjerciciosUnidad4, setIdEjerciciosUnidad4] = useState([]);
  const [idEjerciciosUnidad5, setIdEjerciciosUnidad5] = useState([]);
  const [rutAlumno, setRutAlumno] = useState("");
  console.log("rut alumno:", rutAlumno);
  console.log("id alumno:", alumnoID);

  async function buscarprogreso() {
    const progresoQuery = query(
      collection(db, "ProgresoEstudiante"),
      where("estudianteId", "==", alumnoID)
    );

    const progresoSnapshot = await getDocs(progresoQuery);

    if (!progresoSnapshot.empty) {
      const progresoDoc = progresoSnapshot.docs[0].data();
      const idEjercicios = progresoDoc.idEjercicios; // Accede al valor de idEjercicios

      // Ahora puedes utilizar idEjercicios como lo necesites
      console.log("idEjercicios:", idEjercicios);
      setProgresoTotal(idEjercicios);
    } else {
      console.log("No se encontraron datos de progreso para el estudiante.");
    }
  }

  // Función para obtener los datos de los alumnos del profesor
  async function obtenerDatos() {
    try {
      // Obtener datos del alumno seleccionado para mostrar en la página

      const alumnoQuery = query(
        collection(db, "Estudiante"),
        where("id", "==", alumnoID)
      );
      const alumnoSnapshot = await getDocs(alumnoQuery);

      if (!alumnoSnapshot.empty) {
        const alumnoDoc = alumnoSnapshot.docs[0].data();

        setAlumnoData(alumnoDoc); // alamcenamiento de los datos del alumno
        setIdprofesor(alumnoDoc.ProfesorAsignado); // id del profesor asignado al alumno para utilizar en la eliminacion del alumno
        /* setProgreso(alumnoDoc.progreso); */
        setMostrarPagina(true);
        var rut = alumnoDoc.rut;
        setRutAlumno(rut); // rut del alumno para utilizar en la eliminacion del alumno
        var id = alumnoDoc.id;
        setIdAlumno(id); // id del alumno para utilizar en la eliminacion del alumno y en la obtencion del progreso en los ejercicios
        console.log("id del alumno:", idAlumno);
      }

      // Obtener progreso del alumno en los ejercicios

      await buscarprogreso();

      // Obtener progreso de cada unidad

      //por cada elemento de la lista de ejercicios en progresoTotal, se obtiene el id del ejercicios y se busca en la base de datos su unidad correspondiente

      const unidad1Query = query(
        collection(db, "Unidades"),
        where("orden", "==", 1)
      );

      const unidad1Snapshot = await getDocs(unidad1Query);
      const unidad1Doc = unidad1Snapshot.docs[0].data();

      console.log("unidad 1:", unidad1Doc.id);
      const listaunidades = [];
      listaunidades.push(unidad1Doc.id);
      setListaunidades(listaunidades);
      console.log("id de unidades:", listaunidades);

      const unidad2Query = query(
        collection(db, "Unidades"),
        where("orden", "==", 2)
      );

      const unidad2Snapshot = await getDocs(unidad2Query);
      const unidad2Doc = unidad2Snapshot.docs[0].data();

      console.log("unidad 2:", unidad2Doc.id);
      listaunidades.push(unidad2Doc.id);
      setListaunidades(listaunidades);
      console.log("id de unidades:", listaunidades);

      const unidad3Query = query(
        collection(db, "Unidades"),
        where("orden", "==", 3)
      );

      const unidad3Snapshot = await getDocs(unidad3Query);
      const unidad3Doc = unidad3Snapshot.docs[0].data();
      console.log("unidad 3:", unidad3Doc.id);

      listaunidades.push(unidad3Doc.id);
      setListaunidades(listaunidades);
      console.log("id de unidades:", listaunidades);

      const unidad4Query = query(
        collection(db, "Unidades"),
        where("orden", "==", 4)
      );

      const unidad4Snapshot = await getDocs(unidad4Query);
      const unidad4Doc = unidad4Snapshot.docs[0].data();
      console.log("unidad 4:", unidad4Doc.id);

      listaunidades.push(unidad4Doc.id);
      setListaunidades(listaunidades);
      console.log("id de unidades:", listaunidades);

      const unidad5Query = query(
        collection(db, "Unidades"),
        where("orden", "==", 5)
      );

      const unidad5Snapshot = await getDocs(unidad5Query);
      const unidad5Doc = unidad5Snapshot.docs[0].data();
      console.log("unidad 5:", unidad5Doc.id);

      listaunidades.push(unidad5Doc.id);
      setListaunidades(listaunidades);
      console.log("id de unidades:", listaunidades);

      console.log("lista de todas las unidades:", listaunidades);

      const ejerciciosU1Query = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", listaunidades[0])
      );
      const ejerciciosU1Snapshot = await getDocs(ejerciciosU1Query);
      const ejerciciosU1Doc = ejerciciosU1Snapshot.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 1:", ejerciciosU1Doc.length);

      var idEjerciciosU1 = ejerciciosU1Doc.map((ejercicio) => ejercicio.id);
      setIdEjerciciosUnidad1(idEjerciciosU1);
      console.log("id de ejercicios para unidad 1:", idEjerciciosU1);

      const ejerciciosU2Query = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", listaunidades[1])
      );
      const ejerciciosU2Snapshot = await getDocs(ejerciciosU2Query);
      const ejerciciosU2Doc = ejerciciosU2Snapshot.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 2:", ejerciciosU2Doc.length);

      var idEjerciciosU2 = ejerciciosU2Doc.map((ejercicio) => ejercicio.id);
      setIdEjerciciosUnidad2(idEjerciciosU2);
      console.log("id de ejercicios para unidad 2:", idEjerciciosU2);

      const ejerciciosU3Query = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", listaunidades[2])
      );
      const ejerciciosU3Snapshot = await getDocs(ejerciciosU3Query);
      const ejerciciosU3Doc = ejerciciosU3Snapshot.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 3:", ejerciciosU3Doc.length);

      var idEjerciciosU3 = ejerciciosU3Doc.map((ejercicio) => ejercicio.id);
      setIdEjerciciosUnidad3(idEjerciciosU3);
      console.log("id de ejercicios para unidad 3:", idEjerciciosU3);

      const ejerciciosU4Query = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", listaunidades[3])
      );
      const ejerciciosU4Snapshot = await getDocs(ejerciciosU4Query);
      const ejerciciosU4Doc = ejerciciosU4Snapshot.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 4:", ejerciciosU4Doc.length);

      var idEjerciciosU4 = ejerciciosU4Doc.map((ejercicio) => ejercicio.id);
      setIdEjerciciosUnidad4(idEjerciciosU4);
      console.log("id de ejercicios para unidad 4:", idEjerciciosU4);

      const ejerciciosU5Query = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", listaunidades[4])
      );
      const ejerciciosU5Snapshot = await getDocs(ejerciciosU5Query);
      const ejerciciosU5Doc = ejerciciosU5Snapshot.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 5:", ejerciciosU5Doc.length);

      var idEjerciciosU5 = ejerciciosU5Doc.map((ejercicio) => ejercicio.id);
      setIdEjerciciosUnidad5(idEjerciciosU5);
      console.log("id de ejercicios para unidad 5:", idEjerciciosU5);

      const ejerciciosUnidad = [
        ejerciciosU1Doc.length,
        ejerciciosU2Doc.length,
        ejerciciosU3Doc.length,
        ejerciciosU4Doc.length,
        ejerciciosU5Doc.length,
      ];
      setEjerciciosUnidad(ejerciciosUnidad);
      console.log("ejercicios por unidad:", ejerciciosUnidad);

      const sum = ejerciciosUnidad.reduce((a, b) => a + b, 0);
      console.log("suma de los valores del array:", sum);

      // almacenar los id de los ejercicios de cada unidad por la cantidad de ejercicios que tiene cada unidad
      /* var lista = []; */

      /* if (idEjerciciosUnidad.length <= ejerciciosUnidad.length) {
        for (let i = 0; i < ejerciciosU1Doc.length; i++) {
          lista = [idEjerciciosU1[i]];
        }
        idEjerciciosUnidad.push(lista);
        setIdEjerciciosUnidad(idEjerciciosUnidad);
        console.log("id de ejercicios por unidad:", idEjerciciosUnidad);

        for (let i = 0; i < ejerciciosU2Doc.length; i++) {
          lista = [idEjerciciosU2[i]];
        }
        idEjerciciosUnidad.push(lista);
        setIdEjerciciosUnidad(idEjerciciosUnidad);
        console.log("id de ejercicios por unidad:", idEjerciciosUnidad);

        for (let i = 0; i < ejerciciosU3Doc.length; i++) {
          lista = [idEjerciciosU3[i]];
        }
        idEjerciciosUnidad.push(lista);
        setIdEjerciciosUnidad(idEjerciciosUnidad);
        console.log("id de ejercicios por unidad:", idEjerciciosUnidad);

        for (let i = 0; i < ejerciciosU4Doc.length; i++) {
          lista = [idEjerciciosU4[i]];
        }
        idEjerciciosUnidad.push(lista);
        setIdEjerciciosUnidad(idEjerciciosUnidad);
        console.log("id de ejercicios por unidad:", idEjerciciosUnidad);

        for (let i = 0; i < ejerciciosU5Doc.length; i++) {
          lista = [idEjerciciosU5[i]];
        }
        idEjerciciosUnidad.push(lista);
        setIdEjerciciosUnidad(idEjerciciosUnidad);
        console.log("id de ejercicios por unidad:", idEjerciciosUnidad);
      } */
      /* idEjerciciosU1,
        idEjerciciosU2,
        idEjerciciosU3,
        idEjerciciosU4,
        idEjerciciosU5, */
      var lista = []; // lista de id de ejercicios por unidad
      lista = lista.concat(
        idEjerciciosU1,
        idEjerciciosU2,
        idEjerciciosU3,
        idEjerciciosU4,
        idEjerciciosU5
      );
      setIdEjerciciosUnidad(lista); // almacenamiento de los id de los ejercicios por unidad
      console.log("id de ejercicios por unidad ULTIMO:", idEjerciciosUnidad);

      // quiero hacer un blucle para almacenar los id de los ejercicios de cada unidad por la cantidad de ejercicios que tiene cada unidad
      ComprobarProgreso();
      setCargandoDatos(false);
    } catch (error) {
      console.error("Error al obtener los datos del alumno:", error);
    }
  }

  useEffect(() => {
    obtenerDatos();
    buscarprogreso();
  }, []);

  async function ComprobarProgreso() {
    for (let i = 0; i < sum; i++) {
      // Inicializa el progreso en 0 para todas las unidades en cada iteración
      let progresoUnidad1 = 0;
      let progresoUnidad2 = 0;
      let progresoUnidad3 = 0;
      let progresoUnidad4 = 0;
      let progresoUnidad5 = 0;

      for (let j = 0; j < idEjerciciosUnidad.length; j++) {
        if (progresoTotal[i] == idEjerciciosUnidad1[j]) {
          progresoUnidad1++; // Aumenta el progreso de la unidad 1
        }
        if (progresoTotal[i] == idEjerciciosUnidad2[j]) {
          progresoUnidad2++; // Aumenta el progreso de la unidad 2
        }
        if (progresoTotal[i] == idEjerciciosUnidad3[j]) {
          progresoUnidad3++; // Aumenta el progreso de la unidad 3
        }
        if (progresoTotal[i] == idEjerciciosUnidad4[j]) {
          progresoUnidad4++; // Aumenta el progreso de la unidad 4
        }
        if (progresoTotal[i] == idEjerciciosUnidad5[j]) {
          progresoUnidad5++; // Aumenta el progreso de la unidad 5
        }
      }

      // Actualiza los estados del progreso de las unidades
      setProgresoUnidad1(progresoUnidad1);
      setProgresoUnidad2(progresoUnidad2);
      setProgresoUnidad3(progresoUnidad3);
      setProgresoUnidad4(progresoUnidad4);
      setProgresoUnidad5(progresoUnidad5);
    }

    console.log("progreso unidad 1:", progresoUnidad1);
    console.log("progreso unidad 2:", progresoUnidad2);
    console.log("progreso unidad 3:", progresoUnidad3);
    console.log("progreso unidad 4:", progresoUnidad4);
    console.log("progreso unidad 5:", progresoUnidad5);
  }

  const sum = ejerciciosUnidad.reduce((a, b) => a + b, 0); // suma de los ejercicios por unidad
  console.log("suma de los valores del array:", sum);
  for (let i = 0; i < sum; i++) {
    if (progresoTotal[i] == idEjerciciosUnidad[i]) {
    }
  }
  console.log("id de ejercicios de unidad 1:", idEjerciciosUnidad1);
  console.log("id de ejercicios de unidad 2:", idEjerciciosUnidad2);
  console.log("id de ejercicios de unidad 3:", idEjerciciosUnidad3);
  console.log("id de ejercicios de unidad 4:", idEjerciciosUnidad4);
  console.log("id de ejercicios de unidad 5:", idEjerciciosUnidad5);
  console.log("PRUEBA:", listaunidades); // lista de id de unidades
  console.log("PRUEBA2:", ejerciciosUnidad); // lista de ejercicios por unidad
  console.log("PRUEBA3:", progresoTotal); // lista de ejercicios realizados por el alumno
  console.log("PRUEBA4:", idEjerciciosUnidad); // lista de id de ejercicios por unidad

  console.log("progreso unidad 1:", progresoUnidad1);
  console.log("progreso unidad 2:", progresoUnidad2);
  console.log("progreso unidad 3:", progresoUnidad3);
  console.log("progreso unidad 4:", progresoUnidad4);
  console.log("progreso unidad 5:", progresoUnidad5);

  /* console.log("id de alumno", idAlumno); */

  if (cargando || !mostrarPagina) {
    return (
      <h1 className="flex min-h-screen items-center justify-center">
        Cargando...
      </h1>
    );
  }

  // Función para eliminar un alumno
  const eliminarAlumno = async () => {
    try {
      // Eliminar alumno
      const profesorQuery = query(
        collection(db, "Profesor"),
        where("rut", "==", idprofesor)
      );
      console.log("rut de profesor", idprofesor);

      // codigo para obtener datos
      const querySnapshotProfesor = await getDocs(profesorQuery);

      if (!querySnapshotProfesor.empty) {
        // Si se encuentra el profesor, se elimina
        const profesor = querySnapshotProfesor.docs[0];
        const profesorRef = doc(db, "Profesor", profesor.id);

        console.log("profesor", profesor.id);
        // actualizar datos
        await updateDoc(profesorRef, {
          alumnos: arrayRemove(rutAlumno),
        });
      } else {
        console.log("No se encontro el profesor");
      }

      // Eliminar profesor asignado
      const estudianteQuery = query(
        collection(db, "Estudiante"),
        where("id", "==", alumnoID)
      );

      // codigo para obtener datos
      const querySnapshot = await getDocs(estudianteQuery);

      if (!querySnapshot.empty) {
        // Si se encuentra el alumno, se elimina
        const estudiante = querySnapshot.docs[0];
        const estudianteRef = doc(db, "Estudiante", estudiante.id);

        // actualizar datos
        await updateDoc(estudianteRef, {
          ProfesorAsignado: "",
        });
        navegar("/Profesor");
      } else {
        console.log("No se encontro el alumno");
      }
    } catch (error) {
      console.log(" Error al eliminar el alumno: ", error);
    }
  };

  //console.log("rut alumno:", rutAlumno);
  //console.log("rut profesor:", idprofesor);

  return (
    <div className="flex flex-col justify-center min-h-screen bg-blue-200">
      <Cabecera_2 />

      {/* Botón para volver a la página anterior */}
      <div className=" left-10 top-24">
        <BotonVolver direccion={"/Profesor"} />
      </div>

      <div className=" flex  mx-auto mt-10 p-4 items-center justify-center ">
        <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md px-8 py-3">
          <h1 className="text-4xl font-bold text-gray-700">
            {`${alumnoData.nombre} ${alumnoData.apellido}`}
          </h1>
          <h2 className="text-2xl font-bold text-gray-700">{alumnoData.rut}</h2>{" "}
          <p className="text-gray-600 mt-3">
            Progreso Total: {"52%" /* alumnoData.progreso */}
          </p>
          <div className="px-4 ml-2">
            <BarraProgreso progress={"52%" /* alumnoData.progreso */} />
          </div>
        </div>
        {/*  <TbTrashX
          className="h-10 w-10 ml-2  bg-red-600 rounded-full hover:bg-red-300 relative items-end justify-end "
          alt="Borrar alumno"
          onClick={eliminarAlumno}
        /> */}
      </div>
      <div className="flex">
        <div className=" flex-grow  mx-auto mt-10 p-4 ">
          <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md p-4">
            {" "}
            <p className="text-gray-600">
              Progreso Unidad 1: Números y operaciones
            </p>
            <div className="">
              <BarraProgreso progress={progresoUnidad1} />
            </div>
          </div>
        </div>

        <div className=" flex-grow  mx-auto mt-10 p-4 ">
          <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md p-4">
            {" "}
            <p className="text-gray-600">
              Progreso Unidad 2: Patrones y álgebra
            </p>
            <div className="">
              <BarraProgreso progress={progresoUnidad2} />
            </div>
          </div>
        </div>

        <div className=" flex-grow  mx-auto mt-10 p-4 ">
          <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md p-4">
            {" "}
            <p className="text-gray-600">Progreso Unidad 3: Geometría</p>
            <div className="">
              <BarraProgreso progress={progresoUnidad3} />
            </div>
          </div>
        </div>

        <div className=" flex-grow  mx-auto mt-10 p-4 ">
          <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md p-4">
            {" "}
            <p className="text-gray-600">Progreso Unidad 4: Medición</p>
            <div className="">
              <BarraProgreso progress={progresoUnidad4} />
            </div>
          </div>
        </div>

        <div className=" flex-grow  mx-auto mt-10 p-4 ">
          <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md p-4">
            {" "}
            <p className="text-gray-600">
              Progreso Unidad 5: Datos y probabilidades
            </p>
            <div className="">
              <BarraProgreso progress={progresoUnidad5} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <PieDePagina />
      </div>
    </div>
  );
}
