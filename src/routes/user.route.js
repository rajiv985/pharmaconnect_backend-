import { getUserById,updateUser,deleteUser } from "../controllers/user.controller.js"; 

import { verifyUser } from "../middleware/auth.middleware.js"; 
import { Router } from "express"; 
const router=Router();


router.route("/getUser/:id").get(verifyUser ,getUserById) 

router.route("/:id").put(updateUser) 

router.route("/:id").delete(deleteUser)  

export default router;



