const Role = require("../models/role")
const { Usuario,Categoria, Producto} = require("../models");




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


    /* validador personalido de categorias  */
    const existeCategoriaporId = async (id) =>{
        const existeProducto =  await Categoria.findById(id);
            if(!existeProducto ){
                  throw new Error(`el correo ${ id} , ya esta registrado`);
        }
    };


    //validar el id de productos
     const existeProductoporId = async (id) =>{
        const existeProducto =  await Producto.findById(id);
            if(!existeProducto ){
                  throw new Error(`el correo ${ id} , ya esta registrado`);
        }
    };

    
    const coleccionesPermitidas = (coleccion = "" , colecciones = []) =>{

        const incluida = colecciones.includes(coleccion);
        if (!incluida) {
            throw new Error (`la coleccion ${coleccion} no es permitida ${colecciones}`)
        }

        return true;
    };

module.exports ={
    esRolValido,
    existeEmail,
    existeUsuarioPOrID,
    existeCategoriaporId,
    existeProductoporId,
    coleccionesPermitidas
}