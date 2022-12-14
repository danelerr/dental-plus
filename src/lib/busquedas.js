import { pool } from "../db.js";
const busqueda = {};


//////////////////// OCUPACION //////////////////////
busqueda.NumOcu = async( NomOcup ) =>{
    try {
        const Result =  await pool.query('Select id from ocupacion where nombre = ?', [NomOcup]);
        const R = Result[0]
        return R[0].id
    } catch (e) {
        console.log(e)
    }
}


busqueda.NomOcu = async( id ) =>{
    try {
        console.log('Llega : ', id)
        const Result =  await pool.query('Select nombre from ocupacion where id = ?', [id]);
        const R = Result[0]
        console.log('devuelve : ', Result[0])
        return R[0].nombre
    } catch (e) {
        console.log(e)
    }
}





////////////////// USUARIO ////////////////
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
        const Result = await pool.query('SELECT * FROM usuario,administrador,odontologo,paciente Where user = ?', [usuario])
        return Result
    } catch (e) {
        console.log(e)
    }
}


///////////// PACIENTE ///////////////
busqueda.Paciente = async(nombre) => {
    try {
        const Result =  await pool.query('Select * from usuario,paciente where user=usuario and nombre = ?', nombre);
        return Result
    } catch (e) {
        console.log(e)
    }
}


/////////////// ODONTOLOGO ///////////////////////////
busqueda.Odonto = async(nombre) => {
    try {
        const Result =  await pool.query('Select * from usuario,odontologo where user=usuario and nombre = ?', nombre);
        return Result
    } catch (e) {
        console.log(e)
    }
}


//////// ADMINISTRADOR //////////////
busqueda.Admin = async(nombre) => {
    try {
        const Result =  await pool.query('Select * from usuario,administrador where user=usuario and nombre = ?', nombre);
        return Result
    } catch (e) {
        console.log(e)
    }
}


/////////////// RESERVA ///////////////////////////////
busqueda.Reservas = async(User) => {
    try {
        const Result =  await pool.query('Select ficha.* from ficha, usuario where user = ?', User);
        return Result
    } catch (e) {
        console.log(e)
    }
}


////////// ROLES /////////////////////////////
busqueda.Roles = async() => {
    try {
        const Result =  await pool.query('Select * from rol');
        return Result
    } catch (e) {
        console.log(e)
    }
}
export default busqueda;