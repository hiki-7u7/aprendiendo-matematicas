// Objetivo: componente que permite proteger las rutas de la aplicacion
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

//funcion que exporta el componente RutaProtegida
export function RutaProtegida({ children }) {
  //funcion que permite manejar el contexto de autenticacion
  const { user, cargando } = useAuth();

  if (cargando) return <h1>Cargando...</h1>;

  if (!user) return <Navigate to="/Login" />;

  return <>{children}</>;
}
