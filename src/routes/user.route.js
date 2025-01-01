import { getUserById,updateUser,deleteUser } from "../controllers/user.controller.js"; 

import { Router } from "express"; 
const router=Router();


router.route("/:id").get(getUserById) 

router.route("/:id").put(updateUser) 

router.route("/:id").delete(deleteUser)  

export default router;



