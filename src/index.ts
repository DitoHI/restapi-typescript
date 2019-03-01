import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import * as path from 'path';
import { dbInit } from './connection';
import { router } from './routes';

const app = express();
const port = process.env.PORT; // default port to listen
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, '/../static/')));
app.set('view engine', 'hbs');
app.set('view', path.join(__dirname, '../src/views'));

// create token
app.set('superSecret', process.env.SECRET);

// init database connection
dbInit();

// define a route handler
app.use(router);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
