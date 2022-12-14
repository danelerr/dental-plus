import { pool } from "../db.js";
const Listar = {}

Listar.Pacientes= async() => {
    try {
        const Result =  await pool.query('Select user,usuario.nombre,edad,sexo,date_format(fechaNac, "%d-%m-%Y") as fechaNac,correo,ocupacion.nombre as idOcupacion,telefono from usuario,paciente,ocupacion where user = usuario and idOcupacion = ocupacion.id');
        return Result
    } catch (e) {
        console.log(e)
    }
}
Listar.Odonto= async() => {
    try {
        const Result =  await pool.query('Select user,nombre,edad,date_format(fechaNac, "%d-%m-%Y") as fechaNac,correo,idConsul,telefono  from usuario,odontologo where user = usuario');
        return Result
    } catch (e) {
        console.log(e)
    }
}
Listar.Admin= async() => {
    try {
        const Result =  await pool.query('Select * from usuario,administrador where user = usuario');
        return Result
    } catch (e) {
        console.log(e)
    }
}


Listar.Servicios = async() =>{
    try {
        const Result =  await pool.query('Select * from tratamiento');
        return Result
    } catch (e) {
        console.log(e)
    }
}

Listar.Bitacora = async() =>{
    try {
        const Result = await pool.query('Select id,date_format(fecha, "%d-%m-%Y %T")as fecha ,accion,culpable  From bitacora ORDER BY id desc')
        return Result
    } catch (error) {
        console.log(error)
    }
}

export default Listar;