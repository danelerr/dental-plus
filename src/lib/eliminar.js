import { pool } from "../db.js";
const Eliminar = {}

Eliminar.Servicio = async( id ) =>{
    await pool.query('delete from tratamiento where id = ?', [id])
}

Eliminar.Paciente = async(user) =>{
    await pool.query('delete from paciente where usuario = ?', [user])
    await pool.query('delete from usuario where user = ?', [user])
}

Eliminar.Odonto = async(user) =>{
    await pool.query('delete from odontologo where usuario = ?', [user])
    await pool.query('delete from usuario where user = ?', [user])
}

export default Eliminar;