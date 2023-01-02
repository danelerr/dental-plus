import bcrypt from "bcryptjs";
const helpers = {};
import busqueda  from "./busquedas.js";

// Funcion que devuele contraseña encriptada------------------------------
helpers.encriptar = async (contra) => {
    const hash = await bcrypt.hash(contra, 10)
    return hash
}
//-----------------------------------------------------------------------

// Funcion que compara y devuelve un boolean si la contraseña es correcta
helpers.descriptar = async (contra, Savecontra) => {
    try {
        const Result = await bcrypt.compare(contra, Savecontra);
        return Result
    } catch (e) {
        console.log(e)
    }
}
//-----------------------------------------------------------------------

helpers.VRolP = (Rol) => {
    if(Rol == 3){
        return true
    }
    return false
}
helpers.VRolA = (Rol) => {
    if(Rol == 2){
        return true
    }
    return false
}
helpers.VRolO = (Rol) => {
    if(Rol == 1){
        return true
    }
    return false
}

helpers.verificarOcup = async(Nocup) => {
    console.log(Nocup)
    const R = await busqueda.NumOcu(Nocup)
    console.log(R)
    return R
}
export default helpers;
