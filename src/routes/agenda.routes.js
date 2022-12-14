import { Router } from "express";


import {
    getAgenda,
    fichasView,
    eliminarFicha
} from '../controllers/agenda.controller.js'

import { 
        logeadoO,
        logeadoP,
        logeado
 } from "../lib/privado.js";

const router = Router();

router.get('/agenda', logeadoO, getAgenda);
router.get('/misfichas', logeadoP, fichasView);
router.post('/misfichas/eliminar', logeado, eliminarFicha);

export default router;
