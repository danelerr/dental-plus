import { pool } from "../db.js";
import helprs from "../lib/helpers.js"
const Modificar = {}

Modificar.Servicio = async( id,nombre,descripcion,tiempo,precio,req )=>{
    const datos = {nombre,descripcion,tiempo,precio}
    await pool.query('UPDATE tratamiento SET ? WHERE id = ?', [datos,id])
}

Modificar.Paciente = async( Olduser, user ,nombre, edad, sexo, fechaNac, correo,contra,telefono,idOcupacion)=>{
    const tipo = 'P'
    const idRol = 3
    const datos = {user, contra, correo, nombre, edad, fechaNac, tipo, idRol, idOcupacion}
    const usuario=user
    const usuarioTutor=null
    const DatosP= {usuario,sexo,telefono,usuarioTutor}
    datos.contra = await helprs.encriptar(contra);
    await pool.query('UPDATE usuario SET ? WHERE user = ?', [datos, Olduser])
    await pool.query('UPDATE paciente SET ? WHERE usuario = ?', [DatosP, usuario])    
}
Modificar.Odonto = async( Olduser,user, nombre, edad, fechaNac, correo, idConsul, contra, telefono )=>{
    const tipo = 'P'
    const idRol = 3
    const idOcupacion = 10
    const datos = {user, contra, correo, nombre, edad, fechaNac,tipo,idRol, idOcupacion }
    const usuario = user
    const DatosO= {usuario,telefono,idConsul}
    datos.contra = await helprs.encriptar(contra);
    await pool.query('UPDATE usuario SET ? WHERE user = ?', [datos,Olduser])
    await pool.query('UPDATE odontologo SET ? WHERE usuario = ?', [DatosO,usuario])
}

export default Modificar;