import { pool } from "../db.js";
import passport from 'passport';

export const slash = (req, res) => {
  console.log(req.user);
  res.render('index.ejs', { titulo: 'hola' });
};

export const ping = async (req, res) => {
  try {
    const [rows] = await pool.query("show tables");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      mensaje: "algo salio mal",
    });
  }
};


//para mostrar los imputs de login
export const showLogin = (req, res) => {
  res.render('iniciarSesion.ejs');
};

//para iniciar sesion
export const sendData = passport.authenticate('local.login', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
});