import passport from 'passport';
import Strategy from 'passport-local';
import { pool } from "../db.js";
import helprs from './helpers.js'
import busqueda  from "./busquedas.js";

//para iniciar sesion
passport.use('local.login', new Strategy.Strategy({
    usernameField: 'UsuI',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, UsuI, pass, done) => {
    try {
        const rows = await busqueda.Usuario(UsuI)// consulta que nos ayuda a saber si el usuario existe
        if (rows.length > 0) { // ¿existe algun Usuario?
            const P = rows[0]
            const Validar = await helprs.descriptar(pass, P[0].contra);// verificamos su contraseña
            if (Validar) {// ¿contraseña correcta?
                const [rows] = await pool.query('insert into bitacora(accion, culpable) values(?, ?)', ['Ingresó al sistema', UsuI]);
                console.log('hola');
                done(null, P[0], req.flash('aprobado', 'Bienvenido' + UsuI)) // mando los datos a las variables globales y mando un mensaje de exito
            } else {
                done(null, false, req.flash('denegado', 'contraseña incorrecta'))
            }
        } else {
            return done(null, false, req.flash('denegado', 'usuario no existe'))
        }
    } catch {
        return done(null, false, req.flash('denegado', 'usuario no existe, error'))
    }
}))

// Procedimineto para registrarse
passport.use('local.regist', new Strategy.Strategy({
    usernameField: 'user',
    passwordField: 'contra',
    passReqToCallback: true
}, async (req, usuario, contra, done) => {
    try {
        const idRol = 3;
        const tipo = 'P';
        const idOcupacion = parseInt(req.body.ocupation);
        const usuarioTutor = null;
        const { user, nombre, edad, sexo, fechaNac, correo, contra, telefono } = req.body; // obtengo todos los datps desde el formulario
        const datosU = { user, contra, correo, nombre, edad, fechaNac, tipo, idRol, idOcupacion, }; // lo pongo en un arreglo
        const usuario = datosU.user
        const datosP = { usuario, sexo, telefono, usuarioTutor }
        datosU.contra = await helprs.encriptar(contra); // encripto la contraseña
        const [RespU] = await pool.query('INSERT INTO usuario SET ?', [datosU]);// inserto el usuario
        const [Resp] = await pool.query('INSERT INTO paciente SET ?', [datosP]);// inserto el usuario
        return done(null, datosU)// mando los datos a las variables globales
    } catch (e) {
        console.log(e)
        req.flash('denegado', 'usuario ocupado')
        done(null, null)
    }
    console.log(req.body);
}))


passport.serializeUser((usuario, done) => {
    done(null, usuario);// mando los datos a las variables globales
});

passport.deserializeUser(async (usuario, done) => {
    try {
        const rows = await busqueda.UsuarioT(usuario.user)
        done(null, rows[0]); // mando los datos a las variables globales
    } catch (e) {
        console.log(e)
    }
});