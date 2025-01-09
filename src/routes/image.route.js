import { addImage } from "../controllers/auth.controller.js";

import { Router } from "express";

const router= Router();

router.route("/getimage").post(addImage);  

export default router;