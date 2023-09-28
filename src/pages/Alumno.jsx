import React from "react";
import { Link } from "react-router-dom";
import { Cabecera } from "../components/Cabecera.jsx";
import { PieDePagina } from "../components/PieDePagina.jsx";
import { BiMath } from "react-icons/bi";
import { MdPattern } from "react-icons/md";
import { GoCircle } from "react-icons/go";
import { PiRulerBold } from "react-icons/pi";
import { BsDice6 } from "react-icons/bs";

const unidades = [
  { id: 1, nombre: "Unidad 1: Números y operaciones", icono: <BiMath /> },
  { id: 2, nombre: "Unidad 2: Patrones y álgebra", icono: <MdPattern /> },
  { id: 3, nombre: "Unidad 3: Geometría", icono: <GoCircle /> },
  { id: 4, nombre: "Unidad 4: Medición", icono: <PiRulerBold /> },
  { id: 5, nombre: "Unidad 5: Datos y probabilidades", icono: <BsDice6 /> },
];

export function Alumno() {
  return (
    <div className="flex flex-col min-h-screen">
      <Cabecera />

      <div className="flex-1 flex items-center justify-center ">
        <div className="max-w-screen-xl mx-auto ">
          <div className="grid grid-rows-1 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-4 gap-4 mt-10 p-4 ">
            {unidades.map((unidad) => (
              <div
                key={unidad.id}
                className="flex flex-grow bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center mb-5 "
              >
                <div className=" items-center justify-center mb-2">
                  <Link to={`/unidad/${unidad.id}`}>
                    <button className=" text-4xl mr-2 ">{unidad.icono}</button>
                  </Link>
                </div>
                <Link to={`/unidad/${unidad.id}`}>
                  <h2 className="text-2xl font-semibold">{unidad.nombre}</h2>
                </Link>
                <Link
                  to={`/unidad/${unidad.id}`}
                  className="text-blue-500 hover:underline mt-1 ml-2 block text-xl"
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
