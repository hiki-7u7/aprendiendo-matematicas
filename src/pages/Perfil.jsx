import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { BotonVolver } from "../components/BotonVolver";
import { BsPersonCircle } from "react-icons/bs";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import imag1 from "../assets/img/ojo_cerrado.png";
import imag2 from "../assets/img/ojo_abierto.png";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

export function Perfil() {
  const { user, cargando } = useAuth();
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    contraseñaAntigua: "",
    nuevaContraseña: "",
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // estado para mostrar u ocultar el formulario de cambio de contraseña
  const [showPassword, setShowPassword] = useState(false); // estado para mostrar u ocultar la contraseña
  const [errorContraseña, setErrorContraseña] = useState(null); // estado para manejar errores de contraseña
  const [cargandoUsuario, setCargandoUsuario] = useState(true); // estado para saber si se está cargando el usuario

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const limpairCampos = () => {
    setUserData({
      ...userData,
      contraseñaAntigua: "",
      nuevaContraseña: "",
    });
  };

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      if (user) {
        // si el usuario está autenticado
        const estudianteQuery = query(
          collection(db, "Estudiante"),
          where("email", "==", user.email)
        );
        const profesorQuery = query(
          collection(db, "Profesor"),
          where("email", "==", user.email)
        );
        try {
          const [estudianteSnapshot, profesorSnapshot] = await Promise.all([
            getDocs(estudianteQuery),
            getDocs(profesorQuery),
          ]);

          if (!estudianteSnapshot.empty) {
            // si no está vacío
            const estudianteDoc = estudianteSnapshot.docs[0];
            setUserData(estudianteDoc.data()); // establecer los datos del estudiante
          } else if (!profesorSnapshot.empty) {
            const profesorDoc = profesorSnapshot.docs[0];
            setUserData(profesorDoc.data()); // establecer los datos del profesor
          }

          setCargandoUsuario(false); // ya se cargó el usuario
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
          setCargandoUsuario(false); // ya se cargó el usuario
        }
      }
    };

    obtenerDatosUsuario();
  }, [user]);
  if (cargandoUsuario || cargando) {
    return (
      <h1 className="flex min-h-screen items-center justify-center">
        Cargando...
      </h1>
    );
  }

  const handleContraseñaChange = (e) => {
    setUserData({ ...userData, contraseñaAntigua: e.target.value });
  };

  const actualizarContraseña = async () => {
    setErrorContraseña(null);

    if (!userData.contraseñaAntigua || !userData.nuevaContraseña) {
      setErrorContraseña("Por favor, complete los campos de contraseña");
      toast.error("Por favor, complete los campos de contraseña", {
        style: {
          backgroundColor: "#FFCDD2", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
          color: "#EF5350",
        },
        position: "top-center",
        autoClose: 4000,
        pauseOnHover: true,
      });
      return;
    }

    try {
      if (user) {
        const email = user.email;
        const contraseñaAntigua = userData.contraseñaAntigua;

        try {
          await signInWithEmailAndPassword(auth, email, contraseñaAntigua);
          await updatePassword(auth.currentUser, userData.nuevaContraseña);
          toast.success("Contraseña actualizada con éxito", {
            style: {
              backgroundColor: "#E8F5E9", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
              color: "#66BB6A",
            },
            position: "top-center",
            autoClose: 4000,
            pauseOnHover: true,
          });

          limpairCampos();

          /*  alert("Contraseña actualizada con éxito."); */ // otra forma de mostrar el mensaje de éxito
        } catch (error) {
          console.error(
            "Error de autenticación o al actualizar la contraseña:",
            error
          );
          setErrorContraseña(
            "Contraseña antigua incorrecta o error al actualizar"
          );
          toast.error("Contraseña antigua incorrecta o error al actualizar", {
            style: {
              backgroundColor: "#FFCDD2", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
              color: "#EF5350",
            },
            position: "top-center",
            autoClose: 4000,
            pauseOnHover: true,
          });
        }
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      toast.error("Error al actualizar la contraseña", {
        style: {
          backgroundColor: "#FFCDD2", // verde mas claro #14B8A6 // verde mas oscuro #047857 // rojo #E53E3E
          color: "#EF5350",
        },
        position: "top-center",
        autoClose: 4000,
        pauseOnHover: true,
      });
    }
  };

  const toggleMostrarFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    if (!mostrarFormulario) {
      setUserData({
        ...userData,
        contraseñaAntigua: "",
        nuevaContraseña: "",
      });
    }
  };

  if (userData.rol === "alumno") {
    var direccion = "/";
  } else if (userData.rol === "profesor") {
    var direccion = "/Profesor";
  }

  return (
    <div className="flex flex-col items-center w-full h-screen bg-blue-200">
      <BotonVolver direccion={direccion} />
      <BsPersonCircle className="text-9xl mt-10 text-black" />
      <h1 className="text-5xl mt-6">Perfil</h1>

      <div className="flex ">
        <h3 className="text-2xl mt-7">Nombre y Apellido:</h3>
        <h3 className="text-2xl mt-6 ml-2 bg-gray-50 shadow-md p-1 rounded-md">
          {userData.nombre} {userData.apellido}
        </h3>
      </div>

      <div className="flex ">
        <h3 className="text-2xl mt-7">Rut:</h3>
        <h3 className="text-2xl mt-6 ml-2 bg-gray-50 shadow-md p-1 rounded-md">
          {" "}
          {userData.rut}
        </h3>
      </div>

      <div className="flex ">
        <h3 className="text-2xl mt-7 ">Correo:</h3>
        <h3 className="text-2xl mt-6 ml-2 bg-gray-50 shadow-md p-1 rounded-md">
          {" "}
          {userData.email}
        </h3>
      </div>

      <button
        onClick={toggleMostrarFormulario}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
      >
        {mostrarFormulario
          ? "Ocultar Cambio de Contraseña"
          : "Cambiar Contraseña"}
      </button>
      {mostrarFormulario && (
        <div>
          <div className="mt-6">
            <label className="text-2xl">Contraseña antigua:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={userData.contraseñaAntigua}
              onChange={handleContraseñaChange}
              className="ml-2 border-b-2 border-gray-400 rounded-md shadow-md"
            />
          </div>
          <div className="mt-6">
            <label className="text-2xl">Nueva Contraseña:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={userData.nuevaContraseña}
              onChange={(e) =>
                setUserData({ ...userData, nuevaContraseña: e.target.value })
              }
              className="ml-2 border-b-2 border-gray-400 rounded-md shadow-md"
            />
          </div>
          {/*  {errorContraseña && (
            <div className="text-red-500 mt-2">{errorContraseña}</div>
          )} */}
          <div className="flex justify-center mt-4">
            <button
              onClick={actualizarContraseña}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full mr-4"
            >
              Actualizar Contraseña
            </button>
            <button
              type="button"
              onClick={handleShowPassword}
              className="bg-gray-300 hover:bg-gray-400 rounded-full px-2 focus:outline-none focus:shadow-outline ml-2 mt-1"
            >
              {showPassword ? (
                <img id="img1" src={imag1} alt="Ocultar contraseña" />
              ) : (
                <img id="img2" src={imag2} alt="Mostrar contraseña" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
