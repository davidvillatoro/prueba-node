const { response } = require("express");
const { Usuario,Categoria,Producto } = require("../models");
const { ObjectId} = require("mongoose").Types;


const coleccionesPermintidas = [

    "usuarios",
    "categorias",
    "productos",
    "roles"

];

const buscarUsuarios = async(termino = "", res = response)=> {

    const esMongoID = ObjectId.isValid(termino); //valida que el termino se valido en la bbdd

    if( esMongoID){
        const usuario = await Usuario.findById(termino);
       return res.json({
            results: (usuario) ?[usuario]: []
        });
    }
    
    // exprecion regular pra un buscador
    const regex = new RegExp(termino, "i");

    const usuarios = await Usuario.find({
        $or:[{nombre: regex}, {correo: regex}],
        $and:[{estado: true}]
    });
    res.json({
        results: usuarios
    });

}


const buscarCategorias = async(termino = "", res = response)=> {

    const esMongoID = ObjectId.isValid(termino); //valida que el termino se valido en la bbdd

    if( esMongoID){
        const categoria = await Categoria.findById(termino);
       return res.json({
            results: (categoria) ?[categoria]: []
        });
    }
    
    // exprecion regular pra un buscador
    const regex = new RegExp(termino, "i");

    const productos = await Producto.find({ nombre: regex , estado:true});
    res.json({
        results: productos
    });

}

const buscarProductos = async(termino = "", res = response)=> {

    const esMongoID = ObjectId.isValid(termino); //valida que el termino se valido en la bbdd

    if( esMongoID){
        const producto = await Producto.findById(termino)
                                .populate("categoria", "nombre");
       return res.json({
            results: (producto) ?[producto]: []
        });
    }
    
    // exprecion regular pra un buscador
    const regex = new RegExp(termino, "i");

    const productos = await Producto.find({ nombre: regex , estado:true})
                                .populate("categoria", "nombre");
    res.json({
        results: productos
    });

}



const buscar = (req, res = response) =>{

    const {coleccion, termino} =req.params;

    if( !coleccionesPermintidas.includes(coleccion)){

        return res.status(400).json({
            msg: `las collecciones permitas son ${coleccionesPermintidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case "productos":
            buscarProductos(termino,res);
            break;
        case "categorias":
            buscarCategorias(termino, res);
            break;

        default:
            res.status(500).json({
                msg: "se me olvido hacer esta busquda"
        
            })
    }
    
   
}

module.exports ={
    buscar
}