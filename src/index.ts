import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import { dbInit } from './connection';
import { historyRoutes } from './routes/historyRoutes';

const app = express();
const port = process.env.PORT; // default port to listen
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dbInit();

// courses

// define a route handler
historyRoutes(app);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
