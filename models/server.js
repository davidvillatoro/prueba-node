const express = require('express');
const cors = require("cors");
const { dbConnection } = require('../database/config');
const fileUpload = require("express-fileupload");

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths ={
            usuarios: "/api/usuarios",
            auth: "/api/auth",
            categorias: "/api/categorias",
            productos: "/api/productos",
            Buscar: "/api/buscar",
            uploads: "/api/uploads"
        }

        
      
        //connexion a al BBDD
        this.conectarBD();
        //middlewres funciones que se ejecutan al levantar el servidor
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();
    }


    async conectarBD(){  // llamamos la funcion de connection a la bbdd
        await dbConnection();
    }

    middlewares(){
        // cors para ver que paginas pueden acceder
        this.app.use(cors())

        //lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use( express.static('public') );

        //para manejar el fileupload - o carga de archivos
        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir : "/tmp/",
            createParentPath: true
        }));
    }

    routes(){
       
        this.app.use( this.paths.usuarios, require("../routers/user"));
        this.app.use(this.paths.auth, require("../routers/auth"));
        this.app.use(this.paths.categorias, require("../routers/categorias"));
        this.app.use(this.paths.productos, require("../routers/productos"));
        this.app.use(this.paths.Buscar, require("../routers/buscar"));
        this.app.use(this.paths.uploads, require("../routers/uploads"));
        
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
          })
    }



}


module.exports = Server;      