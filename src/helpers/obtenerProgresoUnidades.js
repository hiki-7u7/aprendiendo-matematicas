export const obtenerProgresoUnidades = async (alumno, ejercicios) => {

    const { progreso } = alumno;

    const porcentajes = []
    
    for (const ejercicio of ejercicios) {
        const ejerciciosEchos = ejercicio.ejercicios.filter( e => progreso.idEjercicios.includes(e) )
        const porcentaje = (ejerciciosEchos.length * 100) / ejercicio.ejercicios.length
        porcentajes.push( {porcentaje: `%${Math.round(porcentaje)}`, unidad: ejercicio.unidad} )
    }

    return porcentajes;
};