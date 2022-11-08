import { pool } from "../db.js";
import helprs from "../lib/helpers.js"
const Modificar = {}

Modificar.Servicio = async( id,nombre,descripcion,tiempo,precio )=>{
    const datos = {nombre,descripcion,tiempo,precio}
    await pool.query('UPDATE tratamiento SET ? WHERE id = ?', [datos,id])
}

Modificar.Paciente = async( user ,nombre, edad, sexo, fechaNac, correo,contra,telefono,idOcupacion  )=>{
    const datos = {user, contra, correo, nombre, edad, fechaNac, tipo, idOcupacion }
    const usuario = user
    const usuarioTutor=null
    const DatosP= {usuario,sexo,telefono,usuarioTutor}
    datos.contra = await helprs.encriptar(contra);
    await pool.query('UPDATE paciente SET ? WHERE usuario = ?', [DatosP,usuario])
    await pool.query('UPDATE usuario SET ? WHERE user = ?', [datos,usuario])
}
Modificar.Odonto = async( user, nombre, edad, fechaNac, correo, consultorio, contra, telefono  )=>{
    const datos = {user, contra, correo, nombre, edad, fechaNac, idOcupacion }
    const usuario = user
    const DatosO= {usuario,telefono,consultorio}
    datos.contra = await helprs.encriptar(contra);
    await pool.query('UPDATE odontologo SET ? WHERE usuario = ?', [DatosO,usuario])
    await pool.query('UPDATE usuario SET ? WHERE user = ?', [datos,usuario])
}

export default Modificar;