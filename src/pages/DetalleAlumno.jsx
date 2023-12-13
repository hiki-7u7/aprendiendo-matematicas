import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { TbTrashX } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import { Cabecera_2 } from "../components/Cabecera_2.jsx";
import { PieDePagina } from "../components/PieDePagina.jsx";
import { BarraProgreso } from "../components/BarraProgreso.jsx";
import { BotonVolver } from "../components/BotonVolver.jsx";
import { 
  obtenerDatosAlumno, 
  obtenerEjercicios, 
  obtenerProgresoUnidades, 
  obtenerUnidadesIds 
} from '../helpers'
import { db } from "../firebase/firebase.js";


export function DetalleAlumno() {

  const { cargando } = useAuth();
 
  const [mostrarPagina, setMostrarPagina] = useState(false);
  const [alumnoData, setAlumnoData] = useState(null);
  const [unidades, setUnidades] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);
  const [porcentajes, setPorcentajes] = useState([]);
  

  const location = useLocation();
  const rutAlumno = location.state ? location.state.rutAlumno : null;
  const navegar = useNavigate();
  
  useEffect(()=>{
    obtenerDatosAlumno(rutAlumno).then( d => {
      setAlumnoData(d)
      setMostrarPagina(true);
    })
  },[])

  useEffect(()=>{
    obtenerUnidadesIds().then( u => {
      setUnidades(u)
    })
  },[])
  
  useEffect(()=>{
    if(unidades.length <= 0) return;
    obtenerEjercicios(unidades).then( e => {
      setEjercicios(e)
    })
  },[unidades])
  

  useEffect(()=>{
    if(ejercicios.length <= 0) return;
    obtenerProgresoUnidades(alumnoData, ejercicios).then( p => {
      setPorcentajes(p)
    })
  },[ejercicios])
 

  
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Función para ELIMINAR ALUMNO - LISTO Y FUNCIONANDO
  const eliminarAlumno = async () => {
    try {
      // Eliminar alumno
      const profesorQuery = query(
        collection(db, "Profesor"),
        where("rut", "==", alumnoData.alumno.ProfesorAsignado)
      );

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

  if (cargando || !mostrarPagina) {
    return (
      <h1 className="flex min-h-screen items-center justify-center">
        Cargando...
      </h1>
    );
  }
  
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
            {`${alumnoData.alumno.nombre} ${alumnoData.alumno.apellido}`}
          </h1>
          <h2 className="text-2xl font-bold text-gray-700">{alumnoData.alumno.rut}</h2>{" "}
          <p className="text-gray-600 mt-3">
            Progreso Total: {alumnoData.alumno.progreso}
          </p>
          <div className="px-4 ml-2">
            <BarraProgreso progress={alumnoData.alumno.progreso} />
          </div>
        </div>
        <TbTrashX
          className="h-10 w-10 ml-2  bg-red-600 rounded-full hover:bg-red-300 relative items-end justify-end "
          alt="Borrar alumno"
          onClick={eliminarAlumno}
        />
      </div>
      <div className="flex">
 

        { 
          porcentajes.map( (p) => (
            <div key={(p.unidad.id) + Math.random()} className=" flex-grow  mx-auto mt-10 p-4 ">
              <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md p-4">
                {" "}
                <p className="text-gray-600">
                  Progreso Unidad {p.unidad.orden}: {p.unidad.descripcion}
                </p>
                <div className="">
                  <BarraProgreso progress={p.porcentaje} />
                </div>
              </div>
            </div>
          ))
        }

      </div>

      <div className="absolute bottom-0 w-full">
        <PieDePagina />
      </div>
    </div>
  );
}



// import { useEffect, useState } from "react";
// import { useAuth } from "../context/authContext.jsx";
// import {
//   collection,
//   getDocs,
//   where,
//   query,
//   doc,
//   updateDoc,
//   arrayRemove,
// } from "firebase/firestore";
// import { db } from "../firebase/firebase.js";
// import { Cabecera_2 } from "../components/Cabecera_2.jsx";
// import { PieDePagina } from "../components/PieDePagina.jsx";
// import { BarraProgreso } from "../components/BarraProgreso.jsx"; // Importa un componente de barra de progreso
// import { BotonVolver } from "../components/BotonVolver.jsx";
// import { useLocation } from "react-router-dom";
// import { TbTrashX } from "react-icons/tb";
// import { useNavigate } from "react-router-dom";

// export function DetalleAlumno() {
//   const { cargando } = useAuth();
//   const [alumnoData, setAlumnoData] = useState([]);
//   const [mostrarPagina, setMostrarPagina] = useState(false);
//   const [idAlumno, setIdAlumno] = useState("");
//   const [progresoAlumno, setProgresoAlumno] = useState([]);
//   const [listaIdUnidades, setListaIdUnidades] = useState([]);
//   const [idprofesor, setIdprofesor] = useState("");

//   const [ejerciciosUnidad1, setEjerciciosUnidad1] = useState([]);
//   const [ejerciciosUnidad2, setEjerciciosUnidad2] = useState([]);
//   const [ejerciciosUnidad3, setEjerciciosUnidad3] = useState([]);
//   const [ejerciciosUnidad4, setEjerciciosUnidad4] = useState([]);
//   const [ejerciciosUnidad5, setEjerciciosUnidad5] = useState([]);

//   const [progresoUnidad1, setProgresoUnidad1] = useState(null);
//   const [progresoUnidad2, setProgresoUnidad2] = useState(null);
//   const [progresoUnidad3, setProgresoUnidad3] = useState(null);
//   const [progresoUnidad4, setProgresoUnidad4] = useState(null);
//   const [progresoUnidad5, setProgresoUnidad5] = useState(null);


//   const location = useLocation();
//   const rutAlumno = location.state ? location.state.rutAlumno : null;
//   const navegar = useNavigate();
    
//   useEffect( () => {
//       obtenerDatosAlumno().then( () => {
//         obtenerUnidades()
//       });
//   },[]);
  
//   useEffect( () => {
//     if(progresoAlumno.length <= 0) return;
//     obtenerProgresoUnidades(progresoAlumno);
//   },[progresoAlumno]);
  
//   useEffect(()=>{
//     if(listaIdUnidades.length<= 0) return;
//   },[listaIdUnidades])

//   async function obtenerDatosAlumno() {
//     try {
//       const alumnoQuery = query(
//         collection(db, "Estudiante"),
//         where("rut", "==", rutAlumno)
//       );
//       const alumnoSnapshot = await getDocs(alumnoQuery);
//       const alumnoDoc = alumnoSnapshot.docs[0].data();
//       if (!alumnoSnapshot.empty) {
//         setIdprofesor(alumnoDoc.ProfesorAsignado);
//         setAlumnoData(alumnoDoc);
//         setMostrarPagina(true);
//         setIdAlumno(alumnoDoc.id);
//       }

//       const progresoQuery = query(
//         collection(db, "ProgresoEstudiante"),
//         where("estudianteId", "==", alumnoDoc.id)
//       );
//       const progresoSnapshot = await getDocs(progresoQuery);
//       console.log(progresoSnapshot.docs[0].data())

//       if (!progresoSnapshot.empty) {
//         const progresoAlumnoDoc = progresoSnapshot.docs[0].data();
//         setProgresoAlumno(progresoAlumnoDoc.idEjercicios);
//       }
//     } catch (error) {
//       console.error("Error al obtener los datos del alumno:", error);
//     }
//   }

//   async function obtenerUnidades() {
//     try {
//       const unidadesQuery = query(collection(db, "Unidades"));
//       const unidadesSnapshot = await getDocs(unidadesQuery);
//       const unidades = unidadesSnapshot.docs.map((doc) => doc.data());

//       const OrdenUnidades = unidades.sort((a, b) => a.orden - b.orden);

//       const idsUnidades = OrdenUnidades.map((unidad) => unidad.id);
//       setListaIdUnidades(idsUnidades);
//       await obtenerEjercicios(idsUnidades);
//     } catch (error) {
//       console.error("Error al obtener las unidades:", error);
//     }
//   }

//   async function obtenerEjercicios(listaIdUnidades) {
//     try {

//       const ConsultaEjerciciosUnidad1 = query(
//         collection(db, "Ejercicios"),
//         where("unidadesId", "==", listaIdUnidades[0])
//       );

//       const EjerciciosUnidad1 = await getDocs(ConsultaEjerciciosUnidad1);

//       const EjerciciosUnidad1Data = EjerciciosUnidad1.docs.map((doc) =>
//         doc.data()
//       );

//       const OrdenEjerciciosUnidad1 = EjerciciosUnidad1Data.sort(
//         (a, b) => a.orden - b.orden
//       );

//       const idsEjerciciosUnidad1 = OrdenEjerciciosUnidad1.map(
//         (ejercicio) => ejercicio.id
//       );

//       let lista_ids = idsEjerciciosUnidad1.map((id) => id);
//       setEjerciciosUnidad1(lista_ids);

//       const ConsultaEjerciciosUnidad2 = query(
//         collection(db, "Ejercicios"),
//         where("unidadesId", "==", listaIdUnidades[1])
//       );

//       const EjerciciosUnidad2 = await getDocs(ConsultaEjerciciosUnidad2);

//       const EjerciciosUnidad2Data = EjerciciosUnidad2.docs.map((doc) =>
//         doc.data()
//       );

//       const OrdenEjerciciosUnidad2 = EjerciciosUnidad2Data.sort(
//         (a, b) => a.orden - b.orden
//       );

//       let lista_2_ids = OrdenEjerciciosUnidad2.map((ejercicio) => ejercicio.id);
//       setEjerciciosUnidad2(lista_2_ids);

//       const ConsultaEjerciciosUnidad3 = query(
//         collection(db, "Ejercicios"),
//         where("unidadesId", "==", listaIdUnidades[2])
//       );

//       const EjerciciosUnidad3 = await getDocs(ConsultaEjerciciosUnidad3);

//       const EjerciciosUnidad3Data = EjerciciosUnidad3.docs.map((doc) =>
//         doc.data()
//       );

//       const OrdenEjerciciosUnidad3 = EjerciciosUnidad3Data.sort(
//         (a, b) => a.orden - b.orden
//       );

//       let lista_3_ids = OrdenEjerciciosUnidad3.map((ejercicio) => ejercicio.id);
//       console.log(lista_3_ids)
//       setEjerciciosUnidad3(lista_3_ids);

//       const ConsultaEjerciciosUnidad4 = query(
//         collection(db, "Ejercicios"),
//         where("unidadesId", "==", listaIdUnidades[3])
//       );

//       const EjerciciosUnidad4 = await getDocs(ConsultaEjerciciosUnidad4);

//       const EjerciciosUnidad4Data = EjerciciosUnidad4.docs.map((doc) =>
//         doc.data()
//       );

//       const OrdenEjerciciosUnidad4 = EjerciciosUnidad4Data.sort(
//         (a, b) => a.orden - b.orden
//       );

//       let lista_4_ids = OrdenEjerciciosUnidad4.map((ejercicio) => ejercicio.id);
//       setEjerciciosUnidad4(lista_4_ids);

//       const ConsultaEjerciciosUnidad5 = query(
//         collection(db, "Ejercicios"),
//         where("unidadesId", "==", listaIdUnidades[4])
//       );

//       const EjerciciosUnidad5 = await getDocs(ConsultaEjerciciosUnidad5);

//       const EjerciciosUnidad5Data = EjerciciosUnidad5.docs.map((doc) =>
//         doc.data()
//       );

//       const OrdenEjerciciosUnidad5 = EjerciciosUnidad5Data.sort(
//         (a, b) => a.orden - b.orden
//       );

//       let lista_5_ids = OrdenEjerciciosUnidad5.map((ejercicio) => ejercicio.id);
//       setEjerciciosUnidad5(lista_5_ids);

//     } catch (error) {
//       console.error("Error al obtener los ejercicios:", error);
//     }
//   }

//   function obtenerProgresoUnidades(progresoAlumno) {

//     console.log('progresoAlumno', progresoAlumno)

//     const contadorUnidad1 = progresoAlumno.filter((ejercicio) =>
//       ejerciciosUnidad1.includes(ejercicio)
//     ).length;

//     console.log(contadorUnidad1)

//     let progresoUnidad1 = (contadorUnidad1 / ejerciciosUnidad1.length) * 100;
//     progresoUnidad1 = Math.round(progresoUnidad1);
//     progresoUnidad1 = progresoUnidad1 + "%";

//     console.log(progresoUnidad1)


//     setProgresoUnidad1(progresoUnidad1);

//     const contadorUnidad2 = progresoAlumno.filter((ejercicio) =>
//       ejerciciosUnidad2.includes(ejercicio)
//     ).length;


//     let progresoUnidad2 = (contadorUnidad2 / ejerciciosUnidad2.length) * 100;

//     progresoUnidad2 = Math.round(progresoUnidad2);
//     progresoUnidad2 = progresoUnidad2 + "%";

//     setProgresoUnidad2(progresoUnidad2);

//     const contadorUnidad3 = progresoAlumno.filter((ejercicio) =>
//       ejerciciosUnidad3.includes(ejercicio)
//     ).length;


//     let progresoUnidad3 = (contadorUnidad3 / ejerciciosUnidad3.length) * 100;

//     progresoUnidad3 = Math.round(progresoUnidad3);
//     progresoUnidad3 = progresoUnidad3 + "%";

//     setProgresoUnidad3(progresoUnidad3);

//     const contadorUnidad4 = progresoAlumno.filter((ejercicio) =>
//       ejerciciosUnidad4.includes(ejercicio)
//     ).length;


//     let progresoUnidad4 = (contadorUnidad4 / ejerciciosUnidad4.length) * 100;

//     progresoUnidad4 = Math.round(progresoUnidad4);
//     progresoUnidad4 = progresoUnidad4 + "%";

//     setProgresoUnidad4(progresoUnidad4);

//     const contadorUnidad5 = progresoAlumno.filter((ejercicio) =>
//       ejerciciosUnidad5.includes(ejercicio)
//     ).length;


//     let progresoUnidad5 = (contadorUnidad5 / ejerciciosUnidad5.length) * 100;

//     progresoUnidad5 = Math.round(progresoUnidad5);
//     progresoUnidad5 = progresoUnidad5 + "%";

//     setProgresoUnidad5(progresoUnidad5);
//   }

//   if (cargando || !mostrarPagina) {
//     return (
//       <h1 className="flex min-h-screen items-center justify-center">
//         Cargando...
//       </h1>
//     );
//   }
//   //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//   // Función para ELIMINAR ALUMNO - LISTO Y FUNCIONANDO
//   const eliminarAlumno = async () => {
//     try {
//       // Eliminar alumno
//       const profesorQuery = query(
//         collection(db, "Profesor"),
//         where("rut", "==", idprofesor)
//       );
//       console.log("rut de profesor", idprofesor);

//       // codigo para obtener datos
//       const querySnapshotProfesor = await getDocs(profesorQuery);

//       if (!querySnapshotProfesor.empty) {
//         // Si se encuentra el profesor, se elimina
//         const profesor = querySnapshotProfesor.docs[0];
//         const profesorRef = doc(db, "Profesor", profesor.id);

//         console.log("profesor", profesor.id);
//         // actualizar datos
//         await updateDoc(profesorRef, {
//           alumnos: arrayRemove(rutAlumno),
//         });
//       } else {
//         console.log("No se encontro el profesor");
//       }

//       // Eliminar profesor asignado
//       const estudianteQuery = query(
//         collection(db, "Estudiante"),
//         where("rut", "==", rutAlumno)
//       );

//       // codigo para obtener datos
//       const querySnapshot = await getDocs(estudianteQuery);

//       if (!querySnapshot.empty) {
//         // Si se encuentra el alumno, se elimina
//         const estudiante = querySnapshot.docs[0];
//         const estudianteRef = doc(db, "Estudiante", estudiante.id);

//         // actualizar datos
//         await updateDoc(estudianteRef, {
//           ProfesorAsignado: "",
//         });
//         navegar("/Profesor");
//       } else {
//         console.log("No se encontro el alumno");
//       }
//     } catch (error) {
//       console.log(" Error al eliminar el alumno: ", error);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center min-h-screen bg-blue-200">
//       <Cabecera_2 />

//       {/* Botón para volver a la página anterior */}
//       <div className=" left-10 top-24">
//         <BotonVolver direccion={"/Profesor"} />
//       </div>

//       <div className=" flex  mx-auto mt-10 p-4 items-center justify-center ">
//         <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md px-8 py-3">
//           <h1 className="text-4xl font-bold text-gray-700">
//             {`${alumnoData.nombre} ${alumnoData.apellido}`}
//           </h1>
//           <h2 className="text-2xl font-bold text-gray-700">{alumnoData.rut}</h2>{" "}
//           <p className="text-gray-600 mt-3">
//             Progreso Total: {alumnoData.progreso}
//           </p>
//           <div className="px-4 ml-2">
//             <BarraProgreso progress={alumnoData.progreso} />
//           </div>
//         </div>
//         <TbTrashX
//           className="h-10 w-10 ml-2  bg-red-600 rounded-full hover:bg-red-300 relative items-end justify-end "
//           alt="Borrar alumno"
//           onClick={eliminarAlumno}
//         />
//       </div>
//       <div className="flex">
//         <div className=" flex-grow  mx-auto mt-10 p-4 ">
//           <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md p-4">
//             {" "}
//             <p className="text-gray-600">
//               Progreso Unidad 1: Números y operaciones
//             </p>
//             <div className="">
//               <BarraProgreso progress={progresoUnidad1} />
//             </div>
//           </div>
//         </div>

//         <div className=" flex-grow  mx-auto mt-10 p-4 ">
//           <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md p-4">
//             {" "}
//             <p className="text-gray-600">
//               Progreso Unidad 2: Patrones y álgebra
//             </p>
//             <div className="">
//               <BarraProgreso progress={progresoUnidad2} />
//             </div>
//           </div>
//         </div>

//         <div className=" flex-grow  mx-auto mt-10 p-4 ">
//           <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md p-4">
//             {" "}
//             <p className="text-gray-600">Progreso Unidad 3: Geometría</p>
//             <div className="">
//               <BarraProgreso progress={progresoUnidad3} />
//             </div>
//           </div>
//         </div>

//         <div className=" flex-grow  mx-auto mt-10 p-4 ">
//           <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md p-4">
//             {" "}
//             <p className="text-gray-600">Progreso Unidad 4: Medición</p>
//             <div className="">
//               <BarraProgreso progress={progresoUnidad4} />
//             </div>
//           </div>
//         </div>

//         <div className=" flex-grow  mx-auto mt-10 p-4 ">
//           <div className="flex flex-col items-center justify-center bg-white border-2 shadow-md rounded-md p-4">
//             {" "}
//             <p className="text-gray-600">
//               Progreso Unidad 5: Datos y probabilidades
//             </p>
//             <div className="">
//               <BarraProgreso progress={progresoUnidad5} />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-0 w-full">
//         <PieDePagina />
//       </div>
//     </div>
//   );
// }
