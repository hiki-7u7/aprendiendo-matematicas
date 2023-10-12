import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Función para verificar si un correo electrónico ya está registrado en todas las colecciones
export const verificarEmailRegistrado = async (email) => {
  // Colecciones en las que deseas verificar el correo electrónico
  const colecciones = ["Estudiante", "Profesor"]; // Agrega aquí todas tus colecciones

  // Variable para almacenar si el correo está registrado en alguna colección
  let correoRegistrado = false;

  // Itera sobre las colecciones y verifica si el correo está registrado en alguna
  for (const coleccion of colecciones) {
    const q = query(collection(db, coleccion), where("email", "==", email));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Si la consulta devuelve algún resultado, marca el correo como registrado y sale del bucle
        correoRegistrado = true;
        break;
      }
    } catch (error) {
      console.error(
        `Error al verificar el correo electrónico en ${coleccion}:`,
        error
      );
    }
  }

  return correoRegistrado;
};
