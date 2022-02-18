const { response } = require("express");
const { Categoria} = require("../models")

const crearCategoria = async (req, res = response) =>{

    const nombre = req.body.nombre.toUpperCase();

    //si existe la categoria 
    const categoriaDB = await Categoria.findOne({ nombre});
    if(categoriaDB){

        return res.status(400).json({
            msg: `la categoria ${categoriaDB.nombre} ya existe`
        })
    }

    //generar la data a guardar como crear el archivo pero no lo guarda en la bbdd
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    //guardar en la bbdd aqui es paraguardar los datos
    await categoria.save();

    res.status(201).json(categoria);

};



//obteenr categorias

const obtenerCategorias =  async (req , res = response) =>{

    const {limite=5, desde = 0} = req.query;

    const query ={estado: true};

    const [total,categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate("usuario","nombre")
        .skip(Number(desde))
        .limit( Number(limite))
    ]);

    res.json({
        total,
        categorias
    })
};

const unaCategoria = async (req,res=response)=>{

    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate("usuario","nombre");

    res.json(categoria);

};


//actualizacion de categorias put
const actualizarCategorias = async (req, res = response) =>{

    const {id} = req.params;
    const  {estado, usuario, ... data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true}); //new try hace que se mire en la respuesta

    res.json(categoria);


};


//delete categorias
const borrarCategorias = async (req, res = response)  =>{

    const {id} = req.params;
    const categoriaborrada = await Categoria.findByIdAndUpdate(id, {estado: false});

    res.json(categoriaborrada);

};



module.exports = {
    crearCategoria,
    obtenerCategorias,
    unaCategoria,
    actualizarCategorias,
    borrarCategorias
}