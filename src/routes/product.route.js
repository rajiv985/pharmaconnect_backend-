import { createProduct,getAllProducts,getProductById,updateProduct,deleteProduct } from "../controllers/product.controller.js";  

import { Router } from "express";

const router=Router();

router.route("/").post(createProduct)
router.route("/").get(getAllProducts)
router.route("/id").get(getProductById)
router.route("/id").put(updateProduct)
router.route("/id").delete(deleteProduct) 

export default router;  
