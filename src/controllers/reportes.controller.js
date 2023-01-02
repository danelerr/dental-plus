import { pool } from "../db.js";

export const renderVistaReportes = (req, res) => {
  const rep = [
    {tipo: "Usuarios", valor: 1},
    {tipo: "Pacientes", valor: 2},
    {tipo: "Odontologos", valor: 3},
    {tipo: "Administradores", valor: 4},
    {tipo: "Consultorios", valor: 5},
    {tipo: "Especialidades", valor: 6},
    {tipo: "Atenciones", valor: 7}
  ];
  res.render("reportes/reportes.ejs", { rep });
};

export const generarPDF = async (req, res) => {
  const valor = parseInt(req.params.valor);
  let topdf = {};

  if (valor == 1) {
    //REPORTE DE USUARIOS pdf

    topdf.head = ['user', 'nombre', 'correo', 'edad', 'fecha de nacimiento', 'ocupacion'];
    const [rows] = await pool.query('select user, usuario.nombre, correo, edad, fechaNac, ocupacion.nombre as ocu from usuario, ocupacion where ocupacion.id = idOcupacion;');

    let mat = [];
    rows.forEach((element, index, array) => {
      mat.push([element.user, element.nombre, element.correo, element.edad, element.fechaNac, element.ocu]);
    });
    topdf.body = mat;
    topdf.file = 'Reporte de usuarios.pdf';
    topdf.titulo = 'Reporte - Usuarios del sistema';

  } else if (valor == 2) {
    //REPORTES DE PACIENTES pdf

    topdf.head = ['usuario', 'nombre', 'sexo', 'edad', 'telefono', 'tutor'];
    const [rows] = await pool.query('select paciente.usuario, usuario.nombre, paciente.sexo, usuario.edad, paciente.telefono, usuarioTutor as tutor from paciente, usuario where usuario.user = paciente.usuario;');

    let mat = [];
    rows.forEach((element, index, array) => {
      mat.push([element.usuario, element.nombre, element.sexo, element.edad, element.telefono, element.tutor]);
    });
    topdf.body = mat;
    topdf.file = 'Reporte de pacientes.pdf';
    topdf.titulo = 'Reporte - Pacientes registrados en el sistema';

  } else if (valor == 3) {
    //REPORTE DE ODONTOLOGOS pdf

    topdf.head = ['usuario', 'nombre', 'telefono', 'correo', 'Número de consultorio'];
    const [rows] = await pool.query('select odontologo.usuario, usuario.nombre, odontologo.telefono, usuario.correo, idConsul from odontologo, usuario where odontologo.usuario = usuario.user;');
    let mat = [];
    rows.forEach((element, index, array) => {
      mat.push([element.usuario, element.nombre, element.telefono, element.correo, element.idConsul]);
    });
    topdf.body = mat;
    topdf.file = 'Reporte de odontologos.pdf';
    topdf.titulo = 'Reporte - Odontólogos en DentalPlus';

  } else if (valor == 4) {
    //REPORTE DE ADMINISTRADORES pdf
    
    topdf.head = ['usuario', 'nombre', 'cargo'];
    const [rows] = await pool.query('select administrador.usuario, usuario.nombre, cargo from administrador, usuario where administrador.usuario = usuario.user;');
    let mat = [];
    rows.forEach((element, index, array) => {
      mat.push([element.usuario, element.nombre, element.cargo]);
    });
    topdf.body = mat;
    topdf.file = 'Reporte de administradores.pdf';
    topdf.titulo = 'Reporte - Administradores de DentalPlus';

  } else if (valor == 5) {
    //REPORTE DE CONSULTORIOS pdf

    topdf.head = ['Número', 'Descripción'];
    const [rows] = await pool.query('select nro, direccion as descripcion from consultorio;');
    let mat = [];
    rows.forEach((element, index, array) => {
      mat.push([element.nro, element.descripcion]);
    });
    topdf.body = mat;
    topdf.file = 'Reporte de consultorios.pdf';
    topdf.titulo = 'Reporte - Consultorios en la clínica';

  } else if (valor == 6) {
    //REPORTE DE ESPECIALIDADES pdf

    topdf.head = ['Especialidad', 'Odontólogo que la atiende'];
    const [rows] = await pool.query('select especialidad.nombre as especialidad, concat_ws(" ", usuario.nombre) as odontologo from especialidadodonto, especialidad, odontologo, usuario where especialidad.id = idEspe and odontologo.usuario = usuario.user and usuarioOdonto = odontologo.usuario order by especialidad.nombre asc;');
    let mat = [];
    rows.forEach((element, index, array) => {
      mat.push([element.especialidad, element.odontologo]);
    });
    topdf.body = mat;
    topdf.file = 'Reporte de especialidades.pdf';
    topdf.titulo = 'Reporte - Especialidades y especialistas';

  } else {
    //REPORTE DE ATENCIONES pdf
    topdf.head = ['Nro de ticket', 'hora de inicio', 'hora de finalización', 'Estado', 'nombre del paciente', 'nombre del odontólogo', 'tratamiento', 'Precio total'];
    const [rows] = await pool.query('select idFicha as ticket, horaInicio, horaFin, estadoatencion.detalle, paciente.nombre as nombrepaciente, odontologo.nombre as nombreodontologo, tratamiento.nombre as tratamiento, Preciototal from atencion, usuario as paciente, usuario as odontologo, estadoatencion, ficha, tratamiento where (idFicha = ficha.id) and (estadoatencion.id = idEstadoA) and (ficha.usuarioP = paciente.user) and (ficha.usuarioOdonto = odontologo.user)  and (ficha.idTratamiento = tratamiento.id) order by idEstadoA;');
    let mat = [];
    console.log(rows);
    rows.forEach((element, index, array) => {
      mat.push([element.ticket, element.horaInicio, element.horaFin, element.detalle, element.nombrepaciente, element.nombreodontologo, element.tratamiento, element.Preciototal]);
    });
    topdf.body = mat;
    topdf.file = 'Reporte de atenciones.pdf';
    topdf.titulo = 'Reporte - Atenciones realizadas, programadas y canceladas';
  }
  res.render('reportes/pdf.ejs', topdf);
};