import express from "express";

//rutas 
import employeesRoutes from "./routes/ocupacion.routes.js";
import indexRoutes from "./routes/index.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import reservaRoutes from './routes/reserva.routes.js';

import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import morgan from "morgan";
import bodyParser from "body-parser";
import flash from 'connect-flash';
import passport from 'passport';
import session from 'express-session';

import Listar from "./lib/mostrar.js";
import helpers from "./lib/helpers.js";

//import MysqlStore from 'express-mysql-session';

import './lib/passport.js'

// import {
//     DB_DATABASE,
//     DB_HOST,
//     DB_PORT,
//     DB_USER,
//     DB_PASSWORD
//   } from './config.js'


const app = express();

app.use(session({
    secret: 'session',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(passport.initialize());
app.use(passport.session());


const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use( async (req, res, next) => {
    // res.status(404).json({
    //     mensaje: "endpoint not found"
    // })
    app.locals.aprobado = req.flash("aprobado");
    app.locals.denegado = req.flash("denegado");
    if (req.user) {//pregunta si hay datos en la varible global // si hay, lo mandamos el primer arreglo
        app.locals.user = req.user[0];
        app.locals.VerA = helpers.VRolA(req.user[0].idRol)
        app.locals.VerP = helpers.VRolP(req.user[0].idRol)
        app.locals.VerO = helpers.VRolO(req.user[0].idRol)
        const P = await Listar.Pacientes()
        const O = await Listar.Odonto()
        const A = await Listar.Admin()
        const S = await Listar.Servicios()
        const B = await Listar.Bitacora()
        app.locals.Servicios = S[0]
        app.locals.pacientes = P[0]       
        app.locals.odontologos = O[0]        
        app.locals.admins = A[0]
        app.locals.Bitacora = B[0]        
    } else {// si no hay mandamos la variable vacia
        app.locals.user = req.user;
    }    
    next();
});

app.use(express.static(join(__dirname, 'public'))) 


app.use(indexRoutes);
app.use(employeesRoutes);
app.use(usuarioRoutes);
app.use(reservaRoutes);

export default app;