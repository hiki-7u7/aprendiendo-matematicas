import React from "react";
import { toast } from "react-toastify";

export function Alert({ message }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2 text-center">
      <span className="sm-:inline block">
        {toast.error(message, {
          style: {
            backgroundColor: "#FFCDD2", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
            color: "#EF5350",
          },
          position: "top-center",
          autoClose: 4000,
          pauseOnHover: true,
        })}
      </span>
    </div>
  );
}
