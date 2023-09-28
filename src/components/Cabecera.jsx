import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Importa el icono de usuario de FontAwesome
import { useAuth } from "../context/authContext.jsx"; // Importar el contexto de autenticación

export function Cabecera() {
  const { CerrarSesion } = useAuth(); // Importar función para cerrar sesión
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuUnidadesVisible, setMenuUnidadesVisible] = useState(false);
  const [perfilMenuVisible, setPerfilMenuVisible] = useState(false); // Agregar estado para el menú de perfil

  const unidades = [
    { id: 1, nombre: "Unidad 1: Números y operaciones" },
    { id: 2, nombre: "Unidad 2: Patrones y álgebra" },
    { id: 3, nombre: "Unidad 3: Geometría" },
    { id: 4, nombre: "Unidad 4: Medición" },
    { id: 5, nombre: "Unidad 5: Datos y probabilidades" },
  ];

  // Funciones para mostrar y ocultar el menú principal
  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
    setMenuUnidadesVisible(false); // Asegurarse de que el menú de unidades esté oculto
  };

  // Funciones para mostrar y ocultar el menú de unidades
  const handleUnidadesClick = () => {
    setMenuUnidadesVisible(!menuUnidadesVisible);
    setMenuVisible(true); // Asegurarse de que el menú principal esté oculto
  };

  // Funciones para mostrar y ocultar el menú de perfil
  const handlePerfilClick = () => {
    setPerfilMenuVisible(!perfilMenuVisible);
    setMenuVisible(true); // Asegurarse de que el menú principal esté oculto
    setMenuUnidadesVisible(false); // Asegurarse de que el menú de unidades esté oculto
  };

  // Función para cerrar sesión
  const handlelogout = async () => {
    await CerrarSesion();
  };

  return (
    <header className="bg-slate-300 fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center">
        {/* Logo o nombre de la plataforma */}
        <h1 className="text-2xl font-bold">Nombre de la Plataforma</h1>
      </div>
      <nav className="hidden md:flex items-center space-x-4">
        {/* Enlaces de navegación */}
        <Link
          to="/"
          className="bg-green-500 hover:bg-green-300 px-4 py-2 rounded-full transition duration-300"
        >
          Inicio
        </Link>
        <Link
          to="/recursos-mineduc"
          className="bg-green-500 hover:bg-green-300 px-4 py-2 rounded-full transition duration-300"
        >
          Recursos del Mineduc
        </Link>
        {/* Menú de unidades */}
        <div className="relative inline-block text-left">
          <button
            onClick={handleUnidadesClick}
            className="bg-green-500 hover:bg-green-300 px-4 py-2 rounded-full transition duration-1000"
          >
            Unidades
          </button>
          {menuUnidadesVisible && (
            <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {unidades.map((unidad) => (
                  <Link
                    key={unidad.id}
                    to={`/unidad/${unidad.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {unidad.nombre}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Menú de perfil */}
        <div className="relative inline-block text-left">
          <button
            onClick={handlePerfilClick}
            className="bg-green-500 hover:bg-green-300 px-4 py-2 rounded-full transition duration-1000"
          >
            <FaUser /> {/* Icono de usuario */}
          </button>
          {perfilMenuVisible && (
            <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <Link
                  to="/perfil"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Ir a Perfil
                </Link>

                <Link
                  onClick={handlelogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cerrar Sesión
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Mostrar en pantallas pequeñas */}
      <div className="md:hidden">
        <button
          onClick={handleMenuClick}
          className="text-3xl text-green-500 hover:text-green-300 focus:outline-none"
        >
          &#9776;
        </button>
        {menuVisible && (
          <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <Link
                to="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Inicio
              </Link>
              <Link
                to="/recursos-mineduc"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Recursos del Mineduc
              </Link>
              {/* Menú de unidades en versión móvil */}
              <div className="relative inline-block text-left">
                <button
                  onClick={handleUnidadesClick}
                  className="px-4 py-2 rounded-full transition duration-1000"
                >
                  Unidades
                </button>
                {menuUnidadesVisible && (
                  <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {unidades.map((unidad) => (
                        <Link
                          key={unidad.id}
                          to={`/unidad/${unidad.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {unidad.nombre}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Menú de perfil en versión móvil */}
              <div className="relative inline-block text-left">
                <button
                  onClick={handlePerfilClick}
                  className="px-4 py-2 rounded-full transition duration-1000"
                >
                  <FaUser />
                </button>
                {perfilMenuVisible && (
                  <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Ir a Perfil
                      </Link>
                      <Link
                        onClick={handlelogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Cerrar Sesión
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
