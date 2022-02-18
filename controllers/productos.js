const { response } = require("express");
const { body } = require("express-validator");
const { Producto} = require("../models")



//obteenr productos

const obtenerProductos =  async (req , res = response) =>{

    const {limite=5, desde = 0} = req.query;

    const query ={estado: true};

    const [total,productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate("usuario","nombre")
        .populate("categoria","nombre")
        .skip(Number(desde))
        .limit( Number(limite))
    ]);

    res.json({
        total,
        productos
    })
};


//un producto
const unProducto = async (req,res=response)=>{
    
    const {id} = req.params;
    const producto = await Producto.findById(id)
    .populate("usuario","nombre")
    .populate("categoria","nombre");
    
    res.json(producto);
    
};

//crear productos 
const crearProductos = async (req, res = response) =>{

    const { estado,usuario, ... body} = req.body;

    //si existe la producto 
    const productoDB = await Producto.findOne({ nombre: body.nombre});
    if(productoDB){

        return res.status(400).json({
            msg: `la producto ${productoDB.nombre} ya existe`
        })
    }

    //generar la data a guardar como crear el archivo pero no lo guarda en la bbdd
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto( data );

    //guardar en la bbdd aqui es paraguardar los datos
    await producto.save();

    res.status(201).json(producto);

};

//actualizacion de categorias put
const actualizarProducto = async (req, res = response) =>{

    const {id} = req.params;
    const  {estado, usuario, ... data} = req.body;

    if(data.nombre){

        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true}); //new try hace que se mire en la respuesta

    res.json(producto);


};


//delete categorias
const borrarProducto = async (req, res = response)  =>{

    const {id} = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(productoBorrado);

};



module.exports = {
    crearProductos,
    obtenerProductos,
    unProducto,
    actualizarProducto,
    borrarProducto
}