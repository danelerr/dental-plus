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