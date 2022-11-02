import { Router } from "express";
import {
  getOcupacionByID,
  createOcupacion,
  updateOcupacion,
  deleteOcupacion,
  getOcupacion
} from "../controllers/ocupacion.controller.js";

const router = Router();

router.get("/employees", getOcupacion);

router.get("/employees/:id", getOcupacionByID);

router.post("/employees", createOcupacion);

//para actualizar solo un dato, cambiar por path
router.put("/employees/:id", updateOcupacion);

router.delete("/employees/:id", deleteOcupacion);

export default router;
