//import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home.jsx";
import { Login } from "./components/Login.jsx";
import { Register } from "./components/Register.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { RutaProtegida } from "./components/ProtectedRoute.jsx";
import { SelectRole } from "./components/SelectRole.jsx";
import { ResetPassword } from "./components/ResetPassword.jsx";
import { Register_2 } from "./components/Register_2.jsx";

//funcion que exporta el componente App
function App() {
  return (
    <div className="bg-slate-300 h-screen flex">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RutaProtegida>
                <Home />
              </RutaProtegida>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/SelectRole" element={<SelectRole />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Register_2" element={<Register_2 />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
