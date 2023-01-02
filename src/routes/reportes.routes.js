import { Router } from "express";
import { 
    renderVistaReportes,
    generarPDF
} from "../controllers/reportes.controller.js";

import { 
    logeadoA
} from "../lib/privado.js";
const router = Router();


router.get('/reportes', logeadoA, renderVistaReportes); 
router.get('/getreportepdf/:valor', logeadoA, generarPDF);
export default router;