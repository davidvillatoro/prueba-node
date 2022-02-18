const {Schema,model} = require("mongoose");

const categoriaSchema = Schema({
    nombre:{
        type:String,
        requird:[true , "el nombre es obligatorio"],
        unique: true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:"Usuario",
        requird:true
    }
});

categoriaSchema.methods.toJSON = function(){  //tiene que ser una funcion normal por el this que bamos hacer referencia al anstancia creada 

    const {__v,estado, ...data} =  this.toObject();
    
    return data;

}



module.exports =model("Categoria", categoriaSchema);