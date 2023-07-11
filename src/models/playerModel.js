import mongoose from "mongoose";
const { Schema, model } = mongoose;

const playerSchema = new Schema({
    nick: {
        type: String,
        required: true,
        unique: true,
    },
    recordPoints: {
        type: Number,
        default:0
    },
    recordTime: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        requiered: true
    }
})

export const Player = model("Player",playerSchema);