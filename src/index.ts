import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import { dbInit } from './connection';

const app = express();
const port = process.env.PORT || 8080; // default port to listen
const secretKey = process.env.SECRET;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));

// parent model
import './schema/user';

// initialize passport
import { passportRoute } from './passport';
import { strategyInitializer } from './passport/strategyInitializer';
app.use(passport.initialize());
passport.use('user', strategyInitializer(secretKey));

// init database connection
dbInit();

// define a route handler
import { router } from './routes';
passportRoute(app);
app.use(router);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
