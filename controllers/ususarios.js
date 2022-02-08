const { response, query, request} = require("express");
 const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");



const usuarioGet = async (req, res = response) => {

    const {limite = 5, desde =0} = req.query;
    const query = {estado:true};

    /* const usuarios = await Usuario.find()
    .skip(Number(desde))
    .limit( Number(limite));

    const total = await Usuario.countDocuments(); */

     const [total, usuarios] = await Promise.all([  // retornamos el get en prometa en ves de dos que sea una sola 
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit( Number(limite))
    ]); 

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {
    const id = req.params.id;
    const {_id,password,google,correo, ...resto} = req.body

    //validar password en la bbdd
    if( password){

        //encriptar la password
        const salt =  bcryptjs.genSaltSync(); //este metodo da vueltas para encriptar la password de 10
        resto.password = bcryptjs.hashSync(password, salt); // el hashSync nos pide que queremos encriptar y cuantas bueltas de encptacion poreso la variable salt
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
    
        
        usuario
    });
}



const usuariosPost = async (req, res = response) => {
    
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //encriptar la password
    const salt =  bcryptjs.genSaltSync(); //este metodo da vueltas para encriptar la password de 10
    usuario.password = bcryptjs.hashSync(password, salt); // el hashSync nos pide que queremos encriptar y cuantas bueltas de encptacion poreso la variable salt
    
    //guardar a  bbdd
    await usuario.save();
    res.json({
        
        /* msg: "post api - controladores", */
        usuario
    });
}


const usuariosdelete = async (req, res = response) => {

    const { id} = req.params;
 

  const usuario = await Usuario.findByIdAndUpdate( id,{estado:false});

 /*  const usuarioToken = req.usuario ; */

    res.json({
    
        usuario
        //usuarioToken
    });
}




module.exports = {
    usuarioGet,
    usuariosPut,
    usuariosPost,
    usuariosdelete
}