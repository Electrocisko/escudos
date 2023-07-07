import { Router } from "express";
import { playersControllers } from "../controllers/playersController.js";

const router = Router();

router.get("/", playersControllers.getPlayers);

router.get("/byid/:id", playersControllers.getPlayerById);

router.get("/bynick/:nick", playersControllers.getPlayerByNick);

//router.post("/", playersControllers.postPlayer);

router.put("/:id", playersControllers.putPlayer);


export default router;
