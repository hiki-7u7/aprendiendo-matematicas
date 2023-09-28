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
          className="w-12 h-12 mt-3 ml-3 absolute left-0 top-0 cursor-pointer"
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

// https://cdn-icons-png.flaticon.com/128/4495/4495664.png
