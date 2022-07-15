import * as express from 'express';
import 'express-async-errors';
import * as session from 'express-session';
import {join} from "path";
import {handleError} from "./utils/errors";
import 'dotenv/config';
import {Request, Response} from "express";

const Redis = require('ioredis');
const RedisStore = require('connect-redis')(session)
const redisClient = new Redis();

const app = express();
app.use(express.urlencoded({
    extended: true,
}));

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: 'secret$%^134',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: false, // if true prevent client side JS from reading the cookie
            maxAge: 1000 * 60 * 60 * 12 // session max age in miliseconds
        }
    })
)

app.get('/', async(req:Request, res:Response) => {


})

app.use(handleError);

app.listen(3000, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3000');
});