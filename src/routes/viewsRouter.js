import { Router } from "express";
const router = Router();
import {indexController  } from "../controllers/viewsController.js";

router.get('/', indexController);



export default router;