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
import { Ejercicio_1_9 } from "./pages/Ejercicio_1_9.jsx";
import { Ejercicio_1_10 } from "./pages/Ejercicio_1_10.jsx";
import { Ejercicio_1_11 } from "./pages/Ejercicio_1_11.jsx";
import { Ejercicio_1_12 } from "./pages/Ejercicio_1_12.jsx";
import { Ejercicio_1_13 } from "./pages/Ejercicio_1_13.jsx";
import { Ejercicio_1_14 } from "./pages/Ejercicio_1_14.jsx";
import { Ejercicio_1_15 } from "./pages/Ejercicio_1_15.jsx";
import { Ejercicio_1_16 } from "./pages/Ejercicio_1_16.jsx";
import { Ejercicio_3_3 } from "./pages/Ejercicio_1_17.jsx";

import { Ejercicio_1_19 } from "./pages/Ejercicio_1_19.jsx";
import { Ejercicio_1_20 } from "./pages/Ejercicio_1_20.jsx";

import { Ejercicio_1_23 } from "./pages/Ejercicio_1_23.jsx";

import { Ejercicio_1_25 } from "./pages/Ejercicio_1_25.jsx";
import { Ejercicio_1_26 } from "./pages/Ejercicio_1_26.jsx";
import { Ejercicio_1_27 } from "./pages/Ejercicio_1_27.jsx";
import { Ejercicio_1_28 } from "./pages/Ejercicio_1_28.jsx";
import { Ejercicio_1_29 } from "./pages/Ejercicio_1_29.jsx";
import { Ejercicio_1_30 } from "./pages/Ejercicio_1_30.jsx";
import { Ejercicio_1_32 } from "./pages/Ejercicio_1_32.jsx";

import { Ejercicio_3_4 } from "./pages/Ejercicio_3_4.jsx";
import { Ejercicio_3_5 } from "./pages/Ejercicio_3_5.jsx";
import { Ejercicio_3_6 } from "./pages/Ejercicio_3_6.jsx";
import { Ejercicio_4_1 } from "./pages/Ejercicio_4_1.jsx";
import { Ejercicio_5_1 } from "./pages/Ejercicio_5_1.jsx";

import { ListaEjercicios_2 } from "./pages/ListaEjercicios_2.jsx";
import { ListaEjercicios_3 } from "./pages/ListaEjercicios_3.jsx";
import { ListaEjercicios_4 } from "./pages/ListaEjercicios_4.jsx";
import { ListaEjercicios_5 } from "./pages/ListaEjercicios_5.jsx";
import { ListaEjercicios_6 } from "./pages/ListaEjercicios_6.jsx";
import { ListaEjercicios_7 } from "./pages/ListaEjercicios_7.jsx";
import { ListaEjercicios_8 } from "./pages/ListaEjercicios_8.jsx";
import { ListaEjercicios_9 } from "./pages/ListaEjercicios_9.jsx";
import { ListaEjercicios_10 } from "./pages/ListaEjercicios_10.jsx";
import { ListaEjercicios_11 } from "./pages/ListaEjercicios_11.jsx";
import { ListaEjercicios_12 } from "./pages/ListaEjercicios_12.jsx";
import { ListaEjercicios_13 } from "./pages/ListaEjercicios_13.jsx";
import { ListaEjercicios_14 } from "./pages/ListaEjercicios_14.jsx";
import { ListaEjercicios_15 } from "./pages/ListaEjercicios_15.jsx";
import { ListaEjercicios_16 } from "./pages/ListaEjercicios_16.jsx";
import { ListaEjercicios_17 } from "./pages/ListaEjercicios_17.jsx";
import { ListaEjercicios_18 } from "./pages/ListaEjercicios_18.jsx";
import { ListaEjercicios_19 } from "./pages/ListaEjercicios_19.jsx";
import { ListaEjercicios_20 } from "./pages/ListaEjercicios_20.jsx";
import { ListaEjercicios_21 } from "./pages/ListaEjercicios_21.jsx";
import { ListaEjercicios_22 } from "./pages/ListaEjercicios_22.jsx";
import { ListaEjercicios_23 } from "./pages/ListaEjercicios_23.jsx";
import { ListaEjercicios_24 } from "./pages/ListaEjercicios_24.jsx";

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
            path="/unidad/1/listaEjercicios_2"
            element={
              <RutaProtegida>
                <ListaEjercicios_2 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios_3"
            element={
              <RutaProtegida>
                <ListaEjercicios_3 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios_4"
            element={
              <RutaProtegida>
                <ListaEjercicios_4 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios_5"
            element={
              <RutaProtegida>
                <ListaEjercicios_5 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios_6"
            element={
              <RutaProtegida>
                <ListaEjercicios_6 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios_7"
            element={
              <RutaProtegida>
                <ListaEjercicios_7 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios_8"
            element={
              <RutaProtegida>
                <ListaEjercicios_8 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios_9"
            element={
              <RutaProtegida>
                <ListaEjercicios_9 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios_10"
            element={
              <RutaProtegida>
                <ListaEjercicios_10 />
              </RutaProtegida>
            }
          />
          <Route
            path="/unidad/1/listaEjercicios_11"
            element={
              <RutaProtegida>
                <ListaEjercicios_11 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios_12"
            element={
              <RutaProtegida>
                <ListaEjercicios_12 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios_13"
            element={
              <RutaProtegida>
                <ListaEjercicios_13 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/2/listaEjercicios_14"
            element={
              <RutaProtegida>
                <ListaEjercicios_14 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/2/listaEjercicios_15"
            element={
              <RutaProtegida>
                <ListaEjercicios_15 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/2/listaEjercicios_16"
            element={
              <RutaProtegida>
                <ListaEjercicios_16 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/2/listaEjercicios_17"
            element={
              <RutaProtegida>
                <ListaEjercicios_17 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/3/listaEjercicios_18"
            element={
              <RutaProtegida>
                <ListaEjercicios_18 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/3/listaEjercicios_19"
            element={
              <RutaProtegida>
                <ListaEjercicios_19 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/3/listaEjercicios_20"
            element={
              <RutaProtegida>
                <ListaEjercicios_20 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/4/listaEjercicios_21"
            element={
              <RutaProtegida>
                <ListaEjercicios_21 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/5/listaEjercicios_22" // /unidad/5/listaEjercicios/ejercicio_1
            element={
              <RutaProtegida>
                <ListaEjercicios_22 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios_23"
            element={
              <RutaProtegida>
                <ListaEjercicios_23 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios_24"
            element={
              <RutaProtegida>
                <ListaEjercicios_24 />
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

          {
            <Route
              path="/unidad/1/listaEjercicios/ejercicio_8"
              element={
                <RutaProtegida>
                  <Ejercicio_1_8 />
                </RutaProtegida>
              }
            />
          }

          {
            <Route
              path="/unidad/1/listaEjercicios/ejercicio_9"
              element={
                <RutaProtegida>
                  <Ejercicio_1_9 />
                </RutaProtegida>
              }
            />
          }

          {
            <Route
              path="/unidad/1/listaEjercicios/ejercicio_10"
              element={
                <RutaProtegida>
                  <Ejercicio_1_10 />
                </RutaProtegida>
              }
            />
          }

          {
            <Route
              path="/unidad/1/listaEjercicios/ejercicio_11"
              element={
                <RutaProtegida>
                  <Ejercicio_1_11 />
                </RutaProtegida>
              }
            />
          }

          {
            <Route
              path="/unidad/1/listaEjercicios/ejercicio_12"
              element={
                <RutaProtegida>
                  <Ejercicio_1_12 />
                </RutaProtegida>
              }
            />
          }

          {
            <Route
              path="/unidad/1/listaEjercicios/ejercicio_13"
              element={
                <RutaProtegida>
                  <Ejercicio_1_13 />
                </RutaProtegida>
              }
            />
          }

          {
            <Route
              path="/unidad/1/listaEjercicios/ejercicio_14"
              element={
                <RutaProtegida>
                  <Ejercicio_1_14 />
                </RutaProtegida>
              }
            />
          }

          {
            <Route
              path="/unidad/1/listaEjercicios/ejercicio_15"
              element={
                <RutaProtegida>
                  <Ejercicio_1_15 />
                </RutaProtegida>
              }
            />
          }

          {
            <Route
              path="/unidad/1/listaEjercicios/ejercicio_16"
              element={
                <RutaProtegida>
                  <Ejercicio_1_16 />
                </RutaProtegida>
              }
            />
          }

          {
            <Route
              path="/unidad/3/listaEjercicios_19/ejercicio_3_3"
              element={
                <RutaProtegida>
                  <Ejercicio_3_3 />
                </RutaProtegida>
              }
            />
          }

          {
            <Route
              path="/unidad/3/listaEjercicios_19/ejercicio_3_4"
              element={
                <RutaProtegida>
                  <Ejercicio_3_4 />
                </RutaProtegida>
              }
            />
          }

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_19"
            element={
              <RutaProtegida>
                <Ejercicio_1_19 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_20"
            element={
              <RutaProtegida>
                <Ejercicio_1_20 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/3/listaEjercicios_20/ejercicio_3_5"
            element={
              <RutaProtegida>
                <Ejercicio_3_5 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/3/listaEjercicios_20/ejercicio_3_6"
            element={
              <RutaProtegida>
                <Ejercicio_3_6 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_23"
            element={
              <RutaProtegida>
                <Ejercicio_1_23 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/5/listaEjercicios_22/ejercicio_1" // /unidad/5/listaEjercicios_22/ejercicio_1
            element={
              <RutaProtegida>
                <Ejercicio_5_1 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_25"
            element={
              <RutaProtegida>
                <Ejercicio_1_25 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_26"
            element={
              <RutaProtegida>
                <Ejercicio_1_26 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_27"
            element={
              <RutaProtegida>
                <Ejercicio_1_27 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_28"
            element={
              <RutaProtegida>
                <Ejercicio_1_28 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_29"
            element={
              <RutaProtegida>
                <Ejercicio_1_29 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_30"
            element={
              <RutaProtegida>
                <Ejercicio_1_30 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/4/listaEjercicios_21/ejercicio_4_1"
            element={
              <RutaProtegida>
                <Ejercicio_4_1 />
              </RutaProtegida>
            }
          />

          <Route
            path="/unidad/1/listaEjercicios/ejercicio_32"
            element={
              <RutaProtegida>
                <Ejercicio_1_32 />
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
