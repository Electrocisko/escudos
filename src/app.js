import express from 'express';
import cors from 'cors';
import dotenvConfig from './configs/dotenvConfig.js';
import clubesRouter from './routes/clubesRouter.js';
import __dirname from './helpers/utils.js';


const PORT = dotenvConfig.app.PORT;
const app = express();

// middelwars
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Template config engine
app.set('views',__dirname+'/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//routes
app.use('/', clubesRouter)


app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)
});

