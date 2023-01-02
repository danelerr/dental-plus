
    export const logeadoP = (req, res, next) => {
        if (req.isAuthenticated() && (req.user[0].idRol == 3)) {
             return next();
        }
        return res.redirect('/login');
    }
    //----------------------------------------------------------------------------------

    // procedimiento que evita entrar a ciertas direcciones si estas logeado un admin
    export const logeadoA = (req, res, next) => {
        if (req.isAuthenticated() && (req.user[0].idRol == 2)) {
            return next();
        }
        return res.redirect('/login');
    }
    //---------------------------------------------------------------------------------

    // procedimiento que evita entrar a ciertas direcciones si estas logeado un odonto
    export const logeadoO = (req, res, next) => {
        if (req.isAuthenticated() && (req.user[0].idRol == 1)) {
            return next();
        }
        return res.redirect('/login');
    }
    //--------------------------------------------------------------------------------------------

    // procedimiento que evita entrar a ciertas direcciones si estas logeado un paciente o odonto
    export const logeadoE = (req, res, next) => {
        if (req.isAuthenticated() && (req.user[0].idRol == 1 || req.user[0].idRol == 2)) {
            return next();
        }
        return res.redirect('/login');
    }
    //---------------------------------------------------------------------------------------------

    // procedimiento que evita entrar a ciertas direcciones si estas logeado
    export const logeado = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/login');
    }
    //---------------------------------------------------------------------------------------------
    
    // procedimiento que evita entrar a ciertas direcciones si no estas logeado
    export const notlogeado = (req, res, next) => {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/home');//perfil
    }
    //-----------------------------------------------------------------------------------------------
