const { response } = require("express");
const { subirArchivo } = require("../helpers");
const {Usuario, Producto} = require("../models/index")

const cargarArchivos = async (req,res= response) =>{

    //codigo estraido de git de npm expres-fileupload
    if (!req.files || Object.keys(req.files).length === 0|| !req.files.archivo) {
      res.status(400).json({
          msg:'No hay files en la peticion'});
      return;
    }

    /* if (!req.files.archivo) {
        res.status(400).json({
            msg:'No hay files en la peticion'});
        return;
    } */
    

     // imagenes
    try {

        const pathCompleto = await subirArchivo (req.files , undefined, "imgs") ;
        res.json({
            nombre: pathCompleto
         });

        
    } catch (msg) {

        res.status(400).json({msg});
        
    }
  
  
}; 



    //actualizar imganes
    const actualizarImagen = async (req, res = response) =>{

        const {id,coleccion} = req.params;

        let modelo;

        switch (coleccion) {  // validaciones que si aya estos datso en bbdd
            case "usuarios":
                modelo = await Usuario.findById(id);
                if( !modelo){
                    return res.status(400).json({
                        msg:`no existe un usuario con el id ${id}`
                    });
                }
                break;

                case "productos":
                    modelo =await Producto.findById(id);
                    if( !modelo){
                        return res.status(400).json({
                            msg:`no existe un producto con el id ${id}`
                        });
                    }
                    break;
        
            default:
                return res.status(500).json({
                    msg: "se me olvido validar esto"
                });
        }

        //actualizar img o guardar en bbdd
        modelo.img = await subirArchivo (req.files , undefined, coleccion) ;

        await modelo.save();

        res.json(modelo)
    };


module.exports = {
    cargarArchivos,
    actualizarImagen
}