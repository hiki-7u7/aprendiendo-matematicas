import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const obtenerEjercicios = async (listaIdUnidades = []) => {
  try {
    const consultasEjercicios = listaIdUnidades.map((unidad) => {
      return query(collection(db, "Ejercicios"), where("unidadesId", "==", unidad.id));
    });

    const ejerciciosUnidadPromesas = consultasEjercicios.map(async (consulta) => {
      const ejerciciosUnidad = await getDocs(consulta);
      const ejerciciosUnidadData = ejerciciosUnidad.docs.map((doc) => doc.data());
      const idsEjerciciosUnidad = ejerciciosUnidadData.map((ejercicio) => ejercicio.id);
      return idsEjerciciosUnidad;
    });

    const ejercicios = await Promise.all(
      listaIdUnidades.map(async (unidad, index) => {
        const ejerciciosUnidad = await ejerciciosUnidadPromesas[index];
        return { unidad, ejercicios: ejerciciosUnidad };
      })
    );

    return ejercicios;
  } catch (error) {
    console.error("Error al obtener los ejercicios:", error);
  }
};
