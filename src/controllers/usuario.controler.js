import { pool } from "../db.js";
import passport from 'passport';

export const insertarUsuario = async (req, res) => {
    const [rows] = await pool.query("select * from ocupacion where id not in (10, 12)");
    res.render('registro.ejs', {datos: rows});
};


export const addUser = passport.authenticate('local.regist', {
    successRedirect: '/home',
    failureRedirect: '/form',
    failureFlash: true
})

export const entrarHome = (req, res) => {
    res.render('home.ejs');
}