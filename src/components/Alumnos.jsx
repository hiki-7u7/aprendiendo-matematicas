import {
  updateDoc,
  doc,
  collection,
  where,
  query,
  getDocs,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/firebase.js";

export function Alumnos(props) {
  const eliminarAlumno = async () => {
    try {
      // Eliminar alumno
      const profesorQuery = query(
        collection(db, "Profesor"),
        where("rut", "==", props.profesorAsignado)
      );
      console.log("rut de profespr", props.profesorAsignado);

      // codigo para obtener datos
      const querySnapshotProfesor = await getDocs(profesorQuery);

      if (!querySnapshotProfesor.empty) {
        // Si se encuentra el profesor, se elimina
        const profesor = querySnapshotProfesor.docs[0];
        const profesorRef = doc(db, "Profesor", profesor.id);

        console.log("profesor", profesor.id);
        // actualizar datos
        await updateDoc(profesorRef, {
          alumnos: arrayRemove(props.rut),
        });
      } else {
        console.log("No se encontro el profesor");
      }

      // Eliminar profesor asignado
      const estudianteQuery = query(
        collection(db, "Estudiante"),
        where("rut", "==", props.rut)
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

        // Actualizar lista de alumnos
        props.actualizarListaAlumnos(props.rut);
      } else {
        console.log("No se encontro el alumno");
      }
    } catch (error) {
      console.log(" Error al eliminar el alumno: ", error);
    }
  };

  return (
    <div className=" justify-center mt-10 ">
      <form className="flex  items-center">
        <p className="border-2 border-black rounded-2xl  p-1 m-1">
          {props.nombre} {props.apellido} - {props.rut}
        </p>
        <img
          className="h-5 w-5 ml-2 cursor-pointer bg-red-500 rounded-full hover:bg-red-300 "
          src="https://cdn-icons-png.flaticon.com/128/1617/1617543.png"
          alt="Borrar alumno"
          onClick={eliminarAlumno}
        />
      </form>
    </div>
  );
}
