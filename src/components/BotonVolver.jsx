import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imagen from "../assets/img/volver.png";

export function BotonVolver({ direccion }) {
  const navegar = useNavigate();
  const [error, setError] = useState(false);

  return (
    <div>
      <button onError={() => setError(true)} onClick={() => navegar(direccion)}>
        <img
          className="w-12 h-12 mt-3 ml-3 fixed left-10 top-16 bg-white rounded-full"
          onError={() => setError(true)}
          onClick={() => navegar(direccion)}
          src={
            error
              ? imagen
              : "https://cdn-icons-png.flaticon.com/128/4495/4495664.png"
          }
          alt="Volver"
        />
      </button>
    </div>
  );
}

//source:  https://cdn-icons-png.flaticon.com/128/4495/4495664.png
