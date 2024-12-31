import orderModels from "../models/order.models.js";
import { diyo } from "../controllers/order.controller.js"; 

import { Router } from "express"; 

const router= Router();
router.route("/diyo").post(diyo)   

export  default router;







