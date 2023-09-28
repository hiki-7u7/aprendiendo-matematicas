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

export function Perfil() {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    contraseñaAntigua: "",
    nuevaContraseña: "",
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorContraseña, setErrorContraseña] = useState(null);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      if (user) {
        const estudianteQuery = query(
          collection(db, "Estudiante"),
          where("email", "==", user.email)
        );
        const profesorQuery = query(
          collection(db, "Profesor"),
          where("email", "==", user.email)
        );

        const [estudianteSnapshot, profesorSnapshot] = await Promise.all([
          getDocs(estudianteQuery),
          getDocs(profesorQuery),
        ]);

        if (!estudianteSnapshot.empty) {
          const estudianteDoc = estudianteSnapshot.docs[0];
          setUserData(estudianteDoc.data());
        } else if (!profesorSnapshot.empty) {
          const profesorDoc = profesorSnapshot.docs[0];
          setUserData(profesorDoc.data());
        }
      }
    };

    obtenerDatosUsuario();
  }, [user]);

  const handleContraseñaChange = (e) => {
    setUserData({ ...userData, contraseñaAntigua: e.target.value });
  };

  const actualizarContraseña = async () => {
    setErrorContraseña(null);

    try {
      if (user) {
        const email = user.email;
        const contraseñaAntigua = userData.contraseñaAntigua;

        try {
          await signInWithEmailAndPassword(auth, email, contraseñaAntigua);
          await updatePassword(auth.currentUser, userData.nuevaContraseña);

          alert("Contraseña actualizada con éxito.");
        } catch (error) {
          console.error(
            "Error de autenticación o al actualizar la contraseña:",
            error
          );
          setErrorContraseña(
            "Contraseña antigua incorrecta o error al actualizar"
          );
        }
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
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

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <BotonVolver direccion={"/"} />
      <BsPersonCircle className="text-9xl mt-10" />
      <h1 className="text-5xl mt-6">Perfil</h1>
      <h3 className="text-2xl mt-6">
        Nombre y Apellido: {userData.nombre} {userData.apellido}
      </h3>
      <h3 className="text-2xl mt-6">Rut: {userData.rut}</h3>
      <h3 className="text-2xl mt-6">Correo: {userData.email}</h3>

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
              className="ml-2 border-b-2 border-gray-400"
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
              className="ml-2 border-b-2 border-gray-400"
            />
          </div>
          {errorContraseña && (
            <div className="text-red-500 mt-2">{errorContraseña}</div>
          )}
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
