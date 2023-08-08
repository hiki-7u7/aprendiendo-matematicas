import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function BotonVolver({ direccion }) {
  const navegar = useNavigate();

  return (
    <div>
      <img
        className="w-12 h-12 mt-3 ml-3 absolute left-0 top-0 cursor-pointer"
        src="https://cdn-icons-png.flaticon.com/128/4495/4495664.png"
        alt="Volver"
        onClick={() => navegar(direccion)}
      />
    </div>
  );
}
