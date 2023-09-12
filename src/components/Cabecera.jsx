import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Importa el icono de usuario de FontAwesome

export function Cabecera() {
  const [menuUnidadesVisible, setMenuUnidadesVisible] = useState(false);

  const unidades = [
    { id: 1, nombre: "Unidad 1" },
    { id: 2, nombre: "Unidad 2" },
    { id: 3, nombre: "Unidad 3" },
    { id: 4, nombre: "Unidad 4" },
    { id: 5, nombre: "Unidad 5" },
    { id: 6, nombre: "Unidad 6" },
  ];

  let menuLeaveTimeout;

  // Funciones para mostrar y ocultar el menú de unidades
  const handleUnidadesHover = () => {
    setMenuUnidadesVisible(true);
  };

  // Función para ocultar el menú de unidades de manera asincrónica
  const handleMenuLeave = () => {
    menuLeaveTimeout = setTimeout(() => {
      setMenuUnidadesVisible(false);
    }, 1500); // Cambia el tiempo según tus preferencias
  };

  // Evitar que el menú se oculte cuando el cursor entra en él
  const handleMenuEnter = () => {
    clearTimeout(menuLeaveTimeout);
  };

  useEffect(() => {
    return () => {
      clearTimeout(menuLeaveTimeout);
    };
  }, []);

  return (
    <header className="bg-slate-300 fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center">
        {/* Logo o nombre de la plataforma */}
        <h1 className="text-2xl font-bold">Nombre de la Plataforma</h1>
      </div>
      <nav className="flex items-center space-x-4">
        {/* Enlaces de navegación */}
        <Link
          to="/"
          className="bg-green-500 hover:bg-green-300 px-4 py-2 rounded-full transition duration-300"
        >
          Inicio
        </Link>
        <div
          onMouseOver={handleUnidadesHover}
          onMouseLeave={handleMenuLeave}
          // Agregado para evitar que se oculte cuando el cursor entra en él
          className="relative inline-block text-left"
        >
          {/* Botón de "Unidades" */}
          <button
            // Agregado para evitar que se oculte cuando el cursor entra en él
            type="button"
            className="bg-green-500 hover:bg-green-300 px-4 py-2 rounded-full transition duration-1000"
          >
            Unidades
          </button>
          {/* Menú de unidades */}
          {menuUnidadesVisible && (
            <div
              onMouseOver={handleMenuEnter}
              className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
              <div className="py-1">
                {unidades.map((unidad) => (
                  <Link
                    key={unidad.id}
                    //to={`/unidad/${unidad.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {unidad.nombre}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <Link
          to="/recursos-mineduc"
          className="bg-green-500 hover:bg-green-300 px-4 py-2 rounded-full transition duration-300"
        >
          Recursos del Mineduc
        </Link>
        <Link
          to="/perfil"
          className="bg-green-500 hover:bg-green-300 px-4 py-2 rounded-full transition duration-300"
        >
          <FaUser /> {/* Icono de usuario */}
        </Link>
      </nav>
    </header>
  );
}
