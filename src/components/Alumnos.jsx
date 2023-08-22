import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useLocation } from "react-router-dom";

export function Alumnos(props) {
  console.log("Props recibidos");
  return (
    <div className="h-auto w-auto justify-center mt-10">
      <form>
        <p>
          {props.nombre} {props.apellido} - {props.rut}
        </p>
      </form>
    </div>
  );
}
