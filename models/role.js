const {Schema,model} = require("mongoose");

const rolSchema = Schema({
    rol:{
        type:String,
        requird:[true , "el rol es obligatorio"]
    }
});


module.exports =model("rol", rolSchema);