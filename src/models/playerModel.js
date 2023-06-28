import mongoose from "mongoose";
const { Schema, model } = mongoose;

const playerSchema = new Schema({
    nick: {
        type: String,
        required: true,
        unique: true,
    },
    points: {
        type: Number
    },
    password: {
        type: String,
        requiered: true
    }
})

export const Player = model("Player",playerSchema);