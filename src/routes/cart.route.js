import {addToCart} from "../controllers/cart.controller.js"; 
import { verifyUser } from "../middleware/auth.middleware.js";
import { Router } from "express";  


const router=Router ();

router.route("/managecart").post(verifyUser, addToCart)

export default router ;

