import express from "express";

const app = express();
const port = 8080; // default port to listen

// courses
import {divide, multiply} from "./meeting/three/mult";

// define a route handler for the default home page
app.get("/", (req, res) => {
    const input: number[] = [4, 2];
    const [first, second] = input;
    res.send(`Multiply of ${first} & ${second} : ${multiply(first, second)} <br>
        Divide of ${first} & ${second} : ${divide(first, second)}`);
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
