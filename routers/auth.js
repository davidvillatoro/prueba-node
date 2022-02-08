const { Router} = require("express");
const {check} =require("express-validator");
const { login, GoogleSingIn } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/login",[
    check("correo","el correo es obligatorio").isEmail(),
    check("password","la password es obligatorio").not().isEmpty(),
    validarCampos
] , login );

module.exports =router;

// token de la api de google sing-in
router.post("/google",[
    check("id_token","el  id_token es nesesario").not().isEmpty(),
    validarCampos
] , GoogleSingIn );

module.exports =router;