import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useLocation } from "react-router-dom";

export function Alumnos(props) {
  console.log("Props recibidos");
  return (
    <div className="flex justify-center mt-10">
      <form className="flex ">
        <p>
          {props.nombre} {props.apellido} - {props.rut}
        </p>
        <img
          className="h-5 w-5 ml-2 cursor-pointer mt-1"
          src="https://cdn-icons-png.flaticon.com/128/1617/1617543.png"
          alt="Borrar alumno"
        />
      </form>
    </div>
  );
}
