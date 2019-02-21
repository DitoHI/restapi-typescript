import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT; // default port to listen
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// courses
import { helloEs5, helloEs6 } from './meeting/six/hello';

// define a route handler for the default home page
app.get('/', (req, res) => {
  helloEs5('HelloEs5 Binar');
  helloEs6('HelloEs6 Binar');
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
