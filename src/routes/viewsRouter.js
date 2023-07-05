import { Router } from "express";
const router = Router();
import {indexController, loginController  } from "../controllers/viewsController.js";

router.get('/', indexController);

router.get('/login', loginController);

export default router;