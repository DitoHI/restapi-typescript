import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { dbInit } from './connection';

const app = express();
const port = process.env.PORT || 8080; // default port to listen
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));

// create token
app.set('superSecret', process.env.SECRET);

// init database connection
dbInit();

import './schema/user';

// define a route handler
import { router } from './routes';
app.use(router);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
