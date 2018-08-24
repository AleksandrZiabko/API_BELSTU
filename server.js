import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import cors from 'cors';
import http from 'http';
import db from './libs/mongoose';
import startServer from './libs/server';
import fileUploader from 'express-fileupload';

const app = express();
const server = http.Server(app);
const serverClass = new startServer(server);
const connectDB = db.connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUploader());
app.use('/', routes);

connectDB.on('error', console.log);
connectDB.on('disconnected', () => db.connectDB());
connectDB.once('open', () => serverClass.start());
