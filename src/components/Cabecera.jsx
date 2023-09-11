import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Importa el icono de usuario de FontAwesome

export function Cabecera() {
  return (
    <header className="bg-slate-300 fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center">
        {/* Logo o nombre de la plataforma */}
        <h1 className=" text-2xl font-bold">Nombre de la Plataforma</h1>
      </div>
      <nav className="flex items-center space-x-4">
        {/* Enlaces de navegación */}
        <Link
          to="/"
          className="bg-green-500  hover:bg-green-300 px-4 py-2 rounded-full transition duration-300"
        >
          Inicio
        </Link>
        <Link
          to="/unidades"
          className="bg-green-500  hover:bg-green-300 px-4 py-2 rounded-full transition duration-300"
        >
          Unidades
        </Link>
        <Link
          to="/recursos-mineduc"
          className="bg-green-500  hover:bg-green-300 px-4 py-2 rounded-full transition duration-300"
        >
          Recursos del Mineduc
        </Link>
        <Link
          to="/perfil"
          className="bg-green-500  hover:bg-green-300 px-4 py-2 rounded-full transition duration-300"
        >
          <FaUser /> {/* Icono de usuario */}
        </Link>
      </nav>
    </header>
  );
}
