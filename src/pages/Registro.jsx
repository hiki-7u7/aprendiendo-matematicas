//importacion de librerias y hooks
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { BotonVolver } from "../components/BotonVolver";
import imag1 from "../assets/img/ojo_cerrado.png";
import imag2 from "../assets/img/ojo_abierto.png";
import { useLocation } from "react-router-dom";
import { verificarEmail } from "../components/VerificarEmail";
import imag3 from "../assets/img/Fondo_Login2.png";

//funcion que exporta el componente Registro
export function Registro() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    rol: "",
    rut: "",
    nombre: "",
    apellido: "",
  });

  //const [emailValido, setEmailValido] = useState(false);

  //funcion que permite obtener el rol del usuario
  const { state } = useLocation();

  //funcion que permite registrar un usuario
  const { Registrarse } = useAuth();

  //funcion que permite navegar entre paginas
  const navegar = useNavigate();

  //funcion que permite manejar los errores
  const [error, setError] = useState();

  // validar que el rut no se encuentre en la base de datos
  const validarRut = async (rut) => {
    const qEstudiante = query(
      collection(db, "Estudiante"),
      where("rut", "==", rut)
    );
    const qProfesor = query(
      collection(db, "Profesor"),
      where("rut", "==", rut)
    );

    const [estudianteSnapshot, profesorSnapshot] = await Promise.all([
      // esperar a que se resuelvan las dos promesas
      getDocs(qEstudiante),
      getDocs(qProfesor),
    ]);

    return estudianteSnapshot.empty && profesorSnapshot.empty; // si no hay documentos, el rut no se encuentra en la base de datos
  };

  // manejo de rut
  const handleRutChange = (e) => {
    let inputRut = e.target.value;

    // Limitar la cantidad máxima de caracteres permitidos (por ejemplo, 12)
    if (inputRut.length > 12) {
      inputRut = inputRut.substring(0, 12); // Truncar el valor a 12 caracteres
    }

    setUser({ ...user, rut: inputRut });
  };

  // formatear rut
  const formatearRut = (rut) => {
    // Eliminar cualquier carácter que no sea número o 'k'
    rut = rut.replace(/[^0-9kK]+/g, "");

    // Si el rut tiene al menos 2 caracteres, agrega puntos y guión
    if (rut.length > 1) {
      rut = rut.replace(/^(\d{1,2})(\d{3})(\d{3})([\dkK])$/, "$1.$2.$3-$4");
    } else if (rut.length === 1) {
      rut = rut.replace(/^(\d)([\dkK])$/, "$1-$2");
    }

    return rut;
  };

  // mayuscula al inicio de cada nombre y apellido
  const capitalizar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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

    // Validar que ningún campo esté vacío
    if (
      user.email === "" ||
      user.password === "" ||
      user.rut === "" ||
      user.nombre === "" ||
      user.apellido === ""
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // validar que el email no se encuentre en la base de datos
    /*   const validarEmail = async (email) => {
      const qEstudiante = query(
        collection(db, "Estudiante"),
        where("email", "==", email)
      );
      const qProfesor = query(
        collection(db, "Profesor"),
        where("email", "==", email)
      );

      const [estudianteSnapshot, profesorSnapshot] = await Promise.all([
        // esperar a que se resuelvan las dos promesas
        getDocs(qEstudiante),
        getDocs(qProfesor),
      ]);

      return estudianteSnapshot.empty && profesorSnapshot.empty; // si no hay documentos, el rut no se encuentra en la base de datos
    };

    const emailValido = await validarEmail(user.email); // verificar que el email no se encuentre en la base de datos

    if (!emailValido) {
      // si no es valido, mostrar error y retornar
      setError("Email no válido");
      return;
    } */

    const rutValido = await validarRut(user.rut); // verificar que el rut no se encuentre en la base de datos

    if (!rutValido) {
      // si no es valido, mostrar error y retornar
      setError("Rut no válido");
      return;
    }

    try {
      await Registrarse(user.email, user.password); // registrar usuario en firebase
      const newUser = {
        // crear objeto con los datos del usuario
        email: user.email,
        rol: state.rol,
        rut: formatearRut(user.rut),
        nombre: capitalizar(user.nombre),
        apellido: capitalizar(user.apellido),
      };

      if (state.rol === "alumno") {
        await addDoc(collection(db, "Estudiante"), newUser);

        navegar("/");
      } else if (state.rol === "profesor") {
        await addDoc(collection(db, "Profesor"), newUser);

        navegar("/JoinStudent");
      }
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
    <div
      className="flex flex-col items-center justify-center w-full h-screen bg-contain bg-no-repeat bg-center bg-blue-200 "
      style={{ backgroundImage: `url(${imag3})` }}
    >
      {error && <Alert message={error} />}

      <BotonVolver direccion="/SelectRole" />
      <h1 className="text-center text-3xl font-bold py-2 bg-slate-300 shadow-md rounded-full px-2 mb-2">
        Registro de Usuario
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto sm:w-1/2 lg:w-1/3 xl:w-1/4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 mr-2 text-sm font-bold"
          >
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={user.nombre}
            onChange={handlechange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="apellido"
            className="block text-gray-700 mr-2 text-sm font-bold"
          >
            Apellido
          </label>
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={user.apellido}
            onChange={handlechange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="rut"
            className="block text-gray-700 mr-2 text-sm font-bold"
          >
            Rut
          </label>
          <input
            type="text"
            name="rut"
            placeholder="123456789 o 12.345.678-9"
            value={user.rut}
            onChange={handleRutChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />
        </div>

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
            value={user.email}
            onChange={handlechange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          />

          {error === "Email no válido" && (
            <p className="text-red-500">Email no válido</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 mr-2 text-sm font-bold"
          >
            Contraseña
          </label>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={user.password}
              onChange={handlechange}
              placeholder="******"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            />
          </div>

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

        <button className="bg-green-500 hover:bg-green-300  rounded-full px-2 focus:outline-none focus:shadow-outline">
          Registrar
        </button>
      </form>
    </div>
  );
}
