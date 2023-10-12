import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider, createDndContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { Cabecera } from "../components/Cabecera";
import { PieDePagina } from "../components/PieDePagina";

const RNDContext = createDndContext(HTML5Backend);

function Numero({ number, index, moveNumero }) {
  const [, ref] = useDrag({
    type: "NUMERO",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "NUMERO",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveNumero(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="bg-blue-200 p-4 m-2">
      {number}
    </div>
  );
}

export function Ejercicio_1_8() {
  const [numeros, setNumeros] = useState([3, 1, 2, 4, 5]);

  const moveNumero = (fromIndex, toIndex) => {
    const updatedNumeros = [...numeros];
    const [movedNumero] = updatedNumeros.splice(fromIndex, 1);
    updatedNumeros.splice(toIndex, 0, movedNumero);
    setNumeros(updatedNumeros);
  };

  return (
    <DndProvider context={RNDContext}>
      <Cabecera />

      <div className="min-h-screen">
        <div
          className="text-gray-900 py-8 text-center mt-10"
          style={{ backgroundColor: "#FF5C5C" }}
        >
          <h1 className="text-3xl font-semibold">
            Ordena los números de menor a mayor
          </h1>
        </div>

        <div className="container mx-auto mt-8 p-4 text-center">
          <div className="mb-6">
            <div className="flex flex-wrap">
              {numeros.map((numero, index) => (
                <Numero
                  key={index}
                  number={numero}
                  index={index}
                  moveNumero={moveNumero}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <PieDePagina />
    </DndProvider>
  );
}
