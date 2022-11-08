import { Router } from "express";
import { 
         agendarOdontologo,
         reservarFicha,
         insertarFicha,
         entrarAgendar
         } from "../controllers/reserva.controller.js";

import { logeado,
        logeadoP
 } from "../lib/privado.js";

const router = Router();

router.get('/agendar', logeadoP, entrarAgendar);
router.post('/agendarO', logeado, agendarOdontologo);
router.post('/agendarFT', logeado, reservarFicha);
router.post('/reservar', logeado, insertarFicha);

export default router;
