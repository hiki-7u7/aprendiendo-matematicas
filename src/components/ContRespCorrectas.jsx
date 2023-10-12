import React from "react";

export function ContRespCorrectas({ contador }) {
  return (
    <div className="absolute top-0 right-6 m-4 p-2 bg-green-500 rounded-xl shadow-lg text-white border-2 border-gray-400  justify-center items-center text-4xl ">
      Respuestas Correctas:
      <p className="flex justify-center items-center text-4xl">
        {contador} / 3
      </p>
    </div>
  );
}
