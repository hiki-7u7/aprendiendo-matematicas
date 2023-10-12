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
import { Unidad_1 } from "./pages/Unidad_1.jsx";
import { Unidad_2 } from "./pages/Unidad_2.jsx";
import { Unidad_3 } from "./pages/Unidad_3.jsx";
import { Unidad_4 } from "./pages/Unidad_4.jsx";
import { Unidad_5 } from "./pages/Unidad_5.jsx";
import { Ejercicio_1_1 } from "./pages/Ejercicio_1_1.jsx";
import { Ejercicio_1_2 } from "./pages/Ejercicio_1_2.jsx";
import { Ejercicio_1_3 } from "./pages/Ejercicio_1_3.jsx";
import { Ejercicio_1_4 } from "./pages/Ejercicio_1_4.jsx";
import { Ejercicio_1_5 } from "./pages/Ejercicio_1_5.jsx";
import { Ejercicio_1_6 } from "./pages/Ejercicio_1_6.jsx";
import { Ejercicio_1_7 } from "./pages/Ejercicio_1_7.jsx";
import { Ejercicio_1_8 } from "./pages/Ejercicio_1_8.jsx";
import { Perfil } from "./pages/Perfil.jsx";
import { DetalleAlumno } from "./pages/DetalleAlumno.jsx";
import { ListaEjercicios } from "./pages/ListaEjercicios.jsx";

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
          <Route
            path="/perfil"
            element={
              <RutaProtegida>
                <Perfil />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1"
            element={
              <RutaProtegida>
                <Unidad_1 />
              </RutaProtegida>
            }
          />
          <Route
            path="/unidad/2"
            element={
              <RutaProtegida>
                <Unidad_2 />
              </RutaProtegida>
            }
          />
          <Route
            path="/unidad/3"
            element={
              <RutaProtegida>
                <Unidad_3 />
              </RutaProtegida>
            }
          />
          <Route
            path="/unidad/4"
            element={
              <RutaProtegida>
                <Unidad_4 />
              </RutaProtegida>
            }
          />
          <Route
            path="/unidad/5"
            element={
              <RutaProtegida>
                <Unidad_5 />
              </RutaProtegida>
            }
          />
          <Route
            path="/unidad/1/listaEjercicios"
            element={
              <RutaProtegida>
                <ListaEjercicios />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_1"
            element={
              <RutaProtegida>
                <Ejercicio_1_1 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_2"
            element={
              <RutaProtegida>
                <Ejercicio_1_2 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_3"
            element={
              <RutaProtegida>
                <Ejercicio_1_3 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_4"
            element={
              <RutaProtegida>
                <Ejercicio_1_4 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_5"
            element={
              <RutaProtegida>
                <Ejercicio_1_5 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_6"
            element={
              <RutaProtegida>
                <Ejercicio_1_6 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_7"
            element={
              <RutaProtegida>
                <Ejercicio_1_7 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_8"
            element={
              <RutaProtegida>
                <Ejercicio_1_8 />
              </RutaProtegida>
            }
          />

          <Route
            path="/Profesor/DetalleAlumno"
            element={
              <RutaProtegida>
                <DetalleAlumno />
              </RutaProtegida>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
