const {response} = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req,res = response) =>{

  const{correo,password} = req.body;

  try {

    //verificar si el cooreo exitste
     const usuario = await Usuario.findOne({correo});
     if( !usuario){
       return res.status(400).json({
         msg:"usuario / password no son correctos --corre"
       })
     }

    //si el usuario esta activo
    if( usuario.estado === false){
      return res.status(400).json({
        msg:"usuario / password no son correctos --estado: false"
      })
    }

    //verificar password

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if( !validPassword ){
      
      return res.status(400).json({
        msg:"usuario / password no son correctos --password"
      })
    }

    //generar el JWT
    const token = await generarJWT(usuario.id);



    res.json({
      usuario,
      token
  })

    
  } catch (error) {
    console.log(error);

    return  res.status(500).json({
      msg:"Hable con el"
    })
    
  }


  
}

const GoogleSingIn = async (req,res = response) =>{

  const { id_token } = req.body;

  try {

   const {correo,nombre,img} = await googleVerify(id_token);
    
   let usuario = await Usuario.findOne({correo});

   if(!usuario) {
     const data ={
        nombre,
        correo,
        password: ":P",
        img,
        google:true
     };

     usuario = new Usuario(data);
     await usuario.save();
   }
    
   //si el usuario en bd
   if( !usuario.estado ){
     return res.status(401).json({
       msg: "hable con el administrador, usuario bloqueado"
     })
   }

   //generar el jwt
   const token = await generarJWT( usuario.id);


    res.json({
      usuario,
      token
    });


  } catch (error) {

    res.status(400).json({
      msg:"token no es valido de google"
    })
    
  }


}


module.exports = {
    login,
    GoogleSingIn
}