import React from "react";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { addDoc } from "firebase/firestore";

export function CrearColecciones() {
  // Función para verificar si un nombre ya existe en la colección
  const verificarNombre = async (coleccion, nombre) => {
    const q = query(coleccion, where("nombre", "==", nombre));
    const snapshot = await getDocs(q);
    return snapshot.empty; // Devuelve true si no se encuentra ningún documento con el mismo nombre
  };

  // Función para generar un ID único
  const generarId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  // Función para verificar si un ID ya existe en la colección
  const verificarIdUnico = async (coleccion, id) => {
    const q = query(coleccion, where("id", "==", id));
    const snapshot = await getDocs(q);
    return snapshot.empty; // Devuelve true si no se encuentra ningún documento con el mismo ID
  };

  // Función para crear la colección "Unidades" y documentos
  const crearColeccionUnidades = async () => {
    // Datos de ejemplo para las unidades
    const unidades = [
      {
        id: generarId(), // Generar un ID único
        nombre: "Unidad 1: Números y operaciones",
        descripcion: "Descripción de la Unidad 1",
        imagenes: ["imagen1.jpg", "imagen2.jpg"],
        videos: ["video1.mp4"],
        orden: 1,
      },
      {
        id: generarId(), // Generar un ID único
        nombre: "Unidad 2: Patrones y álgebra",
        descripcion: "Descripción de la Unidad 2",
        imagenes: ["imagen3.jpg", "imagen4.jpg"],
        videos: ["video2.mp4"],
        orden: 2,
      },
      {
        id: generarId(), // Generar un ID único
        nombre: "Unidad 3: Geometría y medida",
        descripcion: "Descripción de la Unidad 3",
        imagenes: ["imagen5.jpg", "imagen6.jpg"],
        videos: ["video3.mp4"],
        orden: 3,
      },
      {
        id: generarId(), // Generar un ID único
        nombre: "Unidad 4: Estadística y probabilidad",
        descripcion: "Descripción de la Unidad 4",
        imagenes: ["imagen7.jpg", "imagen8.jpg"],
        videos: ["video4.mp4"],
        orden: 4,
      },
      {
        id: generarId(), // Generar un ID único
        nombre: "Unidad 5: Números y operaciones",
        descripcion: "Descripción de la Unidad 5",
        imagenes: ["imagen9.jpg", "imagen10.jpg"],
        videos: ["video5.mp4"],
        orden: 5,
      },
    ];

    const unidadesRef = collection(db, "Unidades");

    for (const unidad of unidades) {
      // Verifica si el ID es único antes de agregarlo
      if (await verificarIdUnico(unidadesRef, unidad.id)) {
        await addDoc(unidadesRef, unidad);
      } else {
        console.log(`El ID ${unidad.id} ya existe en la colección "Unidades".`);
      }
    }
  };

  // Función para crear la colección "Ejercicios" y documentos
  const crearColeccionEjercicios = async () => {
    //await crearColeccionUnidades(); // Crea la colección "Unidades" antes de crear la colección "Ejercicios"
    // Datos de ejemplo para los ejercicios

    // obtener el id de las unidades para poder agregarlos a los ejercicios
    const unidadesRef = collection(db, "Unidades"); // referencia a la coleccion de unidades
    const q = query(
      unidadesRef,
      where("nombre", "==", "Unidad 1: Números y operaciones")
    ); // consulta para obtener el id de la unidad 1
    const unidad = await getDocs(q); // obtener los datos de la unidad 1
    const datoUnidad_1 = unidad.docs[0].data(); // obtener el id de la unidad 1
    const idUnidad_1 = datoUnidad_1.id; // obtener el id de la unidad 1

    const q2 = query(
      unidadesRef,
      where("nombre", "==", "Unidad 2: Patrones y álgebra")
    );
    const unidad2 = await getDocs(q2);
    const datoUnidad_2 = unidad2.docs[0].data();
    const idUnidad_2 = datoUnidad_2.id;

    const q3 = query(unidadesRef, where("nombre", "==", "Unidad 3: Geometría"));
    const unidad3 = await getDocs(q3);
    const datoUnidad_3 = unidad3.docs[0].data();
    const idUnidad_3 = datoUnidad_3.id;

    const q4 = query(unidadesRef, where("nombre", "==", "Unidad 4: Medición"));
    const unidad4 = await getDocs(q4);
    const datoUnidad_4 = unidad4.docs[0].data();
    const idUnidad_4 = datoUnidad_4.id;

    const q5 = query(
      unidadesRef,
      where("nombre", "==", "Unidad 5: Datos y probabilidades")
    );
    const unidad5 = await getDocs(q5);
    const datoUnidad_5 = unidad5.docs[0].data();
    const idUnidad_5 = datoUnidad_5.id;

    /*  const q2 = query(unidadesRef, where("nombre", "==", "Unidad 2: Patrones y álgebra"));
    const unidad2 = await getDocs(q2);

    const q3 = query(unidadesRef, where("nombre", "==", "Unidad 3: Geometría y medida"));
    const unidad3 = await getDocs(q3);

    const q4 = query(unidadesRef, where("nombre", "==", "Unidad 4: Estadística y probabilidad"));
    const unidad4 = await getDocs(q4);

    const q5 = query(unidadesRef, where("nombre", "==", "Unidad 5: Números y operaciones"));
    const unidad5 = await getDocs(q5); */

    const ejercicios = [
      // 1
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 1
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 1: Contar imagenes entre 1 al 10",
        //descripcion: "Descripción del Ejercicio 1",
        //imagenes: ["imagen1.jpg", "imagen2.jpg"],
        orden: 1,
      },
      // 2
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 1
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 2: Contar y Marcar las Imágenes del 1 al 10",
        //descripcion: "Descripción del Ejercicio 2",
        //imagenes: ["imagen3.jpg", "imagen4.jpg"],
        orden: 2,
      },
      // 3
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 1
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 3: Contar entre 1 al 20",
        //descripcion: "Descripción del Ejercicio 3",
        //imagenes: ["imagen4.jpg", "imagen5.jpg"],
        orden: 3,
      },
      // 4
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 2
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 4: Ordena de menor a mayor (del 1 al 10)",
        //descripcion: "Descripción del Ejercicio 4",
        //imagenes: ["imagen6.jpg", "imagen7.jpg"],
        orden: 4,
      },
      // 5
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 2
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 5: Ordena de menor a mayor (del 11 al 20)",
        //descripcion: "Descripción del Ejercicio 5",
        //imagenes: ["imagen8.jpg", "imagen9.jpg"],
        orden: 5,
      },
      // 6
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 3
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 6: Ordena de menor a mayor (del 11 al 20)",
        //descripcion: "Descripción del Ejercicio 6",
        //imagenes: ["imagen10.jpg", "imagen11.jpg"],
        orden: 6,
      },
      // 7
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 3
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 7: Componer Números utilizando cubos",
        //descripcion: "Descripción del Ejercicio 7",
        //imagenes: ["imagen12.jpg", "imagen13.jpg"],
        orden: 7,
      },
      // 8
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 4
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 8: Componer Números utilizando manzanas",
        //descripcion: "Descripción del Ejercicio 8",
        //imagenes: ["imagen14.jpg", "imagen15.jpg"],
        orden: 8,
      },
      // 9
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 9: Descomponer Números",
        //descripcion: "Descripción del Ejercicio 9",
        //imagenes: ["imagen16.jpg", "imagen17.jpg"],
        orden: 9,
      },
      // 10
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 10: Descomponer Números utilizando manzanas",
        //descripcion: "Descripción del Ejercicio 10",
        orden: 10,
      },
      // 11
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 11: Identificar Unidades y Decenas entre 1 a 20",
        //descripcion: "Descripción del Ejercicio 11",
        orden: 11,
      },
      // 12
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 12: Suma del 0 al 5",
        // descripcion: "Descripción del Ejercicio 12",
        orden: 12,
      },
      // 13
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 13: Suma (Máximo 10)",
        //descripcion: "Descripción del Ejercicio 9",
        orden: 13,
      },
      // 14
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 14: Suma (Máximo 20)",
        //descripcion: "Descripción del Ejercicio 9",
        orden: 14,
      },
      // 15
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 15: Resta (Números menores o iguales a 5)",
        orden: 15,
      },
      // 16
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 16: Resta (Números menores o iguales a 10)",
        orden: 16,
      },
      // 17
      {
        unidadesId: idUnidad_1, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 17: Resta (Números menores o iguales a 20)",
        orden: 17,
      },
      // 1
      {
        unidadesId: idUnidad_2, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 1: Patrones con Figuras",
        orden: 1,
      },
      // 2
      {
        unidadesId: idUnidad_2, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 2: Patrones con Animales",
        orden: 2,
      },
      // 3
      {
        unidadesId: idUnidad_2, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 3: Patrones con Números",
        orden: 3,
      },
      // 4
      {
        unidadesId: idUnidad_2, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 4: Patrones del 1 al 10",
        orden: 4,
      },
      // 5
      {
        unidadesId: idUnidad_2, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 5: Patrones del 1 al 20",
        orden: 5,
      },
      // 6
      {
        unidadesId: idUnidad_2, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 6: Patrones del 1 al 20",
        orden: 6,
      },
      // 1
      {
        unidadesId: idUnidad_3, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 1: izquierda o derecha",
        orden: 1,
      },
      // 2
      {
        unidadesId: idUnidad_3, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre:
          "Ejercicio 2: ¿izquierda o derecha? Ubica el Árbol con Respecto a la Casa",
        orden: 2,
      },
      // 3
      {
        unidadesId: idUnidad_3, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 3: Reconocer nombre de las Figuras Geométricas 2D",
        orden: 3,
      },
      // 4
      {
        unidadesId: idUnidad_3, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 4: Reconocer imagen de las Figuras Geométricas 2D",
        orden: 4,
      },
      // 5
      {
        unidadesId: idUnidad_3, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 5: Reconocer nombre Figuras 3D",
        orden: 5,
      },
      // 6
      {
        unidadesId: idUnidad_3, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 6: Reconocer imagen de Figuras 3D",
        orden: 6,
      },
      // 1
      {
        unidadesId: idUnidad_4, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 1: Identificar y comparar la longitud de objetos",
        orden: 1,
      },
      // 1
      {
        unidadesId: idUnidad_5, // Reemplaza con el ID real de la unidad 5
        id: generarId(), // Generar un ID único
        nombre: "Ejercicio 1: Tabla pictórica comprensión de datos",
        orden: 1,
      },
      // Agrega más ejercicios según sea necesario
    ];

    const ejerciciosRef = collection(db, "Ejercicios");

    for (const ejercicio of ejercicios) {
      // Verifica si el ID es único antes de agregarlo
      if (
        // Verifica si el ID es único antes de agregarlo y si el nombre es único
        (await verificarIdUnico(ejerciciosRef, ejercicio.id)) === true &&
        (await verificarNombre(ejerciciosRef, ejercicio.nombre)) === true // Verifica si el nombre es único antes de agregarlo
      ) {
        await addDoc(ejerciciosRef, ejercicio); // si el ID y el nombre no existen, se agrega
      } else {
        // si el ID o el nombre ya existen, se muestra un mensaje en la consola
        console.log(
          `El ID ${ejercicio.id} ya existe en la colección "Ejercicios".`
        );
      }

      for (const unidad of ejercicios) {
        // Verifica si el nombre es único antes de agregarlo
        if ((await verificarNombre(ejerciciosRef, unidad.nombre)) === true) {
          // si el nombre no existe, se agrega
          await addDoc(ejerciciosRef, unidad);
        } else {
          console.log(
            `El nombre ${unidad.nombre} ya existe en la colección "Ejercicios".`
          );
        }
      }
    }

    console.log("Colección de ejercicios creada");
    console.log("ejercicios creados:", ejercicios.length);
    // quiero colocar un contador para saber cuantos ejercicios se crearon

    //console.log(ejercicios.length);
  };

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Función para crear la colección "ProgresoEstudiante" y documentos
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  /* const crearColeccionProgresoEstudiante = async () => {
    await crearColeccionEjercicios(); // Crea la colección "Ejercicios" antes de crear la colección "ProgresoEstudiante"

 */

  // Datos de ejemplo para el progreso del estudiante
  /* const progresoEstudiante = [
      {
        estudianteId: alumno.id, // Reemplaza con el ID real del estudiantes
        unidadesDisponibles: [true, false, false, false, false], // Unidades disponibles
        unidadesCompletadas: [false, false, false, false, false], // Unidades completadas
        ejerciciosDisponibles: [
          [true, false, false, false, false], // Ejercicios de la unidad 1
          [false, false, false, false, false], // Ejercicios de la unidad 2
          [false, false, false, false, false], // Ejercicios de la unidad 3
          [false, false, false, false, false], // Ejercicios de la unidad 4
          [false, false, false, false, false], // Ejercicios de la unidad 5
        ],
        ejerciciosCompletados: [
          [false, false, false, false, false], // Ejercicios de la unidad 1
          [false, false, false, false, false], // Ejercicios de la unidad 2
          [false, false, false, false, false], // Ejercicios de la unidad 3
          [false, false, false, false, false], // Ejercicios de la unidad 4
          [false, false, false, false, false], // Ejercicios de la unidad 5
        ],
      },
      {
        estudianteId: alumno.id, // Reemplaza con el ID real del estudiante
        unidadesId: unidad[1].id, // Reemplaza con el ID real de la unidad
        id: generarId(), // Generar un ID único
        unidadesDisponibles: [true, true, false, false, false], // Unidades disponibles
        unidadesCompletadas: [true, false, false, false, false], // Unidades completadas
        ejerciciosDisponibles: [
          [true, true, false, false, false], // Ejercicios de la unidad 1
          [true, true, false, false, false], // Ejercicios de la unidad 2
          [true, true, false, false, false], // Ejercicios de la unidad 3
          [true, true, false, false, false], // Ejercicios de la unidad 4
          [true, true, false, false, false], // Ejercicios de la unidad 5
        ],
        ejerciciosCompletados: [
          [true, false, false, false, false], // Ejercicios de la unidad 1
          [true, true, false, false, false], // Ejercicios de la unidad 2
          [true, true, false, false, false], // Ejercicios de la unidad 3
          [true, true, false, false, false], // Ejercicios de la unidad 4
          [true, true, false, false, false], // Ejercicios de la unidad 5
        ],
      },
      // Agrega más registros de progreso según sea necesario
    ]; */

  // crea la colección "ProgresoEstudiante"

  /*  const progresoEstudianteRef = collection(db, "ProgresoEstudiante");

    for (const progreso of progresoEstudiante) {
      if (await verificarIdUnico(progresoEstudianteRef, progreso.id)===true) && (await verificarEstudianteId(progresoEstudianteRef, progreso.estudianteId))===true)  { // Verifica si el ID es único antes de agregarlo y si el id del estudiante es único
        await addDoc(progresoEstudianteRef, progreso);
    } else {
        console.log(`El ID ${progreso.id} ya existe en la colección "ProgresoEstudiante".`);
        await updateDoc(progresoEstudianteRef, progreso);
      }
    }
  };
  */

  // Llama a las funciones para crear las colecciones y documentos
  const crearColeccionesFirestore = async () => {
    await crearColeccionEjercicios();
  };

  return (
    <div>
      <button onClick={crearColeccionesFirestore}>Crear Colecciones</button>
    </div>
  );
}
