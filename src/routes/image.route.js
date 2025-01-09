import {addImage}  from "../controllers/image.controllers.js";

import { Router } from "express";

const router= Router();

router.route("/getimage").post(addImage);  

export default router;