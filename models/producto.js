const {Schema,model} = require("mongoose");

const productoSchema = Schema({
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
        type: Schema.Types.ObjectId, //esto es para relacionar los esquemas asi como se relacionan las tablas en sql  
        ref:"Usuario", // y el ref es la refencia de tabla que buscamos
        requird:true
    },
    precio:{
        type:Number,
        default: 0,
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref:"Categoria",
        require:true
    },
    descripccion:{
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img:{
        type: String
    }
});

productoSchema.methods.toJSON = function(){  //tiene que ser una funcion normal por el this que bamos hacer referencia al anstancia creada 

    const {__v,estado, ...data} =  this.toObject();
    
    return data;

}



module.exports =model("Producto", productoSchema);