import mongoose from "mongoose";
const { Schema, model } = mongoose;

const recordSchema = new Schema({
    nick: {
        type: String,
    },
    recordPoints: {
        type: Number
    },
    recordTime: {
        type: Number
    }
})

export const Record = model("record",recordSchema);