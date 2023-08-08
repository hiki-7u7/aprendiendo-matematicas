//importacion de librerias y hooks
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import imag1 from "../assets/img/ojo_cerrado.png";
import imag2 from "../assets/img/ojo_abierto.png";

//funcion que exporta el componente Login
export function Login() {
  //estado que permite manejar el usuario
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //funcion que permite registrar un usuario
  const { iniciarSesion } = useAuth();

  //funcion que permite navegar entre paginas
  const navegar = useNavigate();

  //funcion que permite manejar los errores
  const [error, setError] = useState();

  //funcion que permite manejar los cambios en el formulario
  const handlechange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  //funcion que permite manejar el estado de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
    <div className="flex flex-col items-center justify-center w-full h-screen ">
      {error && <Alert message={error} />}
      <h1 className="text-center text-3xl font-bold py-2">Iniciar Sesión</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto sm:w-1/2 lg:w-1/3 xl:w-1/4"
      >
        <div className="mb-4">
          <label htmlFor="email" className="mr-2 font-fold">
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

        <label htmlFor="password" className="">
          Contraseña
        </label>
        <div className="flex mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            onChange={handlechange}
            placeholder="******"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />
          <button
            type="button"
            onClick={handleShowPassword}
            className="bg-gray-200 hover:bg-gray-300 rounded-full px-2 mt-2 focus:outline-none focus:shadow-outline ml-2"
          >
            {showPassword ? (
              <img id="img1" src={imag1} alt="Ocultar contraseña" />
            ) : (
              <img id="img2" src={imag2} alt="Mostrar contraseña" />
            )}
          </button>
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
