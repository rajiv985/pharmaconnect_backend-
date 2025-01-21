import { createProduct,getAllProducts,getProductById,updateProduct,deleteProduct } from "../controllers/product.controller.js";  
import upload from "../middleware/multer.middleware.js";
import { verifyUser } from "../middleware/auth.middleware.js"; 

import { Router } from "express";

const router=Router();

router.route("/").post( verifyUser,upload.single('profile'),createProduct)
router.route("/").get(getAllProducts)
router.route("/:id").get( verifyUser, getProductById)
router.route("/:id").put( verifyUser, updateProduct)
router.route("/:id").delete( verifyUser,deleteProduct)  

export default router; 
