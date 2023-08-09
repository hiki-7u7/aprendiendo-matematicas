import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BotonVolver } from "../components/BotonVolver";

export function SelectRole() {
  const [selectRol, setSelectRol] = useState({
    //"Seleccione el rol que desea registrar"
    rol: "",
  });

  const navegar = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectRol === "alumno") {
      navegar("/Register", { state: { rol: "alumno" } });
    } else if (selectRol === "profesor") {
      navegar("/Register", { state: { rol: "profesor" } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
      <BotonVolver direccion="/Login" />
      <h1 className=" text-center text-3xl font-bold py-2">
        Registro de Usuario
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 shadow-md rounded mx-auto px-8 pt-6 pb-8 mb-4 sm:w-1/2 lg:w-1/3 xl:w-1/4"
      >
        <div className="grid auto-rows-max">
          <div className="flex justify-center">
            <button
              className={`bg-purple-500 hover:bg-purple-300 rounded-full  focus:outline-none focus:shadow-outline px-2${
                selectRol === "alumno" ? "bg-purple-300" : ""
              }`}
              onClick={() => setSelectRol("alumno")}
            >
              <a>¿Eres Alumno?</a>
            </button>
          </div>

          <h3 className="text-center">o</h3>
          <div className="flex justify-center">
            <button
              className={`bg-purple-500 hover:bg-purple-300  rounded-full  focus:outline-none focus:shadow-outline px-2${
                selectRol === "profesor" ? "bg-purple-300" : ""
              }`}
              onClick={() => setSelectRol("profesor")}
            >
              <a>¿Eres Profesor?</a>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
