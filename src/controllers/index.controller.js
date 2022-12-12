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
export const cerrarSesion = (req, res) => {
  req.logOut((err) => {
    if (err) { 
      return next(err); 
    }
    res.redirect('/');
  });
};
