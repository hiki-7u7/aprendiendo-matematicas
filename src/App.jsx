//import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Alumno } from "./pages/Alumno.jsx";
import { Login } from "./pages/Login.jsx";
import { Registro } from "./pages/Registro.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { RutaProtegida } from "./components/ProtectedRoute.jsx";
import { SelectRole } from "./pages/SelectRole.jsx";
import { ResetPassword } from "./pages/ResetPassword.jsx";
import { JoinStudent } from "./pages/JoinStudent.jsx";
import { Profesor } from "./pages/Profesor.jsx";

//funcion que exporta el componente App
function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RutaProtegida>
                <Alumno />
              </RutaProtegida>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/SelectRole" element={<SelectRole />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route
            path="/JoinStudent"
            element={
              <RutaProtegida>
                <JoinStudent />
              </RutaProtegida>
            }
          />
          <Route
            path="/Profesor"
            element={
              <RutaProtegida>
                <Profesor />
              </RutaProtegida>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
