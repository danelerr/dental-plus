import { Router } from "express";
import { insertarUsuario, addUser, entrarHome } from "../controllers/usuario.controler.js";

const router = Router();

router.get("/form", insertarUsuario);
router.post('/form', addUser);

router.get('/home', entrarHome);

export default router;
