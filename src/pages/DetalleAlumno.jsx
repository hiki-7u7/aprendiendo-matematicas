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

  const location = useLocation();
  const rutAlumno = location.state ? location.state.rutAlumno : null;
  const navegar = useNavigate();

  const [progresoUnidad1, setProgresoUnidad1] = useState(0);
  /* const [progresoUnidad2, setProgresoUnidad2] = useState(0);
  const [progresoUnidad3, setProgresoUnidad3] = useState(0);
  const [progresoUnidad4, setProgresoUnidad4] = useState(0);
  const [progresoUnidad5, setProgresoUnidad5] = useState(0);*/
  const [progresoTotal, setProgresoTotal] = useState("");
  const [idUnidades, setIdUnidades] = useState([]);
  const [ejerciciosUnidad, setEjerciciosUnidad] = useState([]);
  const [idEjerciciosUnidad, setIdEjerciciosUnidad] = useState([]);
  const [listaunidades, setListaunidades] = useState([]);

  /*  const [idEjerciciosUnidad2, setIdEjerciciosUnidad2] = useState([]);
  const [idEjerciciosUnidad3, setIdEjerciciosUnidad3] = useState([]);
  const [idEjerciciosUnidad4, setIdEjerciciosUnidad4] = useState([]);
  const [idEjerciciosUnidad5, setIdEjerciciosUnidad5] = useState([]);
  const [idEjerciciosUnidad6, setIdEjerciciosUnidad6] = useState([]); */

  // Función para obtener los datos de los alumnos del profesor
  const obtenerDatos = async () => {
    try {
      // Obtener datos del alumno seleccionado para mostrar en la página

      const alumnoQuery = query(
        collection(db, "Estudiante"),
        where("rut", "==", rutAlumno)
      );
      const alumnoSnapshot = await getDocs(alumnoQuery);

      if (!alumnoSnapshot.empty) {
        console.log("ingrese al if porque no esta vacio el alumno");
        const alumnoDoc = alumnoSnapshot.docs[0].data();
        setAlumnoData(alumnoDoc); // alamcenamiento de los datos del alumno
        setIdprofesor(alumnoDoc.ProfesorAsignado); // id del profesor asignado al alumno para utilizar en la eliminacion del alumno
        /* setProgreso(alumnoDoc.progreso); */
        setMostrarPagina(true);
        setIdAlumno(alumnoDoc.id); // id del alumno para utilizar en la eliminacion del alumno y en la obtencion del progreso en los ejercicios
      }

      // Obtener progreso del alumno en los ejercicios

      const progresoQuery = query(
        collection(db, "ProgresoEstudiante"),
        where("estudianteId", "==", idAlumno)
      );
      const progresoSnapshot = await getDocs(progresoQuery);

      // Obtener progreso total
      if (!progresoSnapshot.empty) {
        console.log("ingrese al if porque no esta vacio el progreso");

        const progresoDoc = progresoSnapshot.docs[0].data(); // alamcenamiento de los datos del progreso del alumno

        console.log("progreso de ejercicios:", progresoDoc.idEjercicios);

        setProgresoTotal(progresoDoc.idEjercicios); // alamcenamiento del array de todos los ejercicios del alumno registrados
      }

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

      setCargandoDatos(false);
    } catch (error) {
      console.error("Error al obtener los datos del alumno:", error);
    }
  };

  // funcion para obtener el progreso de los ejercicios del alumno en cada unidad, debe comparar el id de los ejercicios del alumno con el id de los ejercicios de cada unidad

  // Función para procesar un ejercicio
  /*  console.log("id de unidades:", idUnidades);

      const unidad2Query = query(
        collection(db, "Unidades"),
        where("orden", "==", 2)
      );

      const unidad2Snapshot = await getDocs(unidad2Query);
      const unidad2Doc = unidad2Snapshot.docs[0].data();

      console.log("unidad 2:", unidad2Doc.id);
      idUnidades.push(unidad2Doc.id);
      console.log("id de unidades:", idUnidades);

      const unidad3Query = query(
        collection(db, "Unidades"),
        where("orden", "==", 3)
      );

      const unidad3Snapshot = await getDocs(unidad3Query);
      const unidad3Doc = unidad3Snapshot.docs[0].data();
      console.log("unidad 3:", unidad3Doc.id);

      idUnidades.push(unidad3Doc.id);
      console.log("id de unidades:", idUnidades);

      const unidad4Query = query(
        collection(db, "Unidades"),
        where("orden", "==", 4)
      );

      const unidad4Snapshot = await getDocs(unidad4Query);
      const unidad4Doc = unidad4Snapshot.docs[0].data();
      console.log("unidad 4:", unidad4Doc.id);

      idUnidades.push(unidad4Doc.id);
      console.log("id de unidades:", idUnidades);

      const unidad5Query = query(
        collection(db, "Unidades"),
        where("orden", "==", 5)
      );

      const unidad5Snapshot = await getDocs(unidad5Query);
      const unidad5Doc = unidad5Snapshot.docs[0].data();
      console.log("unidad 5:", unidad5Doc.id);

      idUnidades.push(unidad5Doc.id);
      console.log("id de unidades:", idUnidades);

      console.log("lista de todas las unidades:", idUnidades);

      const ejerciciosU1Query = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", idUnidades[0])
      );
      const ejerciciosU1Snapshot = await getDocs(ejerciciosU1Query);
      const ejerciciosU1Doc = ejerciciosU1Snapshot.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 1:", ejerciciosU1Doc.length);

      var numEjerciciosU1 = ejerciciosU1Doc.length;

      const ejerciciosU2Query = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", idUnidades[1])
      );
      const ejerciciosU2Snapshot = await getDocs(ejerciciosU2Query);
      const ejerciciosU2Doc = ejerciciosU2Snapshot.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 2:", ejerciciosU2Doc.length);

      var numEjerciciosU2 = ejerciciosU2Doc.length;

      const ejerciciosU3Query = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", idUnidades[2])
      );
      const ejerciciosU3Snapshot = await getDocs(ejerciciosU3Query);
      const ejerciciosU3Doc = ejerciciosU3Snapshot.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 3:", ejerciciosU3Doc.length);

      var numEjerciciosU3 = ejerciciosU3Doc.length;

      const ejerciciosU4Query = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", idUnidades[3])
      );
      const ejerciciosU4Snapshot = await getDocs(ejerciciosU4Query);
      const ejerciciosU4Doc = ejerciciosU4Snapshot.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 4:", ejerciciosU4Doc.length);

      var numEjerciciosU4 = ejerciciosU4Doc.length;

      const ejerciciosU5Query = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", idUnidades[4])
      );
      const ejerciciosU5Snapshot = await getDocs(ejerciciosU5Query);
      const ejerciciosU5Doc = ejerciciosU5Snapshot.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 5:", ejerciciosU5Doc.length);

      var numEjerciciosU5 = ejerciciosU5Doc.length; */

  // console.log("Unidad:", unidadDoc);

  // Función para procesar todos los ejercicios en progresoTotal
  /*  function procesarEjerciciosEnProgreso() {
    for (const ejercicioId of progresoTotal) {
      procesarEjercicio(ejercicioId);
    }
  }  */

  useEffect(() => {
    obtenerDatos();
  }, []);

  /* // obtener la unidades del alumno
  const obtenerEjerciciosdeUnidades = async () => {
    await obtenerDatos();
    try {
      const qUnidad1 = query(
        collection(db, "Unidades"),
        where("orden", "==", 1)
      );

      const querySnapshot1 = await getDocs(qUnidad1);
      const unidad1 = querySnapshot1.docs.map((doc) => doc.data());
      console.log("unidad 1:", unidad1[0].id);

      const qUnidad2 = query(
        collection(db, "Unidades"),
        where("orden", "==", 2)
      );

      const querySnapshot2 = await getDocs(qUnidad2);
      const unidad2 = querySnapshot2.docs.map((doc) => doc.data());
      console.log("unidad 2:", unidad2[0].id);

      const qUnidad3 = query(
        collection(db, "Unidades"),
        where("orden", "==", 3)
      );

      const querySnapshot3 = await getDocs(qUnidad3);
      const unidad3 = querySnapshot3.docs.map((doc) => doc.data());
      console.log("unidad 3:", unidad3[0].id);

      const qUnidad4 = query(
        collection(db, "Unidades"),
        where("orden", "==", 4)
      );

      const querySnapshot4 = await getDocs(qUnidad4);
      const unidad4 = querySnapshot4.docs.map((doc) => doc.data());
      console.log("unidad 4:", unidad4[0].id);

      const qUnidad5 = query(
        collection(db, "Unidades"),
        where("orden", "==", 5)
      );

      const querySnapshot5 = await getDocs(qUnidad5);
      const unidad5 = querySnapshot5.docs.map((doc) => doc.data());
      console.log("unidad 5:", unidad5[0].id);

      const listaunidades = [
        unidad1[0].id,
        unidad2[0].id,
        unidad3[0].id,
        unidad4[0].id,
        unidad5[0].id,
      ];
      setListaunidades(listaunidades);
      console.log("unidades:", listaunidades);

      const qEjerciciosU1 = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", unidad1[0].id)
      );

      const querySnapshotEjerciciosU1 = await getDocs(qEjerciciosU1);
      const ejerciciosU1 = querySnapshotEjerciciosU1.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 1:", ejerciciosU1.length);

      const qEjerciciosU2 = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", unidad2[0].id)
      );

      const querySnapshotEjerciciosU2 = await getDocs(qEjerciciosU2);
      const ejerciciosU2 = querySnapshotEjerciciosU2.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 2:", ejerciciosU2.length);

      const qEjerciciosU3 = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", unidad3[0].id)
      );

      const querySnapshotEjerciciosU3 = await getDocs(qEjerciciosU3);
      const ejerciciosU3 = querySnapshotEjerciciosU3.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 3:", ejerciciosU3.length);

      const qEjerciciosU4 = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", unidad4[0].id)
      );

      const querySnapshotEjerciciosU4 = await getDocs(qEjerciciosU4);
      const ejerciciosU4 = querySnapshotEjerciciosU4.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 4:", ejerciciosU4.length);

      const qEjerciciosU5 = query(
        collection(db, "Ejercicios"),
        where("unidadesId", "==", unidad5[0].id)
      );

      const querySnapshotEjerciciosU5 = await getDocs(qEjerciciosU5);
      const ejerciciosU5 = querySnapshotEjerciciosU5.docs.map((doc) =>
        doc.data()
      );
      console.log("ejercicios para unidad 5:", ejerciciosU5);

      const ejerciciosUnidad = [
        ejerciciosU1.length,
        ejerciciosU2.length,
        ejerciciosU3.length,
        ejerciciosU4.length,
        ejerciciosU5.length,
      ];
      setEjerciciosUnidad(ejerciciosUnidad);

      const sum = ejerciciosUnidad.reduce((a, b) => a + b, 0);
      console.log("suma de los valores del array:", sum);

      // quiero hacer un blucle para almacenar los id de los ejercicios de cada unidad por la cantidad de ejercicios que tiene cada unidad
      const listaEjerciciosUnidad = [];
      for (let i = 0; i < sum; i++) {
        const qEjerciciosUnidad = query(
          collection(db, "Ejercicios"),
          where("unidadesId", "==", listaunidades[i])
        );
        const querySnapshotEjerciciosUnidad = await getDocs(qEjerciciosUnidad);
        const ejerciciosUnidad = querySnapshotEjerciciosUnidad.docs.map((doc) =>
          doc.data()
        );
        console.log("ejercicios para unidad 1:", ejerciciosUnidad.length);
        listaEjerciciosUnidad.push(ejerciciosUnidad);
        setListaunidades(listaEjerciciosUnidad);
      }
      console.log("lista de ejercicios por unidad:", listaEjerciciosUnidad);

      // como sumar los valores dentro de un array
      // const sum = listaEjerciciosUnidad.reduce((a, b) => a + b, 0);
      // console.log("suma de los valores del array:", sum);
      // quiero sumar los valores de cada array de ejercicios por unidad
      // const sum = listaEjerciciosUnidad.reduce((a, b) => a + b, 0);
      // console.log("suma de los valores del array:", sum);

      /* const listaEjerciciosUnidad = [
        ejerciciosU1[0].id,
        ejerciciosU2[0].id,
        ejerciciosU3[0].id,
        ejerciciosU4[0].id,
        ejerciciosU5[0].id,
      ]; */

  /*  console.log("ejerciciosUnidad TERMINADO:", ejerciciosUnidad);
      console.log("unidades de  los ejercicios:", listaunidades);
      console.log("ejercicios de la unidad 1:", ejerciciosU1);
      console.log("se obtuvieron los datos de ejercicios por unidad");
    } catch (error) {
      console.error(
        "Error al obtener los datos de ejercicios por unidad:",
        error
      );
    }
  };

  useEffect(() => {
    obtenerEjerciciosdeUnidades();
  }, []); */

  // como se hace un for para recorrer un array de objetos
  /*  const listaEjerciciosUnidad = [];
  for (let i = 0; i < listaunidades.length; i++) {
    const qEjerciciosUnidad = query(
      collection(db, "Ejercicios"),
      where("unidadesId", "==", listaunidades[i])
    );
    const querySnapshotEjerciciosUnidad = await getDocs(qEjerciciosUnidad);
    const ejerciciosUnidad = querySnapshotEjerciciosUnidad.docs.map((doc) =>
      doc.data()
    );
    console.log("ejercicios para unidad 1:", ejerciciosUnidad.length);
    listaEjerciciosUnidad.push(ejerciciosUnidad);
    setListaunidades(listaEjerciciosUnidad);
  }
  console.log("lista de ejercicios por unidad:", listaEjerciciosUnidad); */

  const sum = ejerciciosUnidad.reduce((a, b) => a + b, 0);
  console.log("suma de los valores del array:", sum);
  for (let i = 0; i < sum; i++) {
    if (progresoTotal[i] == idEjerciciosUnidad[i]) {
    }
  }

  console.log("PRUEBA:", listaunidades); // lista de id de unidades
  console.log("PRUEBA2:", ejerciciosUnidad); // lista de ejercicios por unidad
  console.log("PRUEBA3:", progresoTotal); // lista de ejercicios realizados por el alumno
  console.log("PRUEBA4:", idEjerciciosUnidad); // lista de id de ejercicios por unidad

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
        where("rut", "==", rutAlumno)
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
            Progreso Total: {alumnoData.progreso}
          </p>
          <div className="px-4 ml-2">
            <BarraProgreso progress={alumnoData.progreso} />
          </div>
        </div>
        <TbTrashX
          className="h-10 w-10 ml-2  bg-red-600 rounded-full hover:bg-red-300 relative items-end justify-end "
          alt="Borrar alumno"
          onClick={eliminarAlumno}
        />
      </div>
      <div className="flex">
        <div className=" flex-grow  mx-auto mt-10 p-4 ">
          <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md p-4">
            {" "}
            <p className="text-gray-600">
              Progreso Unidad 1: Números y operaciones
            </p>
            <div className="">
              <BarraProgreso progress={alumnoData.progreso} />
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
              <BarraProgreso progress={alumnoData.progreso} />
            </div>
          </div>
        </div>

        <div className=" flex-grow  mx-auto mt-10 p-4 ">
          <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md p-4">
            {" "}
            <p className="text-gray-600">Progreso Unidad 3: Geometría</p>
            <div className="">
              <BarraProgreso progress={alumnoData.progreso} />
            </div>
          </div>
        </div>

        <div className=" flex-grow  mx-auto mt-10 p-4 ">
          <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md p-4">
            {" "}
            <p className="text-gray-600">Progreso Unidad 4: Medición</p>
            <div className="">
              <BarraProgreso progress={alumnoData.progreso} />
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
              <BarraProgreso progress={alumnoData.progreso} />
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
