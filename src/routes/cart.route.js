import {addToCart,getCartById,deleteProductFromCart,deleteCart} from "../controllers/cart.controller.js"; 
import { verifyUser } from "../middleware/auth.middleware.js";
import { Router } from "express";  


const router=Router ();

router.route("/manageCart").post(verifyUser, addToCart)
router.route("/getCart").get(verifyUser, getCartById)
router.route("/deleteProduct").put(verifyUser, deleteProductFromCart)
router.route("/deleteCart/:id").delete(verifyUser,deleteCart) 

export default router ;

