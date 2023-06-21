import { Router } from "express";
const router = Router();
import { clubesControl } from "../controllers/clubController.js";


router.get("/club", clubesControl.getRandomClub);

export default router;
