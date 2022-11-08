import { pool } from "../db.js";
const Insertar = {}

Insertar.Paciente = async(arregloU,arregloP) =>{
        await pool.query('INSERT INTO usuario SET ?', [arregloU]);
        await pool.query('INSERT INTO paciente SET ?', [arregloP]);
}

Insertar.odontologo = async(arregloU,arregloO) =>{
        await pool.query('INSERT INTO usuario SET ?', [arregloU]);
        await pool.query('INSERT INTO odontologo SET ?', [arregloO]);
}

Insertar.Servicio = async( arreglo ) => {
        await pool.query('INSERT INTO tratamiento SET ?', [arreglo]);
}

export default Insertar;