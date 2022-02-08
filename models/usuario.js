const {Schema, model } = require("mongoose");

const usuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true, "el nombre es obligatorio"]
    },
    correo:{
        type:String,
        required:[true,"el correo es obligatorio"],
        unique: true
    },
    password:{
        type:String,
        required:[true,"el contraseña es obligatorio"]
    },
    img:{
        type:String,
        requerid: true,
        emun:["ADMIN_ROLE", "USER_ROLE"]
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
    rol:{
        type:String,
        required:true,
        default:"USER_ROL",
        emun: ["ADMIN_ROLE", "USER_ROLE"]
    }
    

});

usuarioSchema.methods.toJSON = function(){  //tiene que ser una funcion normal por el this que bamos hacer referencia al anstancia creada 

    const {__v,password,_id, ...usuario} =  this.toObject();
    usuario.uid = _id;

    return usuario;

}



module.exports = model("Usuario" , usuarioSchema);