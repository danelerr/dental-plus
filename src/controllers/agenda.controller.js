import { pool } from "../db.js";

export const getAgenda = async(req, res) => { 
    res.render('odontologo/calendario.ejs');
}





export const fichasView = async(req, res) => {
    try {
        const [rows] = await pool.query('select ficha.id, date_format(ficha.fechaCita, "%d-%m-%Y") as fechaCita, horaCita, especialidad.nombre as especialidadNombre, tratamiento.nombre as nombreTratamiento, usuario.nombre as odonto from ficha, usuario, tratamiento, especialidad where (ficha.usuarioP = ?) and (tratamiento.id = idTratamiento) and (usuarioOdonto = usuario.user) and (especialidad.id = tratamiento.idEspecialidad); ', [req.user[0].user]);
        res.render('paciente/fichas.ejs', {datos: rows});
    } catch (error) {
        return res.status(500).json({
            mensaje: "algo salio mal",
        });
    }
}

export const eliminarFicha = async(req, res) => {
    const { idficha } = req.body;
    await pool.query('delete from ficha where id = ?', [idficha]);
    res.redirect('/misfichas');
}



export const fichasViewOdonto = async(req, res) => {
    try {
        const [rows] = await pool.query('select ficha.id, date_format(ficha.fechaCita, "%d-%m-%Y") as fechaCita, horaCita, especialidad.nombre as especialidadNombre, tratamiento.nombre as nombreTratamiento, usuario.nombre as pacient from ficha, usuario, tratamiento, especialidad where (ficha.usuarioOdonto = ?) and (tratamiento.id = idTratamiento) and (usuarioP = usuario.user) and (especialidad.id = tratamiento.idEspecialidad); ', [req.user[0].user]);
        res.render('odontologo/listafichas.ejs', {datos: rows});
    } catch (error) {
        return res.status(500).json({
            mensaje: "algo salio mal",
        });
    }
}
