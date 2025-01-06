import {addToCart,getCartById,deleteProductFromCart,deleteCart} from "../controllers/cart.controller.js"; 
import { verifyUser } from "../middleware/auth.middleware.js";
import { Router } from "express";  


const router=Router ();

router.route("/managecart").post(verifyUser, addToCart)
router.route("/getcart").get(verifyUser, getCartById)
router.route("/deleteproduct").put(verifyUser, deleteProductFromCart)
router.route("/deletecart").delete(verifyUser,deleteCart) 

export default router ;

