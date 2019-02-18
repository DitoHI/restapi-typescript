import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 8080; // default port to listen
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// courses
import { Person, persons} from "./meeting/four";
import { calculator } from "./meeting/three/mult";

// define a route handler for the default home page
app.get("/", (req, res) => {
    // print all the persons
    let words: string = "";
    // push new person
    const newPerson: Person = {
        username: "Sinichi",
        age: 20
    };
    persons.push(newPerson);
    for (const person of persons) {
        words += `Namaku adalah ${person.username}, umurku ${person.age} tahun</br>`;
    }
    res.send(words);
});

app.get("/:operator/:a/:b", (req, res) => {
    const a: number = parseInt(req.params.a, 10);
    const b: number = parseInt(req.params.b, 10);
    const operator: string = req.params.operator;
    const result: number = calculator(a, b, operator);
    res.send(`Result of ${a} ${operator} ${b} : ${result}`);
});

app.get("/kalkulator", (req, res) => {
    const a: number = parseInt(req.query.a, 10);
    const b: number = parseInt(req.query.b, 10);
    const operator: string = req.query.operator;
    const result: number = calculator(a, b, operator);
    res.send(`Result of ${a} ${operator} ${b} : ${result}`);
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
