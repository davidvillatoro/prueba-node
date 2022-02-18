const { Router, response} = require("express");
const {check} =require("express-validator");
const {
    obtenerProductos,
    unProducto,
    crearProductos,
    borrarProducto,
    actualizarProducto

} = require("../controllers/productos");
const {  existeProductoporId, existeCategoriaporId } = require("../helpers/db-validators");
const { validarJWT, esAdminRol } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");




const router = Router();


/* obtener todas las categorias */
router.get("/" , obtenerProductos);



/* obtener una categoria por id */
router.get("/:id" ,[

    check("id", "no es un id de mongo valido").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoporId)
] , unProducto);


/* crear productos */
router.post("/",[validarJWT,
check("nombre","el nombre es obligatorio").not().isEmpty(),
check("categoria","no e sun id de mongo").isMongoId(),
check("categoria").custom(existeCategoriaporId),
validarCampos
] , crearProductos);



/* actualizar categoria */
router.put("/:id" , [
    validarJWT,
   // check("categoria","no e sun id de mongo").isMongoId(),
    check('id').custom(existeProductoporId), //valida que elid exista
    validarCampos
] , actualizarProducto);



/* eleminar categoria */
router.delete("/:id" , [
    validarJWT,
    esAdminRol,
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoporId),
    validarCampos
] ,borrarProducto);





module.exports = router;