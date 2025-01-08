//import orderModels from "../models/order.models.js";  
import { createOrder, getOrderById, updateOrder, deleteOrder} from "../controllers/order.controller.js"; 
import { verifyUser } from "../middleware/auth.middleware.js";

import { Router } from "express"; 

const router=Router();

router.route("/Createorder").post(verifyUser, createOrder)  ; 
router.route("/order").get(verifyUser, getOrderById)  ; 
router.route("/order").put(verifyUser, updateOrder)  ; 
router.route("/order").delete(verifyUser, deleteOrder)  ; 
 
export default router;









