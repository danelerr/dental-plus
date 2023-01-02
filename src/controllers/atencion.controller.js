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
    const datos = [today.toLocaleTimeString(),'00:00:00',req.body.idficha,req.body.estadoAte,precio[0].precio,idhis[0].id]
    await pool.query('INSERT INTO atencion(horaInicio, horaFin, idFicha, idEstadoA, Preciototal,IdHis) VALUES (?,?,?,?,?,?)',datos)
    const [row] = await busqueda.PacienteEsp(usuario[0].usuarioP)
    res.render('odontologo/Historial.ejs',{ datos: row[0] })
}

export const ViewGATe = async(req,res) =>{
    const [rows]=await pool.query('select atencion.id as id,horaInicio,horaFin,idFicha as ficha,estadoAtencion.detalle as Estado,Preciototal from atencion,estadoAtencion,odontologo where estadoAtencion.id=idEstadoA and odontologo.usuario=?',req.user[0].user)
    console.log(rows)
    res.render('odontologo/GestionarAte.ejs',{datos: rows})
}

export const setestadoA = async(req,res) =>{
    const [rows]=await pool.query('select atencion.id as id,horaInicio,horaFin,idFicha as ficha,estadoAtencion.detalle as Estado,Preciototal from atencion,estadoAtencion,odontologo where estadoAtencion.id=idEstadoA and odontologo.usuario=?',req.user[0].user)
    console.log(rows)
    res.render('odontologo/GestionarAte.ejs',{datos: rows})
}