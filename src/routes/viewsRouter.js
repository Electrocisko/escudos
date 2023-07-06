import { Router } from "express";
const router = Router();
import {indexController, registerController, loginController  } from "../controllers/viewsController.js";

router.get('/', indexController);

router.get('/register', registerController);

router.get('/login',loginController );

export default router;