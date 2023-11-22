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
    }
})

export const Player = model("Player",playerSchema);