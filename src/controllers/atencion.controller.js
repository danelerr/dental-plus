import { pool } from "../db.js";
import passport from 'passport';
import Insertar from "../lib/insertar.js"
import Eliminar from "../lib/eliminar.js";
import Modificar from "../lib/modificar.js";
import busqueda from "../lib/busquedas.js";
import helprs from "../lib/helpers.js"
import Listar from "../lib/mostrar.js";

export const Atencion = async(req,res) =>{
    const result = await busqueda.fichaP(req.body.idficha)
    const usuario = result[0]
    const P = await busqueda.Tratamiento(req.body.idficha)
    const id = await busqueda.idHis(usuario[0].usuarioP)
    const idhis = id[0]
    const precio = P[0]
    const today= new Date();
    const hora = today.toLocaleTimeString()
    const Hora1 = hora.split(' ')[0] 
    const datos = [Hora1,'00:00:00',req.body.idficha,req.body.estadoAte,precio[0].precio, idhis[0].id]
    await pool.query('INSERT INTO atencion(horaInicio, horaFin, idFicha, idEstadoA, Preciototal,IdHis) VALUES (?,?,?,?,?,?)',datos)
    const [row] = await busqueda.PacienteEsp(usuario[0].usuarioP)
    const [rows]=await pool.query('select atencion.id as id,horaInicio,horaFin,idFicha as ficha,estadoAtencion.detalle as Estado,Preciototal, ficha.usuarioP as Paciente from atencion,estadoAtencion,odontologo,ficha where estadoAtencion.id=idEstadoA and idFicha=ficha.id and odontologo.usuario=? order by atencion.id desc',req.user[0].user)
    const Paciente = rows[0].Paciente
    await pool.query('update ficha set idEstadoRes=2 where usuarioP=?',Paciente)
    await pool.query('INSERT INTO bitacora(accion,culpable) Values(?, ?)',['Atendio a un paciente',req.user[0].user])
    res.render('odontologo/Tratamiento.ejs',{ Paciente:{Paciente}, datos: row[0] , datos2: rows[0] })
}

export const ViewGATe = async(req,res) =>{
    const [rows]=await pool.query('select atencion.id as id,horaInicio,horaFin,idFicha as ficha,estadoAtencion.detalle as Estado,Preciototal from atencion,estadoAtencion,odontologo where estadoAtencion.id=idEstadoA and odontologo.usuario=? order by atencion.id desc',req.user[0].user)
    res.render('odontologo/GestionarAte.ejs',{datos: rows})
}

export const setestadoA = async(req,res) =>{
    await pool.query('update atencion set idEstadoA=3 where idFicha=?',req.body.idficha)
    const [rows]=await pool.query('select atencion.id as id,horaInicio,horaFin,idFicha as ficha,estadoAtencion.detalle as Estado,Preciototal from atencion,estadoAtencion,odontologo where estadoAtencion.id=idEstadoA and odontologo.usuario=?',req.user[0].user)
    await pool.query('INSERT INTO bitacora(accion,culpable) Values(?, ?)',['Se modifico un estado de atencion',req.user[0].user])
    res.render('odontologo/GestionarAte.ejs',{datos: rows})
}