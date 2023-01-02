import { pool } from "../db.js";
import passport from 'passport';
import Insertar from "../lib/insertar.js"
import Eliminar from "../lib/eliminar.js";
import Modificar from "../lib/modificar.js";
import busqueda from "../lib/busquedas.js";
import helprs from "../lib/helpers.js"
import Listar from "../lib/mostrar.js";


export const insertarUsuario = async (req, res) => {
    const [rows] = await pool.query("select * from ocupacion where id not in (10, 12)");
    res.render('usuario/registro.ejs', {datos: rows});
};

export const addUser = passport.authenticate('local.regist', {
    successRedirect: '/home', //perfil
    failureRedirect: '/form',
    failureFlash: true
})

export const entrarHome = (req, res) => {
    res.render('usuario/home.ejs'); //perfil 
} 

////////////////////// SERVICIOS ////////////////////
export const entrarGpaciente = (req, res) => {
    res.render('odontologo/gpaciente.ejs');
}

export const entrarservicio = async(req, res) => {
    const [rows] = await pool.query("select * from especialidad");
    res.render('servicio/servicio.ejs', {datos: rows});
}

export const Mservicio = async(req, res) => {
    const id = req.body.idM
    const row = await pool.query ('SELECT * FROM tratamiento WHERE id = ?', [id])
    res.render('servicio/mservicio.ejs', { datos: row[0] });
}

export const InsertarServi =  async (req,res)=>{
    const { nombre, descripcion, tiempo, precio} = req.body;
    const idEspecialidad = parseInt(req.body.Especialidad);
    const arreglo ={ nombre, descripcion, tiempo, precio, idEspecialidad};
    await Insertar.Servicio(arreglo);
    await pool.query('INSERT INTO bitacora(accion,culpable) Values(?, ?)',['Inserto un nuevo Servicio',req.user[0].user])
    res.redirect('/servicio');
}

export const ModificarServi =  async (req,res)=>{
    const { id , nombre, descripcion, tiempo, precio } = req.body;
    await Modificar.Servicio(id ,nombre, descripcion, tiempo, precio )
    await pool.query('INSERT INTO bitacora(accion,culpable) Values(?, ?)',['Se modifico un Servicio',req.user[0].user])
    res.redirect('/listadoSE');
}

export const EliminarServi =  async (req,res)=>{
    const { id } = req.body;
    await Eliminar.Servicio(id)
    await pool.query('INSERT INTO bitacora(accion,culpable) Values(?, ?)',['Se elimino un Servicio',req.user[0].user])
    res.redirect('/listadoSE');
}

export const listado = (req, res) => {
    res.render('partials/listadoSE.ejs');
}


/////////////////////// ADMINISTRADOR ///////////////////
export const entrarGodonto = (req, res) => {
    res.render('administrador/godonto.ejs');
}

export const RenderformP = async(req, res) => {
    const [ocupacion] = await pool.query('SELECT * FROM ocupacion')
    res.render('odontologo/rpaciente.ejs',{ocupacion});
}

export const Renderform = async(req, res) => {
    const [rows] = await pool.query("select * from consultorio");
    res.render('administrador/rodonto.ejs',{ datos: rows });
}

export const ListarOdonto = async(req, res) => {
    const nombre = req.body.nombre
    const row = await pool.query ('SELECT user,nombre,edad,date_format(fechaNac, "%d-%m-%Y %T") as fechaNac,correo,idConsul,telefono FROM usuario,odontologo WHERE usuario.user = odontologo.usuario AND nombre = ?', [nombre])
    res.render('administrador/godonto.ejs', {datos: row[0]});
}

export const Listarpaciente = async(req, res) => {
    const nombre = req.body.nombre
    const row = await pool.query ('SELECT * FROM usuario,paciente WHERE user = usuario AND nombre = ?', [nombre])
    if(row[0].length!=0){
        const ocupacion = await busqueda.NomOcu(row[0][0].idOcupacion)
        row[0][0].idOcupacion=ocupacion
    }
    res.render('odontologo/gpaciente.ejs', {datos: row[0] });
}

export const InsertarOdonto =  async (req,res)=>{  
    try {
        const idRol = 1
        const idOcupacion = 10
        const tipo = 'O'
        const { user, nombre, edad, fechaNac, correo, idConsul, contra, telefono } = req.body;        
    const datosU = { user, contra, correo, nombre, edad, fechaNac, tipo, idRol, idOcupacion };
    const usuario = datosU.user
    const DatosO = {usuario,telefono,idConsul}
    datosU.contra = await helprs.encriptar(contra);
    await Insertar.odontologo(datosU,DatosO,req,res);
    await pool.query('INSERT INTO bitacora(accion,culpable) Values(?, ?)',['Agrego nuevo Odontologo',req.user[0].user])
    res.redirect('/godonto');
} catch (error) {
        console.log(error)
        req.flash('denegado', 'usuario ocupado')        
    }    
}

export const ModificarOdonto =  async (req,res)=>{    
    const { Olduser ,user, nombre, edad, fechaNac, correo, idConsul, contra, telefono,} = req.body;
    await Modificar.Odonto(Olduser,user ,nombre, edad, fechaNac, correo,idConsul,contra,telefono)
    await pool.query('INSERT INTO bitacora(accion,culpable) Values(?, ?)',['Se modifico un odontologo',req.user[0].user])
    res.redirect('/godonto');
}

export const Modonto = async(req, res) => {
    const user = req.body.user
    const row = await pool.query ('SELECT user,nombre,edad,date_format(fechaNac, "%d-%m-%Y %T") as fechaNac,correo,idConsul,telefono FROM usuario,odontologo WHERE user = ?', [user])
    const [consul] = await pool.query("select * from consultorio");
    res.render('administrador/modonto.ejs', { datos: row[0] , consul });
}

export const EliminarOdonto =  async (req,res)=>{
    const { user } = req.body;
    await Eliminar.Odonto(user)
    await pool.query('INSERT INTO bitacora(accion,culpable) Values(?, ?)',['Se elimino un odontologo',req.user[0].user])
    res.redirect('/godonto');
}

export const InsertarPaciente =  async (req,res)=>{
    try {
        const idRol = 3
        const idOcupacion = 1
        const tipo = 'P'
    const usuarioTutor = null;
    const { user, nombre, edad, sexo, fechaNac, correo, contra, telefono } = req.body; // obtengo todos los datps desde el formulario
    const datosU = { user, contra, correo, nombre, edad, fechaNac, tipo, idRol, idOcupacion}; // lo pongo en un arreglo
        const usuario = datosU.user
        const datosP = { usuario, sexo, telefono, usuarioTutor }
        datosU.contra = await helprs.encriptar(contra); // encripto la contraseña
        await Insertar.Paciente(datosU,datosP);
        await pool.query('INSERT INTO bitacora(accion,culpable) Values(?, ?)',['Agrego nuevo Paciente',req.user[0].user])
        res.redirect('/gpaciente');
    } catch (error) {
        console.log(error)
        req.flash('denegado', 'usuario ocupado')
    }    
}

export const ModificarPaciente =  async (req,res)=>{  
    const { Olduser, user, nombre, edad, sexo, fechaNac, correo, contra, telefono,idOcupacion } = req.body;
    await Modificar.Paciente(Olduser,user ,nombre, edad, sexo, fechaNac, correo,contra,telefono,idOcupacion,req )
    await pool.query('INSERT INTO bitacora(accion,culpable) Values(?, ?)',['Se modifico un paciente',req.user[0].user])
    res.redirect('/gpaciente');
}

export const Mpaciente = async(req, res) => {
    const user = req.body.user
    const row = await pool.query ('SELECT user,usuario.nombre,edad,sexo,date_format(fechaNac, "%d-%m-%Y") as fechaNac,correo,ocupacion.nombre as idOcupacion,telefono FROM usuario,paciente,ocupacion WHERE user = ?', [user])
    const [ocupacion] = await pool.query('SELECT * FROM ocupacion')
    res.render('odontologo/mpaciente.ejs', { datos: row[0], ocupacion });
}

export const EliminarPaciente =  async (req,res)=>{
    const { user } = req.body;
    await Eliminar.Paciente(user)
    await pool.query('INSERT INTO bitacora(accion,culpable) Values(?, ?)',['Elimino un paciente',req.user[0].user])
    res.redirect('/gpaciente');
}

export const buscarPacientes = async(req, res) => {
    const search = req.query.search;
     const [rows] = await pool.query('Select * from usuario,paciente where user = usuario');
    let i = 0;
    while (i < rows.length) {
        if (rows[i].nombre.search(new RegExp(search, 'i')) === -1) {
            rows.splice(i, 1);
        } else {
            i++;
        }
    }
    res.render('odontologo/bpaciente.ejs', {datos: rows});
}



export const buscarOdontologos = async(req, res) => {
    const search = req.query.search;
     const [rows] = await pool.query('Select * from usuario,odontologo where user = usuario');
    let i = 0;
    while (i < rows.length) {
        if (rows[i].nombre.search(new RegExp(search, 'i')) === -1) {
            rows.splice(i, 1);
        } else {
            i++;
        }
    }
    res.render('administrador/bodonto.ejs', {datos: rows});
}

export const EntrarBitacora = async(req,res) => {
    const bit = []
    res.render('administrador/Bitacora.ejs',{bit})
}

export const entrar = async(req,res) => {
    const Inicio = req.body.Inicio
    const Fin = req.body.Fin
    const [bit] = await pool.query('Select id,date_format(fecha, "%d-%m-%Y %T")as fecha ,accion,culpable  From bitacora where fecha BETWEEN "'+Inicio+'" AND "'+Fin+'" ORDER BY id desc')
    res.render('administrador/Bitacora.ejs',{bit: bit})
}


export const EntrarHis = async(req,res)=>{
    res.render('odontologo/HistorialB.ejs')
}

export const buscarHPacientes = async(req, res) => {
    const search = req.query.search;
    const [rows] = await pool.query('Select * from usuario,paciente where user = usuario');
    let i = 0;
    while (i < rows.length) {
        if (rows[i].nombre.search(new RegExp(search, 'i')) === -1) {
            rows.splice(i, 1);
        } else {
            i++;
        }
    }
    res.render('odontologo/BHistorial.ejs', {datos: rows});
}

export const Historia = async(req,res) =>{
    const [rows] = await busqueda.PacienteEsp(req.body.user)
    res.render('odontologo/Historial.ejs',{ datos: rows[0] })
}

export const ModiCuest = async(req,res) =>{
    await Modificar.cuest(req.body)
    res.redirect('/Historias')
}
export const Histrata = async(req,res) =>{
    const [rows] = await Listar.HT(req.body.id)
    console.log(rows)
    res.render('odontologo/HTratamientos.ejs',{ datos: rows })
}

export const Atencion = async(req,res) =>{
    const result = await busqueda.fichaP(req.body.idficha)
    const usuario = result[0]
    const P = await busqueda.Tratamiento(req.body.idficha)
    const id = await busqueda.idHis(usuario[0].usuarioP)
    const idhis = id[0]
    console.log(idhis)
    const precio = P[0]
    const today= new Date();
    const datos = [today.toLocaleTimeString(),'00:00:00',req.body.idficha,req.body.estadoAte,precio[0].precio,idhis[0].id]
    await pool.query('INSERT INTO atencion(horaInicio, horaFin, idFicha, idEstadoA, Preciototal,IdHis) VALUES (?,?,?,?,?,?)',datos)
    const [row] = await busqueda.PacienteEsp(usuario[0].usuarioP)
    res.render('odontologo/Historial.ejs',{ datos: row[0] })
}