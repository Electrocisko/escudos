import express from 'express';
import cors from 'cors';
import dotenvConfig from './configs/dotenvConfig.js';
import clubesRouter from './routes/clubesRouter.js';
import __dirname from './helpers/utils.js';
import viewsRouter from './routes/viewsRouter.js';
import connection from './database/connection.js';
import playersRouter from './routes/playersRouter.js';
import session from 'express-session';
import sessionsRouter from './routes/sessionRouter.js';


const PORT = dotenvConfig.app.PORT;
const app = express();

// middelwars
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: dotenvConfig.session.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}))

// Template config engine
app.set('views',__dirname+'/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//Connect Database
connection();


//routes
app.use('/api', clubesRouter);
app.use('/api/players',playersRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/',viewsRouter);


app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)
});

