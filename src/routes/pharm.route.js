import { Pregister,Plogin } from "../controllers/pharm.controller.js";
import { Router } from "express"; 

const router= Router();

router.route("/Pregister").post(Pregister)
router.route("/Plogin").post(Plogin) 


export default router; 