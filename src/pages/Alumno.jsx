import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cabecera } from "../components/Cabecera.jsx";
import { PieDePagina } from "../components/PieDePagina.jsx";

const unidades = [
  { id: 1, nombre: "Unidad 1: Números y operaciones" },
  { id: 2, nombre: "Unidad 2: Patrones y álgebra" },
  { id: 3, nombre: "Unidad 3: Geometría" },
  { id: 4, nombre: "Unidad 4: Medición" },
  { id: 5, nombre: "Unidad 5: Datos y probabilidades" },
];

export function Alumno() {
  return (
    <div className="flex flex-col min-h-screen">
      <Cabecera />

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-bold mt-16  text-center">
            Unidades del curso
          </h1>

          <div className="grid grid-rows-1 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4 gap-4 mt-4 p-4">
            {unidades.map((unidad) => (
              <div
                key={unidad.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center"
              >
                <h2 className="text-2xl font-semibold">{unidad.nombre}</h2>
                <Link
                  to={`/unidad/${unidad.id}`}
                  className="text-blue-500 hover:underline mt-4 block text-xl"
                >
                  Ver unidad
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PieDePagina />
    </div>
  );
}
