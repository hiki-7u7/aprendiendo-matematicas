import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const obtenerUnidadesIds = async() => {
  try {
    const unidadesQuery = query(collection(db, "Unidades")); //* no es necesario el query
    const unidadesSnapshot = await getDocs(unidadesQuery);
    const unidades = unidadesSnapshot.docs.map((doc) => doc.data());
    
    const ordenUnidades = unidades.sort((a, b) => a.orden - b.orden);
    
    return ordenUnidades

  } catch (error) {
    console.error("Error al obtener las unidades:", error);
  }
}