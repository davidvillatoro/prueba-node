const {response} = require("express");

const esAdminRol = (req,res = response, next) =>{

    if( !req.usuario){
        return res.status(500).json({
            msg: "se quiere verificar el role son validar el token primero"
        });
    }
    
    const { rol, nombre} = req.usuario;
    if( rol !== "ADMIN_ROL"){
        return res.status(500).json({
            msg: `${nombre} no es administrador -no puede hacer esto`
        });
    }


    next();

}


const tieneRol = (...roles) =>{  //aqui esperamso todos los roles lo hacemos con el operador 
    //res ... que se le conoce como el resto de operadores  de los que vienene en user-router

    return (req,res = response, next) =>{

        if( !req.usuario){
            return res.status(500).json({
                msg: "se quiere verificar el role son validar el token primero"
            });
        }

        if( !roles.includes(req.usuario.rol)){

            return res.status(401).json({
                msg:`el servicio requiere unos de estos roles ${roles}`
            });
    
        }
        
        next();

    }

};



module.exports ={
    esAdminRol,
    tieneRol
}