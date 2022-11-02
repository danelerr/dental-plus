import { Router } from "express";
import { ping, slash } from "../controllers/index.controller.js";

const router = Router();

router.get('/', slash);
router.get("/ping", ping);

export default router;
