const { Router, response} = require("express");
const {check} =require("express-validator");
const {crearCategoria,
    obtenerCategorias,
     unaCategoria, 
     actualizarCategorias,
     borrarCategorias} = require("../controllers/categorias");
const { existeCategoriaporId } = require("../helpers/db-validators");
const { validarJWT, esAdminRol } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");




const router = Router();


/* obtener todas las categorias */
router.get("/" , obtenerCategorias);



/* obtener una categoria por id */
router.get("/:id" ,[

    check("id", "no es un id de mongo valido").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaporId)
] , unaCategoria);


/* crear categoria */
router.post("/",[validarJWT,
check("nombre","el nombre es obligatorio").notEmpty(),
validarCampos
] , crearCategoria);



/* actualizar categoria */
router.put("/:id" , [
    validarJWT,
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check('id').custom(existeCategoriaporId), //valida que elid exista
    validarCampos
] , actualizarCategorias);



/* eleminar categoria */
router.delete("/:id" , [
    validarJWT,
    esAdminRol,
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeCategoriaporId),
    validarCampos
] ,borrarCategorias);





module.exports = router;