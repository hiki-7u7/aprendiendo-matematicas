// Objetivo: manejar el contexto de autenticacion
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

//creacion del contexto de autenticacion
export const authContext = createContext();

//funcion que permite manejar el contexto de autenticacion
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("No hay un provedor");
  }
  return context;
};

//funcion que exporta el componente AuthProvider
export function AuthProvider({ children }) {
  //estado que permite manejar el usuario
  const [user, setUser] = useState(null);

  //estado que permite manejar el estado de carga
  const [cargando, setCargando] = useState(true);

  //funcion que permite registrar un usuario
  const Registrarse = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  //funcion que permite acceder a un usuario
  const iniciarSesion = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  //funcion que permite cerrar sesion
  const CerrarSesion = () => signOut(auth);

  //funcion que permite resetear la contraseña
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  //funcion que permite manejar el estado del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);
  //retorno del componente
  return (
    <authContext.Provider
      value={{
        Registrarse,
        iniciarSesion,
        user,
        CerrarSesion,
        cargando,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
