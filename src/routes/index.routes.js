import { Router } from "express";
import { ping, 
         showLogin,
         slash, 
         sendData} from "../controllers/index.controller.js";
  
const router = Router();

router.get('/', slash);
router.get("/ping", ping);
router.get('/login', showLogin);
router.post('/login', sendData);

export default router;
