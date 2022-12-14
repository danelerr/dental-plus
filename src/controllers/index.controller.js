import { pool } from "../db.js";
import passport from 'passport';

export const slash = (req, res) => {
  res.render('index.ejs', { titulo: 'hola' });
};

//para mostrar los imputs de login
export const showLogin = (req, res) => {
  res.render('usuario/iniciarSesion.ejs');
};

//para iniciar sesion
export const sendData = passport.authenticate('local.login', {
  successRedirect: '/home', //perfil
  failureRedirect: '/login',
  failureFlash: true
});

//para cerrar sesion
export const cerrarSesion = async(req, res) => {
  await pool.query('INSERT INTO bitacora(accion,culpable) Values(?, ?)',['Cerro sesion',req.user[0].user])
  req.logOut(async(err) => {
    if (err) { 
      return next(err); 
    }    
    res.redirect('/');
  });
};
