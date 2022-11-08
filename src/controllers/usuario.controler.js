import { pool } from "../db.js";
import passport from 'passport';
import Insertar from "../lib/Insertar.js"
import Eliminar from "../lib/eliminar.js";
import Modificar from "../lib/modificar.js";
import busqueda from "../lib/busquedas.js";
import helprs from "../lib/helpers.js"


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

export const entrarservicio = (req, res) => {
    res.render('servicio/servicio.ejs');
}

export const Mservicio = async(req, res) => {
    const id = req.body.idM
    const row = await pool.query ('SELECT * FROM tratamiento WHERE id = ?', [id])
    res.render('servicio/mservicio.ejs', { datos: row[0] });
}

export const InsertarServi =  async (req,res)=>{
    const { nombre, descripcion, tiempo, precio} = req.body;
    const arreglo ={ nombre, descripcion, tiempo, precio};
    await Insertar.Servicio(arreglo);
    res.redirect('/servicio');
}

export const ModificarServi =  async (req,res)=>{
    const { id , nombre, descripcion, tiempo, precio } = req.body;
    await Modificar.Servicio(id ,nombre, descripcion, tiempo, precio )
    res.redirect('/listadoSE');
}

export const EliminarServi =  async (req,res)=>{
    const { id } = req.body;
    await Eliminar.Servicio(id)
    res.redirect('/listadoSE');
}

export const listado = (req, res) => {
    res.render('partials/listadoSE.ejs');
}


/////////////////////// ADMINISTRADOR ///////////////////
export const entrarGodonto = (req, res) => {
    const datos =[]
    res.render('administrador/godonto.ejs',{datos});
}

export const RenderformP = (req, res) => {
    res.render('odontologo/rpaciente.ejs');
}

export const Renderform = (req, res) => {
    res.render('administrador/rodonto.ejs');
}

export const ListarOdonto = async(req, res) => {
    const nombre = req.body.nombre
    const row = await pool.query ('SELECT * FROM usuario,odontologo WHERE usuario.user = odontologo.usuario AND nombre = ?', [nombre])
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
    await Insertar.odontologo(datosU,DatosO);
    res.redirect('/godonto');
} catch (error) {
        console.log(error)
        req.flash('denegado', 'usuario ocupado')        
    }    
}

export const ModificarOdonto =  async (req,res)=>{
    const { user, nombre, edad, fechaNac, correo, consultorio, contra, telefono } = req.body;
    await Modificar.Odonto(user ,nombre, edad, fechaNac, correo,consultorio,contra,telefono )
    res.redirect('/listadoSE');
}

export const Modonto = async(req, res) => {
    const user = req.body.user
    const row = await pool.query ('SELECT * FROM usuario,odontologo WHERE user = ?', [user])
    res.render('administrador/modonto.ejs', { datos: row[0] });
}

export const EliminarOdonto =  async (req,res)=>{
    const { user } = req.body;
    await Eliminar.Odonto(user)
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
        res.redirect('/gpaciente');
    } catch (error) {
        console.log(error)
        req.flash('denegado', 'usuario ocupado')
    }    
}

export const ModificarPaciente =  async (req,res)=>{    
    const { user, nombre, edad, sexo, fechaNac, correo, contra, telefono,ocupacion } = req.body;
    await Modificar.Paciente(user ,nombre, edad, sexo, fechaNac, correo,contra,telefono,ocupacion )
    res.redirect('/listadoSE');
}

export const Mpaciente = async(req, res) => {
    const user = req.body.user
    const row = await pool.query ('SELECT * FROM usuario,paciente WHERE user = ?', [user])
    res.render('odontologo/mpaciente.ejs', { datos: row[0] });
}

export const EliminarPaciente =  async (req,res)=>{
    const { user } = req.body;
    await Eliminar.Paciente(user)
    res.redirect('/gpaciente');
}

export const buscarPacientes = async(req, res) => {
    console.log('la query es')
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
