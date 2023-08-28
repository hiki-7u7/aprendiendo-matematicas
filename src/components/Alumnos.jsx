export function Alumnos(props) {
  const eliminarAlumno = async () => {
    try {
      // Eliminar alumno de la base de datos
      //await deleteDoc(doc(db, "Profesor", props.rut));
      //console.log("Alumno eliminado");

      // Actualizar lista de alumnos
      props.actualizarListaAlumnos(props.rut);
    } catch (error) {
      console.log(" Error al eliminar el alumno: ", error);
    }
  };

  return (
    <div className=" justify-center mt-10 ">
      <form className="flex  items-center">
        <p className="border-2 border-black rounded-2xl  p-1 m-1">
          {props.nombre} {props.apellido} - {props.rut}
        </p>
        <img
          className="h-5 w-5 ml-2 cursor-pointer bg-red-500 rounded-full hover:bg-red-300 "
          src="https://cdn-icons-png.flaticon.com/128/1617/1617543.png"
          alt="Borrar alumno"
          onClick={eliminarAlumno}
        />
      </form>
    </div>
  );
}
