//importacion de librerias y hooks
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "./Alert";
import { useAuth } from "../context/authContext.jsx";

//funcion que exporta el componente Login
export function Login() {
  //estado que permite manejar el usuario
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //funcion que permite navegar entre paginas
  const navegar = useNavigate();

  //funcion que permite manejar los errores
  const [error, setError] = useState();

  //funcion que permite manejar el contexto de autenticacion
  const { iniciarSesion } = useAuth();

  //funcion que permite manejar los cambios en el formulario
  const handlechange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  //funcion que permite manejar el envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    //validacion de campos vacios
    try {
      await iniciarSesion(user.email, user.password);
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
      } else if (error.code === "auth/user-not-found") {
        setError("El usuario no existe");
      } else if (error.code === "auth/too-many-requests") {
        setError(
          "Demasiados intentos de inicio de sesión fallidos. Intente nuevamente más tarde"
        );
      }
    }
  };

  //retorno del componente
  return (
    <div className="w-full max-w-sm m-auto ">
      {error && <Alert message={error} />}
      <h1 className="text-center text-3xl font-bold py-2">Iniciar Sesión</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="email" className="mr-2 font-fold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="ejemplo@email.com"
            onChange={handlechange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handlechange}
            placeholder="******"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-green-500 hover:bg-green-300  rounded-full px-2 focus:outline-none focus:shadow-outline">
            Iniciar
          </button>
          <p className="ml-9">
            No tienes cuenta{" "}
            <Link
              to="/SelectRole"
              className="bg-orange-500 hover:bg-orange-300  rounded-full px-2 focus:outline-none focus:shadow-outline"
            >
              Registrada
            </Link>{" "}
          </p>
        </div>
        <a
          href="/ResetPassword"
          className="inline-block align-baseline font-bold text-blue-500 hover:text-blue-800 mt-5"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </form>
    </div>
  );
}
