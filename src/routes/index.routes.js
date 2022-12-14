import { Router } from "express";
import { 
         showLogin,
         slash, 
         sendData,
        cerrarSesion
    } from "../controllers/index.controller.js";


import { notlogeado } from "../lib/privado.js";
const router = Router();


router.get('/', notlogeado, slash);
// para iniciar sesion
router.get('/login', notlogeado, showLogin);
router.post('/login', notlogeado, sendData);

router.get('/cerrar', cerrarSesion);

export default router;
