import { pool } from "../db.js";

export const renderVistaReportes = (req, res) => {
  const rep = [
    {
      tipo: "Usuarios",
      valor: 1,
    },
    {
      tipo: "Pacientes",
      valor: 2,
    },
    {
      tipo: "Odontologos",
      valor: 3,
    },
    {
      tipo: "Administradores",
      valor: 4,
    },
    {
      tipo: "Administradores",
      valor: 5,
    },
    {
      tipo: "Consultorios",
      valor: 6,
    },
    {
      tipo: "Especialidades",
      valor: 7,
    },
    {
      tipo: "Atenciones",
      valor: 8,
    },
  ];
  res.render("reportes/reportes.ejs", { rep });
};

export const generarPDF = async (req, res) => {
  const valor = parseInt(req.params.valor);
  let topdf = {};
  if (valor == 1) {
    topdf.head = ['user', 'nombre', 'correo', 'edad', 'fecha de nacimiento', 'ocupacion'];
    const [rows] = await pool.query('select user, usuario.nombre, correo, edad, fechaNac, ocupacion.nombre as ocu from usuario, ocupacion where ocupacion.id = idOcupacion;');
    topdf.body = rows;
    topdf.file = 'Reporte de usuarios.pdf';
    topdf.titulo = 'Reporte - Usuarios del sistema';
  } else if (valor == 2) {

  } else if (valor == 3) {

  } else if (valor == 4) {

  } else if (valor == 5) {

  } else if (valor == 6) {

  } else if (valor == 7) {

  } else {

  }
  res.render('reportes/pdf.ejs', topdf);
};