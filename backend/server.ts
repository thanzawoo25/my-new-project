import express, { response } from "express";
import cors from "cors"
import { db } from "./src/db/db";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post("/auth/register", async (request, response) => {
    //console.log(request.body)
    const { name, email, password } = request.body;
    if (!name || !email || !password) return response.sendStatus(400);
    const text = 'INSERT INTO users(name, email,password) VALUES($1, $2,$3) RETURNING *';
    const values = [name, email, password];
    const userResult = await db.query(text, values);
    console.log(userResult.rows);
    response.send(request.body);
})

app.listen(port, () => {
    console.log(`server is listening on port:${port}`)
})