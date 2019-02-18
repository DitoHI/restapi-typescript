import express from "express";

const app = express();
const port = 8080; // default port to listen

// courses
// import {divide, multiply} from "./meeting/three/mult";
import { persons } from "./meeting/four";

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send(`Namaku adalah ${persons[0].username}, umurku ${persons[0].age} tahun`);
    // const input: number[] = [4, 2];
    // const [first, second] = input;
    // res.send(`Multiply of ${first} & ${second} : ${multiply(first, second)} <br>
    //     Divide of ${first} & ${second} : ${divide(first, second)}`);
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
