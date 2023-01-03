import { pool } from "../db.js";
import passport from 'passport';
import Insertar from "../lib/insertar.js"
import Eliminar from "../lib/eliminar.js";
import Modificar from "../lib/modificar.js";
import busqueda from "../lib/busquedas.js";
import helprs from "../lib/helpers.js"
import Listar from "../lib/mostrar.js";


export const viewT = async(req,res) =>{
    const [rows]=await pool.query('select atencion.id as id,tratamiento.nombre as tratamiento,horaInicio,horaFin,idFicha as ficha,estadoAtencion.detalle as Estado,Preciototal from atencion,estadoAtencion,paciente,tratamiento,ficha where estadoAtencion.id=idEstadoA and atencion.idFicha=ficha.id and idTratamiento=tratamiento.id and paciente.usuario=? order by ficha.id desc ',req.user[0].user)
    res.render('paciente/Tratamientos.ejs',{datos: rows})
}

export const Histotrata = async(req,res) =>{
    const [rows] = await busqueda.PacienteEsp(req.body.id)
    const atencion =  req.body.atencion
    const Paciente = req.body.Paciente
    res.render('odontologo/HistorialT.ejs',{Paciente: {Paciente},datos: rows[0],datos2: {atencion} })
}

export const vRece = async(req,res) =>{
    const [rows] = await busqueda.PacienteEsp(req.body.id)
    const atencion =  req.body.atencion
    const Paciente = req.body.Paciente
    res.render('odontologo/Recetar.ejs',{Paciente: {Paciente},datos: rows[0] , datos2: {atencion}})
}

export const Grece = async(req,res) =>{
    const arreglo= [req.body.medicamento, req.body.hora , req.body.detalle , req.body.atencion]
    const atencion =  req.body.atencion
    await Insertar.Receta(arreglo)
    const [rows] = await busqueda.PacienteEsp(req.body.id)
    const Paciente = req.body.Paciente
    res.render('odontologo/Recetar.ejs',{Paciente: {Paciente},datos: rows[0],datos2: {atencion}})
}

export const vT = async(req,res) =>{
    const [rows]=await pool.query('select atencion.id as id,tratamiento.nombre as tratamiento,horaInicio,horaFin,idFicha as ficha,estadoAtencion.detalle as Estado,Preciototal from atencion,estadoAtencion,paciente,tratamiento,ficha where estadoAtencion.id=idEstadoA and atencion.idFicha=ficha.id and idTratamiento=tratamiento.id and paciente.usuario=? order by ficha.id desc',req.body.Paciente)
    const [row] = await busqueda.PacienteEsp(req.body.id)
    const atencion =  req.body.atencion
    const Paciente = req.body.Paciente
    res.render('odontologo/TrataP.ejs',{Paciente: {Paciente}, datos: row[0], datos1: rows , datos2:{atencion}})
}

export const vO = async(req,res) =>{
    const [rows]=await pool.query('select atencion.id as id,tratamiento.nombre as tratamiento,horaInicio,horaFin,idFicha as ficha,estadoAtencion.detalle as Estado,Preciototal from atencion,estadoAtencion,paciente,tratamiento,ficha where estadoAtencion.id=idEstadoA and atencion.idFicha=ficha.id and idTratamiento=tratamiento.id and paciente.usuario=? order by ficha.id desc',req.body.Paciente)
    const [row] = await busqueda.PacienteEsp(req.body.id)
    const atencion =  req.body.atencion
    const Paciente = req.body.Paciente
    res.render('odontologo/Odontograma.ejs',{Paciente: {Paciente}, datos: row[0], datos1: rows , datos2:{atencion}})
}


export const FinT = async(req,res) =>{
    const [rows]=await pool.query('select atencion.id as id,tratamiento.nombre as tratamiento,horaInicio,horaFin,idFicha as ficha,estadoAtencion.detalle as Estado,Preciototal from atencion,estadoAtencion,paciente,tratamiento,ficha where estadoAtencion.id=idEstadoA and atencion.idFicha=ficha.id and idTratamiento=tratamiento.id and paciente.usuario=? order by ficha.id desc',req.body.Paciente)
    const [Total]=await pool.query('select SUM(Preciototal) as Total from atencion,estadoAtencion,odontologo,ficha where estadoAtencion.id=idEstadoA and idFicha=ficha.id and odontologo.usuario=? AND atencion.idEstadoA=1 and ficha.usuarioP=?',[req.user[0].user,req.body.Paciente])
    const [row] = await busqueda.PacienteEsp(req.body.id)
    const atencion =  req.body.atencion
    const Paciente = req.body.Paciente
    res.render('odontologo/Finalizar.ejs',{Total:Total[0],Paciente: {Paciente}, datos: row[0], datos1: rows , datos2:{atencion}})
}

export const Fin = async(req,res) =>{
    const atencion =  req.body.atencion
    const Paciente = req.body.Paciente
    console.log(atencion)
    const hora = today.toLocaleTimeString()
    const Hora1 = hora.split(' ')[0] 
    await pool.query('update historia set informacion = ? where usuarioP=?',[req.body.detalle,Paciente])
    await pool.query('update atencion set idEstadoA = 2 where id = ?',atencion)
    await pool.query('update atencion set Preciototal = ? where id = ?',[req.body.Total,atencion])
    await pool.query('update atencion set idEstadoA = 2 where idEstadoA = ?',1)
    await pool.query('update atencion set horaFin = ? where id = ?',[Hora1,atencion])
    res.redirect('/home')
}

export const SigR = async(req,res) =>{
    const atencion =  req.body.atencion
    const Paciente = req.body.Paciente
    const Odontologo = req.user[0].user
    const [Tratamientos] = await busqueda.ListarTratamientos()
    console.log(Tratamientos)
    res.render('odontologo/SigTrata.ejs',{Tratamientos: Tratamientos, Paciente:{Paciente},datos2:{atencion},Odontologo:{Odontologo}})
}

export const ContTra = async(req,res) =>{
    const atencion =  req.body.atencion
    const Paciente = req.body.Paciente
    const Odontologo = req.user[0].user
    const today= new Date();
    var day = today.getDate(); 
    // `getMonth()` devuelve el mes (de 0 a 11)
    var month = today.getMonth() + 1; 
    // `getFullYear()` devuelve el año completo
    var year = today.getFullYear(); 
    // muestra la fecha de hoy en formato `MM/DD/YYYY`
    const FechaR = `${year}/${month}/${day}`
    const hora = today.toLocaleTimeString()
    const Hora1 = hora.split(' ')[0] 
    await pool.query('insert into ficha(fechaReserva,fechaCita,horaCita,usuarioOdonto,usuarioP,idEstadoRes,idTratamiento) values (?,?,?,?,?,?,?)',[FechaR,req.body.Fecha,req.body.hora,Odontologo,Paciente,1,req.body.Tratamiento])
    await pool.query('update atencion set horaFin = ? where id = ?',[Hora1,atencion])
    res.redirect('/home')
}
