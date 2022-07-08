import express,{Request, Response} from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mainRouter from './routers/chat';
import mustache from 'mustache-express';
import {Server} from 'socket.io';
import http from 'http'

dotenv.config();

const app = express();
const serverHttp = http.createServer(app);
const io = new Server(serverHttp);

app.use(express.static(path.join(__dirname,'../public')));

app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.engine('mustache', mustache());

//consiguração de rota
app.use(mainRouter);

export {serverHttp, io};