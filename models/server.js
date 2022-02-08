const express = require('express');
const cors = require("cors");
const { dbConnection } = require('../database/config');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = "/api/usuarios";  // para hacer rutas mas facil copiar y pegar ejemplo en los routes abajo

        this.authPath = "/api/auth"
        
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
    }

    routes(){
       
        this.app.use( this.usuariosRoutePath, require("../routers/user"));
        this.app.use(this.authPath, require("../routers/auth"));
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
          })
    }



}


module.exports = Server;      