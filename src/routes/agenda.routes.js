import { Router } from "express";


import {
    getAgenda,
    fichasView,
    eliminarFicha,
    fichasViewOdonto
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
router.get('/listafichas', logeadoO, fichasViewOdonto);

export default router;
