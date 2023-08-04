//import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { RutaProtegida } from "./components/ProtectedRoute.jsx";
import { SelectRole } from "./pages/SelectRole.jsx";
import { ResetPassword } from "./pages/ResetPassword.jsx";
import { Register_2 } from "./pages/Register_2.jsx";

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
