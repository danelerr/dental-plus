import { Router } from "express";


import {
    getAgenda
} from '../controllers/agenda.controller.js'

import { 
        logeadoO
 } from "../lib/privado.js";

const router = Router();

router.get('/agenda', logeadoO, getAgenda);

export default router;
