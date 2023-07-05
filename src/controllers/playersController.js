import { Player } from "../models/playerModel.js";
import { createHash, isValidPassword } from "../helpers/cryptPassword.js";
import { isValidObjectId } from "mongoose";

const getPlayers = async (req, res) => {
  try {
    const players = await Player.find().select({ password: 0 }).lean();
    res.status(200).json({
      status: "success",
      players,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Error can not get players",
    });
  }
};

const getPlayerById = async (req, res) => {
  try {
    let id = req.params.id;
    if (!isValidObjectId(id))
      return res.status(400).json({ status: "error", message: "Id not valid" });
    const player = await Player.findById(id).lean();
    res.status(200).json({
      status: "success",
      data: player,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Error can not get player by id",
    });
  }
};

const getPlayerByNick = async (req, res) => {
    try {
        const nick = req.params.nick;
        const player = await Player.findOne({nick:nick}).lean();
        if (!player) return res.status(404).json({status:"error", message: "User not exist"});
        res.status(200).json({
            status:"success",
            player
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error can not get player by nickname",
          });
    }
    
};

const postPlayer = async (req, res) => {
  try {
    let player = req.body;
    const { nick, password, checkPassword } = player;
    //validate input data
    if (!nick || !password || !checkPassword)
      return res
        .status(400)
        .json({ status: "error", message: "incomplete data" });
    if (password != checkPassword)
      return res
        .status(400)
        .json({ status: "error", message: "passwords don't match" });
    // check if there is another user with the same nick
    const exist = await Player.findOne({ nick: nick });
    if (exist)
      return res
        .status(400)
        .json({
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
};

const putPlayer = async (req, res) => {
    try {
        let id = req.params.id;
        if (!isValidObjectId(id))
        return res.status(400).json({ status: "error", message: "Id no valido" });
        let player = await Player.findById(id).lean();
        const {points} = req.body;
        player.points=points;
        const data = await Player.findByIdAndUpdate(id,player, {new:true})
        res.json({
            data
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
          status: "error",
          message: "Error can not modified player",
        });
    }
};

export const playersControllers = {
  getPlayers,
  getPlayerById,
  getPlayerByNick,
  postPlayer,
  putPlayer,
};
