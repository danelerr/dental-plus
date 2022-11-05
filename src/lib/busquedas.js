import { pool } from "../db.js";
const busqueda = {};

busqueda.NumOcu = async( NomOcup ) =>{
    try {
        const Result =  await pool.query('Select id from ocupacion where nombre = ?', NomOcup);
        const R = Result[0]
        return R[0].id
    } catch (e) {
        console.log(e)
    }
}

busqueda.Usuario = async(usuario) => {
    try {
        const Result = await pool.query('SELECT * FROM usuario WHERE user = ?', [usuario])
        return Result
    } catch (e) {
        console.log(e)
    }
}

busqueda.UsuarioT = async(usuario) => {
    try {
        const Result = await pool.query('SELECT * FROM paciente, usuario, odontologo, administrador Where user = ?', [usuario])
        return Result
    } catch (e) {
        console.log(e)
    }
}



busqueda.Paciente = async(nombre) => {
    try {
        const Result =  await pool.query('Select * from usuario,paciente where user=usuario and nombre = ?', nombre);
        return Result
    } catch (e) {
        console.log(e)
    }
}


busqueda.Odonto = async(nombre) => {
    try {
        const Result =  await pool.query('Select * from usuario,odontologo where user=usuario and nombre = ?', nombre);
        return Result
    } catch (e) {
        console.log(e)
    }
}

busqueda.Admin = async(nombre) => {
    try {
        const Result =  await pool.query('Select * from usuario,administrador where user=usuario and nombre = ?', nombre);
        return Result
    } catch (e) {
        console.log(e)
    }
}

busqueda.Reservas = async(User) => {
    try {
        const Result =  await pool.query('Select ficha.* from ficha, usuario where user = ?', User);
        return Result
    } catch (e) {
        console.log(e)
    }
}

busqueda.Roles = async() => {
    try {
        const Result =  await pool.query('Select * from rol');
        return Result
    } catch (e) {
        console.log(e)
    }
}
export default busqueda;