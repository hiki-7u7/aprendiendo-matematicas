//importacion de librerias y hooks
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import imag1 from "../assets/img/ojo_cerrado.png";
import imag2 from "../assets/img/ojo_abierto.png";
import imag3 from "../assets/img/Fondo_Login2.png";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { CrearColecciones } from "../components/CrearColecciones";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  //funcion que permite manejar el estado de la contraseña
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //funcion que permite obtener los datos de la base de datos
  const verificarUsuario = async (e) => {
    e.preventDefault();
    const qEstudiante = query(
      collection(db, "Estudiante"),
      where("email", "==", user.email.toLowerCase())
    );
    const qProfesor = query(
      collection(db, "Profesor"),
      where("email", "==", user.email.toLowerCase())
    );

    const [estudianteSnapshot, profesorSnapshot] = await Promise.all([
      getDocs(qEstudiante),
      getDocs(qProfesor),
    ]);

    if (!estudianteSnapshot.empty) {
      // El email corresponde a un estudiante
      await iniciarSesion(user.email.toLowerCase(), user.password);
      navegar("/");
    } else if (!profesorSnapshot.empty) {
      // El email corresponde a un profesor
      await iniciarSesion(user.email.toLowerCase(), user.password);
      navegar("/Profesor");
    }
  };

  //funcion que permite manejar el envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    //validacion de campos vacios
    try {
      await iniciarSesion(user.email.toLowerCase(), user.password); // Iniciar sesion con Firebase Auth
      await verificarUsuario(e); // Verificar si el usuario es estudiante o profesor
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/email-already-in-use") {
        setError("El email ya esta registrado");
        toast.error("El email ya esta registrado", {
          style: {
            backgroundColor: "#FFCDD2", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
            color: "#EF5350",
          },
          position: "top-center",
          autoClose: 4000,
          pauseOnHover: true,
        });
      } else if (user.email === "" && user.password === "") {
        setError("Debe completar todos los campos");
        toast.error("Debe completar todos los campos", {
          style: {
            backgroundColor: "#FFCDD2", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
            color: "#EF5350",
          },
          position: "top-center",
          autoClose: 4000,
          pauseOnHover: true,
        });
      } else if (error.code === "auth/invalid-email") {
        setError("El email no es válido");
        toast.error("El email no es válido", {
          style: {
            backgroundColor: "#FFCDD2", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
            color: "#EF5350",
          },
          position: "top-center",
          autoClose: 4000,
          pauseOnHover: true,
        });
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres");
        toast.error("La contraseña debe tener al menos 6 caracteres", {
          style: {
            backgroundColor: "#FFCDD2", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
            color: "#EF5350",
          },
          position: "top-center",
          autoClose: 4000,
          pauseOnHover: true,
        });
      } else if (error.code === "auth/operation-not-allowed") {
        setError("No se pudo crear el usuario");
        toast.error("No se pudo crear el usuario", {
          style: {
            backgroundColor: "#FFCDD2", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
            color: "#EF5350",
          },
          position: "top-center",
          autoClose: 4000,
          pauseOnHover: true,
        });
      } else if (error.code === "auth/user-not-found") {
        setError("El usuario no existe");
        toast.error("El usuario no existe", {
          style: {
            backgroundColor: "#FFCDD2", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
            color: "#EF5350",
          },
          position: "top-center",
          autoClose: 4000,
          pauseOnHover: true,
        });
      } else if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
        toast.error("Contraseña incorrecta", {
          style: {
            backgroundColor: "#FFCDD2", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
            color: "#EF5350",
          },
          position: "top-center",
          autoClose: 4000,
          pauseOnHover: true,
        });
      } else if (error.code === "auth/too-many-requests") {
        setError(
          "Demasiados intentos de inicio de sesión fallidos. Intente nuevamente más tarde"
        );
        toast.error(
          "Demasiados intentos de inicio de sesión fallidos. Intente nuevamente más tarde",
          {
            style: {
              backgroundColor: "#FFCDD2", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
              color: "#EF5350",
            },
            position: "top-center",
            autoClose: 4000,
            pauseOnHover: true,
          }
        );
      } else if (error.code === "auth/network-request-failed") {
        setError("Error de conexión. Intente nuevamente más tarde");
        toast.error("Error de conexión. Intente nuevamente más tarde", {
          style: {
            backgroundColor: "#FFCDD2", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
            color: "#EF5350",
          },
          position: "top-center",
          autoClose: 4000,
          pauseOnHover: true,
        });
      } else if (error.code === "auth/quota-exceeded") {
        setError("Se ha superado el límite de solicitudes. Intente más tarde");
        toast.error(
          "Se ha superado el límite de solicitudes. Intente más tarde",
          {
            style: {
              backgroundColor: "#FFCDD2", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
              color: "#EF5350",
            },
            position: "top-center",
            autoClose: 4000,
            pauseOnHover: true,
          }
        );
      }
    }
  };

  //retorno del componente
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen bg-blue-200 bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${imag3})` }}
    >
      {/* boton de creacion de colecciones : unidades y ejercicios  */}
      {/* <div className="bg-white px-2 rounded-full mb-4">
        <CrearColecciones />
      </div> */}

      {/* {error && <Alert message={error} />} */}
      <h1 className="text-center text-3xl font-bold py-2 px-2 shadow-xl bg-slate-300 mb-3 rounded-full">
        Iniciar Sesión
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 shadow-xl rounded-xl px-8 pt-6 pb-8 mb-4 mx-auto sm:w-1/2 lg:w-1/3 xl:w-1/4"
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

        <label htmlFor="password">Contraseña</label>
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
            No tienes cuenta
            <Link
              to="/SelectRole"
              className="bg-orange-500 hover:bg-orange-300  rounded-full px-2 focus:outline-none focus:shadow-outline ml-2"
            >
              Registrate
            </Link>
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
