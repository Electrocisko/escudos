import { Router } from "express";
import { Record } from "../models/recordModel.js";

const router = Router();

router.get("/record", async (req, res) => {
  try {
    const recordData = await Record.find();
    return res.json({
      message: "Aca va record",
      recordData,
    });
  } catch (error) {}
});

router.post("/record", async (req, res) => {
    try {
        const data = req.body;
        //Falta validaciones de datos
      const recordData = await Record.create(data);
      return res.json({
        message: "Aca graba record",
        recordData
      });
    } catch (error) {}
  });





export default router;
