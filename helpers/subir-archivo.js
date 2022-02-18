const path = require("path"); // para crear urls
const {v4: uuidv4} = require("uuid");

const subirArchivo = (files, extencionesValidas =["png","jpg","jpeg","gif"], carpeta = '')  =>{

    return new Promise((resolve, reject) =>{

        const {archivo} = files;
        const nombreCortado = archivo.name.split("."); //corta el string el punto es para separar el nombre
        const extension  = nombreCortado[nombreCortado.length-1]
    
        //validar la extencion de archivo
        
        if(!extencionesValidas.includes(extension)){
           
           return reject(

                 `la esxtencion ${extension} no es valida solo se perminte ${extencionValidas}`
            )
        
        }
    
        
        const nombreTemporal= uuidv4() + "." + extension;
        const uploadPath = path.join(__dirname , '../uploads/' ,carpeta, nombreTemporal);
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            reject(err);
          }

           resolve(nombreTemporal);
      
        });



    
  });

    
};



module.exports = {
    subirArchivo
}