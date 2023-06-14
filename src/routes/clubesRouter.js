import { Router } from "express";
const router = Router();
import { clubesControl } from "../controllers/clubController.js";


router.get("/", clubesControl.getAllClubs);

export default router;