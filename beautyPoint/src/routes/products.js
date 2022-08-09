// ************ Require's ************
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const logDBMiddleware = require("../middlewares/logDBMiddleware");

//validaciones
const validateCreateForm = require("../middlewares/validationsCreate");

//carga de archivos
const uploadFile = require("../middlewares/multerProducts");

//controlador
const productsController = require("../controllers/productsController.js");

// ************ methods() ************

/*** GET ONE PRODUCT ***/
router.get("/detail/:id", productsController.detail);

/*** CREATE ONE PRODUCT ***/
router.get("/create", productsController.create);
router.post(
  "/create",
  uploadFile.single("image"),
  logDBMiddleware,
  validateCreateForm,
  productsController.store
);

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productsController.edit);
router.put(
  "/edit/:id",
  uploadFile.single("image"),
  validateCreateForm,
  productsController.update
);

/*** DELETE ONE PRODUCT***/
//Hard Delete
router.delete("/delete/:id", productsController.destroy);
//Soft Delete
router.put("/softDelete/:id", productsController.delete);

/*** GET PRODUCTS FROM CART ***/
router.get("/cart", authMiddleware, productsController.cart);

router.put("/cart/:id", productsController.addProductCart);

router.delete("/cart/:id", productsController.deleteProductCart);

router.put("/cart/update/:id", productsController.editProductCart);

module.exports = router;
