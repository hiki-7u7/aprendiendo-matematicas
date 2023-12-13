import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const obtenerDatosAlumno = async( rutAlumno ) => {
  try {

    const alumnoQuery = query(
      collection(db, "Estudiante"),
      where("rut", "==", rutAlumno)
    );
    
    const alumnoSnapshot = await getDocs(alumnoQuery);
    const alumnoDoc = {id: alumnoSnapshot.docs[0].id, ...alumnoSnapshot.docs[0].data()}

    const progresoQuery = query(
      collection(db, "ProgresoEstudiante"),
      where("estudianteId", "==", alumnoDoc.id)
    );
    
    const progresoSnapshot = await getDocs(progresoQuery);
    const progresoDoc = progresoSnapshot.docs[0].data()


    return {
      alumno: alumnoDoc,
      progreso: progresoDoc
    }

  } catch (error) {
    console.error("Error al obtener los datos del alumno:", error);
  }
}