const { Router} = require("express");
const {check} =require("express-validator");
const { esRolValido, existeEmail, existeUsuarioPOrID } = require("../helpers/db-validators");
const { usuarioGet ,usuariosPut,usuariosdelete,usuariosPost} = require("../controllers/ususarios");


/* const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRol, tieneRol } = require("../middlewares/validar-roles"); */

const {validarCampos,validarJWT,esAdminRol,tieneRol } = require("../middlewares")

const router = Router();


router.get("/" , usuarioGet);


router.post("/" ,[
    check("correo","el correo no es valido").isEmail(),
    check("correo").custom( existeEmail),
    check("nombre","el nombre es obligatorio").not().isEmpty(),
    check("password","el password debe de ser mas de 6 letras").isLength({ min: 6}),
    /*  check("rol","no es un rol valido").isIn(["ADMIN_ROLE","USER_ROLE"]), */
    check("rol").custom( esRolValido ),
    validarCampos
], usuariosPost);

router.put("/:id" ,[
    check("id", "no es un ID valido").isMongoId(),
    check("id").custom( existeUsuarioPOrID),
    check("rol").custom( esRolValido ),
    validarCampos
], usuariosPut);



router.delete("/:id" ,[
    validarJWT,
    //esAdminRol,
    tieneRol("VENTAS_ROL","USER_ROL","ADMIN_ROL"),
    check("id", "no es un ID valido").isMongoId(),
    check("id").custom( existeUsuarioPOrID),
    validarCampos
], usuariosdelete);

module.exports = router;