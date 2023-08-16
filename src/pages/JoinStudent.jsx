import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { BotonVolver } from "../components/BotonVolver";
import { SelectRole } from "./SelectRole.jsx";
import { useLocation } from "react-router-dom";

export function JoinStudent() {
  //const navegar = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto ">
      <BotonVolver direccion="/Login" />
      <h1 className="text-center text-3xl font-bold py-2 ">Ver Estudiantes</h1>
      <form className="flex flex-row">
        <div className="mb-4">
          <label
            htmlFor="rut"
            className="block text-gray-700 mr-2 text-sm font-bold"
          >
            Rut del estudiante
          </label>
          <input
            type="text"
            name="rut"
            placeholder="xxx.xxx.xxx-x"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />
        </div>

        <div>
          <button className="bg-green-500 hover:bg-green-300  rounded-full px-2 focus:outline-none focus:shadow-outline ml-2 mt-7">
            +
          </button>
        </div>
      </form>
      <button className="bg-orange-500 hover:bg-orange-300  rounded-full px-2 focus:outline-none focus:shadow-outline">
        Registrar
      </button>
    </div>
  );
}
