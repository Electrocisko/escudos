import dotenv from 'dotenv';

dotenv.config();

export default {
    app: {
        PORT: process.env.PORT || 3000
    },
    database: {
        MONGO_USER: process.env.MONGO_USER,
        MONGO_PASSWORD: process.env.MONGO_PASSWORD   
    },
    session: {
        SECRET_SESSION: process.env.SECRET_SESSION
    }
}