import React from "react";

export function ContRespCorrectas({ contador }) {
  return (
    <div className="absolute top-0 right-6 m-4 p-2 bg-green-500  text-white  justify-center items-center text-4xl ">
      Respuestas Correctas:
      <p className="flex justify-center items-center text-4xl">
        {contador} / 3
      </p>
    </div>
  );
}
