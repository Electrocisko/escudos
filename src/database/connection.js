import mongoose from "mongoose";
import dotenvConfig from "../configs/dotenvConfig.js";

const MONGO_USER = dotenvConfig.database.MONGO_USER;
const MONGO_PASSWORD = dotenvConfig.database.MONGO_PASSWORD;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.rvl2uyz.mongodb.net/escudos?retryWrites=true&w=majority`;

const connection = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected")
    } catch (error) {
        console.log(error);
    }
}

export default connection