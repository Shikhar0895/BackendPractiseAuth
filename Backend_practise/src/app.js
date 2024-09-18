import express from 'express';
import { router as homeRoute } from './routes/home.route.js';
import { router as signupRoute } from './routes/signup.route.js';
import { router as signinRoute } from './routes/signin.route.js';
import { router as meRoute } from './routes/me.route.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'token'],
    preflightContinue: true,
  })
);
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
//   );
//   next();
// });
app.use(express.json({ limit: '16kb' }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(bodyParser.json());

//route
app.use('/', homeRoute);
app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/me', meRoute);

export { app };
