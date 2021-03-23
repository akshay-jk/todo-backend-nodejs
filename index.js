import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import BodyParser from 'body-parser';
import mongoose from 'mongoose';

import router from './routes.js';

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*")
    next();
})

mongoose.connect(process.env.mongo, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => console.log('Mongo is okay'))

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`server is listening on ${process.env.PORT}`);
})