// Objetivo: manejar el contexto de autenticacion
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app, auth, db } from "../firebase";
import {
  doc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  getFirestore,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";

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
  const registrarUsuario = async (email, password, rol) => {
    const credencialUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idUsuario = credencialUsuario.user.uid;
    await setDoc(doc(db, "usuarios", idUsuario), {
      rol: rol,
    });
    return credencialUsuario;
  };

  //funcion que permite acceder a un usuario
  const iniciarSesion = async (email, password) => {
    const credencialUsuario = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credencialUsuario;
  };

  //funcion que permite cerrar sesion
  const cerrarSesion = () => signOut(auth);

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
        registrarUsuario,
        iniciarSesion,
        user,
        cerrarSesion,
        cargando,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
