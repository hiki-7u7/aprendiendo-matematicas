// Objetivo: componente Home
import { useAuth } from "../context/authContext.jsx";

//funcion que exporta el componente Home
export function Home() {
  //funcion que permite manejar el contexto de autenticacion
  const { user, CerrarSesion, cargando } = useAuth();

  // funcion que permite validar si el usuario esta logueado
  const handlelogout = async () => {
    await CerrarSesion();
  };
  if (cargando) return <p>Cargando...</p>;

  return (
    <div className="w-full max-w-sm m-auto ">
      <h1>Home</h1>
      <p>Bienvenido {user.email}</p>
      <button className="bg-white rounded-full mg px-2" onClick={handlelogout}>
        Cerrar Sesion
      </button>
    </div>
  );
}
