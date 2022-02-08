const Role = require("../models/role")
const Usuario = require("../models/usuario");




 const esRolValido = async (rol = " " ) =>{
    const existeROL = await Role.findOne({rol});
    if( !existeROL ){
        throw new Error(` el rol ${rol} no estta registrado en la BBDD`)
    }

}


    const existeEmail = async(correo = "") =>{
        //verificar si el correo existe
        const existeEmail =  await Usuario.findOne({correo});
            if( existeEmail ){
                  throw new Error(`el correo ${ correo } , ya esta registrado`);
        }

    }; 

    const existeUsuarioPOrID = async(id ) =>{
        //verificar si el correo existe
        const existeUsuarioPOrID =  await Usuario.findById(id);
            if(!existeUsuarioPOrID ){
                  throw new Error(`el correo ${ id} , ya esta registrado`);
        }

    }; 



module.exports ={
    esRolValido,
    existeEmail,
    existeUsuarioPOrID
}