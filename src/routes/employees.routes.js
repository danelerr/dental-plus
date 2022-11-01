import { Router } from "express";
import {
  getEmployees,
  createEmployees,
  updateEmployees,
  deleteEmployee,
  getOcupacion
} from "../controllers/employees.controller.js";

const router = Router();

router.get("/employees", getEmployees);

router.get("/employees/:id", getOcupacion);

router.post("/employees", createEmployees);

//para actualizar solo un dato, cambiar por path
router.put("/employees/:id", updateEmployees);

router.delete("/employees/:id", deleteEmployee);

export default router;
