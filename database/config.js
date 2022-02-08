const mongoose = require("mongoose");

const dbConnection = async()=>{
    try {
        await mongoose.connect( process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        });

        console.log('base de datos online');
        
    } catch (err) {

        console.log(err);
        
        throw new Error("error  ala hora de inicar la base datos");
    }
};




module.exports={
    dbConnection
}