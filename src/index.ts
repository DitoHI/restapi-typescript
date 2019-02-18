import express from "express";

const app = express();
const port = 8080; // default port to listen

// courses
import { Person, persons} from "./meeting/four";

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

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
