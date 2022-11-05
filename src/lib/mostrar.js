import { pool } from "../db.js";
const Listar = {}

Listar.Pacientes= async() => {
    try {
        const Result =  await pool.query('Select * from usuario,paciente where user = usuario');
        return Result
    } catch (e) {
        console.log(e)
    }
}
Listar.Odonto= async() => {
    try {
        const Result =  await pool.query('Select * from usuario,odontologo where user = usuario');
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

export default Listar;