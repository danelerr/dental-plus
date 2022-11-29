import { pool } from "../db.js";
import passport from 'passport';


//para seleccionar especialidad
export const entrarAgendar = async (req, res) => {
  try {
    const [rows] = await pool.query("select * from especialidad");
    res.render('paciente/agendar.ejs', {datos:rows});
  } catch (error) {
    return res.status(500).json({
      mensaje: "algo salio mal",
    });
  }
}

// para luego de seleccionar especialidad, seleccionar odontologo
export const agendarOdontologo = async(req, res) => {
  try {
    console.log(req.body);
    req.flash('ficha', req.body);
    const [rows] = await pool.query(
      "select usuario.nombre, odontologo.usuario from especialidadOdonto, odontologo, usuario where idEspe = ? and odontologo.usuario = usuarioOdonto and odontologo.usuario = usuario.user;", req.body.idespe);
    if (rows.length <= 0) {
        return res.status(404).json({
            mensaje: "No hay odontologos que traten esa cosa",
        });
      }
      res.render('paciente/agendarO.ejs', {datos: rows});
    } catch (error) {
      // return res.status(500).json({
      //   mensaje: "algo salio mal",
      // });
      res.send(error);
    }
}

export const reservarFicha = async(req, res) => { 
  try {
    const espe = req.flash('ficha')[0];
    console.log(espe);
    console.log(req.body);
    req.flash('ficha', [espe, req.body]);
    const [rows] = await pool.query(
      "select tratamiento.* from tratamiento, especialidad where tratamiento.idEspecialidad = especialidad.id and idEspecialidad = ?", espe.idespe);
    if (rows.length <= 0) {
        return res.status(404).json({
            mensaje: "No hay odontologos que traten esa cosa",
        });
    }
    res.render('paciente/agendarFT.ejs', {datos: rows, idd: espe.idespe});
    } catch (error) {
    //   return res.status(500).json({
    //     mensaje: "algo salio mal",
    // });
    console.log('hubo un error');
    res.send(error);
  }
}

export const insertarFicha = async (req, res) => {
    console.log("body = ");
    console.log(req.body);
    const flash = req.flash('ficha');
    console.log(flash);

    try {
        const x = new Date();
        let a = x.getMonth() +1;
        const fecha = x.getFullYear() + '-' + a + '-' + x.getDate();
        const fechaReserva = fecha
        const fechaCita = req.body.fecha
        const horaCita =  req.body.hora
        const usuarioOdonto = flash[1].idodonto;
        const usuarioP =  req.user[0].user
        const idEstadoRes =  1
        const idTratamiento =  req.body.idtrata;
        // console.log(fechaReserva)
        // console.log(fechaCita)
        // console.log(horaCita)
        // console.log(usuarioOdonto)
        // console.log(usuarioP)
        // console.log(idEstadoRes)
        // console.log(idTratamiento)
        const data = {fechaReserva, fechaCita, horaCita, usuarioOdonto, usuarioP, idEstadoRes, idTratamiento};
        console.log(data);
        const [result] = await pool.query('INSERT INTO ficha SET ? ', [data]);
        req.flash('aprobado', 'reserva creada existosamente');
        res.redirect('/');
    } catch(error) {
        res.send(error);
    }
} 