//importacion de librerias y hooks
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { BotonVolver } from "../components/BotonVolver";

//funcion que exporta el componente Register
export function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    rol: "alumno",
  });

  //funcion que permite registrar un usuario
  const { Registrarse } = useAuth();

  //funcion que permite navegar entre paginas
  const navegar = useNavigate();

  //funcion que permite manejar los errores
  const [error, setError] = useState();

  //funcion que permite manejar los cambios en el formulario
  const handlechange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  //funcion que permite manejar el envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    //validacion de campos vacios
    try {
      await Registrarse(user.email, user.password);
      const docRef = await addDoc(collection(db, "usuarios"), {
        email: user.email,
        rol: user.rol,
      });
      console.log("Document written with ID: ", docRef.id);
      navegar("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/email-already-in-use") {
        setError("El email ya esta registrado");
      } else if (error.code === "auth/invalid-email") {
        setError("El email no es válido");
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres");
      } else if (error.code === "auth/operation-not-allowed") {
        setError("No se pudo crear el usuario");
      }
    }
  };

  //retorno del componente
  return (
    <div className="w-full max-w-sm m-auto">
      {error && <Alert message={error} />}
      <BotonVolver direccion="/SelectRole" />
      <h1 className="text-center text-3xl font-bold py-2">
        Registro de Usuario
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 mr-2 text-sm font-bold"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="ejemplo@email.com"
            onChange={handlechange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 mr-2 text-sm font-bold"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handlechange}
            placeholder="******"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />
        </div>

        <button className="bg-green-500 hover:bg-green-300  rounded-full px-2 focus:outline-none focus:shadow-outline">
          Registrar
        </button>
      </form>
    </div>
  );
}
