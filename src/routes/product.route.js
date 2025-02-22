import { createProduct,getAllProducts,getProductById,updateProduct,deleteProduct } from "../controllers/product.controller.js";  
import upload from "../middleware/multer.middleware.js";
import { verifyUser } from "../middleware/auth.middleware.js"; 

import { Router } from "express";

const router=Router();

router.route("/createProduct").post( verifyUser,upload.single('image'),createProduct)
router.route("/getAllProduct").get(getAllProducts)
router.route("/getProductById/:id").get( verifyUser, getProductById)
router.route("/updateProduct/:id").put( verifyUser, updateProduct)
router.route("/deleteProduct/:id").delete( verifyUser,deleteProduct)  

export default router; 
