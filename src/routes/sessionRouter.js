import { Router } from "express";
import { Player } from "../models/playerModel.js";
import { createHash, isValidPassword } from "../helpers/cryptPassword.js";
const router = Router();

router.post("/register", async (req, res) => {
  try {
    let player = req.body;
    const { nick, password, checkPassword } = player;
    //validate input data
    if (!nick || !password || !checkPassword)
      return res
        .status(400)
        .json({ status: "error", message: "Datos Incompletos" });
    if (password != checkPassword)
      return res
        .status(400)
        .json({ status: "error", message: "Los password no coinciden" });
    // check if there is another user with the same nick
    const exist = await Player.findOne({ nick: nick });
    if (exist)
      return res.status(400).json({
        status: "error",
        message: "Usuario ya registrado con ese Nick",
      });
    const newPLayer = new Player(player);
    const hashedPassword = await createHash(password);
    newPLayer.password = hashedPassword;
    const data = await newPLayer.save();
    res.status(200).json({
      status: "success",
      player: data.nick,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Error can not create player",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { nick, password } = req.body;
    if (!nick || !password)
      return res
        .status(400)
        .json({ status: "error", message: "Datos Incompletos" });
    const player = await Player.findOne({ nick: nick }).lean();
    if (!player)
      return res
        .status(404)
        .json({ status: "error", message: "Jugador no registrado" });
    const validPass = await isValidPassword(player, password);
    if (!validPass)
      return res
        .status(400)
        .json({ status: "error", message: "Clave Incorrecta" });

    req.session.player = player;
    res.status(200).json({ status: "success", id: player._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Error can not login player",
    });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
  if (err) {
  return res.json({ status: 'Logout ERROR', body: err })
  }
  return res.status(200).json({ status: "success",message: "Logout ok" });
  })
  })

export default router;
