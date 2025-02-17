//import orderModels from "../models/order.models.js";  
import { createOrder, getOrderById, updateOrder, deleteOrder} from "../controllers/order.controller.js"; 
import { verifyUser } from "../middleware/auth.middleware.js";

import { Router } from "express"; 

const router=Router();

router.route("/CreateOrder").post(verifyUser, createOrder); 
router.route("/getOrderById/:id").get(verifyUser, getOrderById); 
router.route("/UpdateOrder/:id").put(verifyUser, updateOrder); 
router.route("/deleteorder/:id").delete(verifyUser, deleteOrder); 
 
export default router;









