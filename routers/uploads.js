const { Router} = require("express");
const {check} =require("express-validator");
const {cargarArchivos , actualizarImagen} = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const { validarCampos } = require("../middlewares/validar-campos");
const producto = require("../models/producto");

const router = Router();

router.post("/", [],cargarArchivos);

router.put("/:coleccion/:id" ,[
    check("id" , "el id debe de ser de mongo").isMongoId(),
    check("coleccion").custom( c => coleccionesPermitidas( c , ["usuarios", "productos"])),
    validarCampos
], actualizarImagen)

module.exports =router;