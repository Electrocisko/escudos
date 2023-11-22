import { Router } from "express";
import { Record } from "../models/recordModel.js";

const router = Router();

router.get("/record", async (req, res) => {
  try {
    const recordData = await Record.find();
    return res.json({
      status: "succes",
      recordData,
    });
  } catch (error) {}
});

router.put("/record", async (req, res) => {
    try {
        const data = req.body;
        //Falta validaciones de datos
        await Record.deleteMany(); // Borro los records anteriores
      const recordData = await Record.create(data);
      return res.json({
        status: "success",
        recordData
      });
    } catch (error) {}
  });





export default router;
