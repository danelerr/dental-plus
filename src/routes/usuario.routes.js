import { Router } from "express";
import { insertarUsuario, 
    addUser, 
    entrarHome,
    InsertarServi, 
    EliminarServi, 
    ModificarServi,
    entrarservicio, 
    listado, 
    Mservicio, 
    entrarGodonto, 
    ListarOdonto, 
    Renderform, 
    entrarGpaciente, 
    Listarpaciente, 
    RenderformP, 
    InsertarOdonto, 
    InsertarPaciente, 
    EliminarOdonto, 
    EliminarPaciente, 
    ModificarOdonto, 
    Modonto, 
    ModificarPaciente,
    Mpaciente, 
    buscarPacientes,
    buscarOdontologos,
    EntrarBitacora,
    entrar,
    EntrarHis,
    buscarHPacientes,
    Historia
} from "../controllers/usuario.controler.js";


import { logeado, logeadoA, logeadoE, logeadoP} from "../lib/privado.js";

const router = Router();

router.get("/form", insertarUsuario);
router.post('/form', addUser);
router.get('/home', logeado, entrarHome); //perfil


/////////////// SERVICIOS /////////////////////
router.get('/servicio', logeadoA, entrarservicio);
router.get('/listadoSE', logeadoA, listado)
router.post('/servicio/insert', logeadoA, InsertarServi);
router.post('/servicio/delete', logeadoA, EliminarServi);
router.post('/servicio/modificar', logeadoA, ModificarServi);
router.post('/mservicio', logeadoA, Mservicio);

///////////////// ODONTOLOGO ////////////////////
router.get('/godonto', logeado, entrarGodonto);
router.post('/godonto', logeado, ListarOdonto);
router.get('/rodonto', logeado, Renderform);
router.post('/rodonto/registrar', logeado, InsertarOdonto);
router.post('/godonto/delete', logeado, EliminarOdonto);
router.post('/godonto/modificar', logeado, ModificarOdonto);
router.post('/modonto', logeado, Modonto);
router.get('/bodonto', logeadoE, buscarOdontologos);

//////////////// PACIENTE //////////////////////////
router.get('/gpaciente', logeadoE, entrarGpaciente);
router.post('/gpaciente', logeadoE, Listarpaciente);
router.get('/rpaciente', logeadoE, RenderformP);
router.post('/rpaciente/registrar', logeadoE, InsertarPaciente);
router.post('/gpaciente/delete', logeadoE, EliminarPaciente);
router.post('/gpaciente/modificar', logeadoE, ModificarPaciente);
router.post('/mpaciente', logeadoE, Mpaciente);
router.get('/bpaciente', logeadoE, buscarPacientes);

router.post('/buscar',logeadoA,entrar)
router.get('/Bitacora',logeadoA,EntrarBitacora)
router.get('/Historias',logeadoE,EntrarHis)
router.get('/HistoriasB',logeadoE,buscarHPacientes)
router.get('/Hpaciente',Historia)


export default router;
