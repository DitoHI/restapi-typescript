import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { dbInit } from './connection';
import { router } from './routes';

const app = express();
const port = process.env.PORT; // default port to listen
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// init database connection
dbInit();

// define a route handler
app.use(router);

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
