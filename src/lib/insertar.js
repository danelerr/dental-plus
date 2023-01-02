import { pool } from "../db.js";
const Insertar = {}

Insertar.Paciente = async(arregloU,arregloP,req,res) =>{
        try {
                await pool.query('INSERT INTO usuario SET ?', [arregloU]);
                await pool.query('INSERT INTO paciente SET ?', [arregloP]);     
        } catch (error) {
        req.flash('denegado', 'usuario ocupado') 
        res.redirect('/rpaciente');
        }
        
}

Insertar.odontologo = async(arregloU,arregloO,req,res) =>{
        try {
        await pool.query('INSERT INTO usuario SET ?', [arregloU]);
        await pool.query('INSERT INTO odontologo SET ?', [arregloO]);
        } catch (error) {
        req.flash('denegado', 'usuario ocupado') 
        res.redirect('/rodonto');
        }
        
}

Insertar.Servicio = async( arreglo ) => {
        await pool.query('INSERT INTO tratamiento SET ?', [arreglo]);
}

export default Insertar;