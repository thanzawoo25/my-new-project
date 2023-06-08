import dotenv from "dotenv"
dotenv.config();

import express, { response } from "express";
import cors from "cors"
import { db } from "./src/db/db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "./src/config/config";
import { checkAuth } from "./src/utils/auth";

console.log("config",config.jwtSecret)


const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());

app.get("/menus",checkAuth, async(request, response) => {
    const menusResult = await db.query("select * from menus")
    response.send(menusResult.rows)
})


app.post("/auth/register", async (request, response) => {
    //console.log(request.body)
    const { name, email, password } = request.body;
    if (!name || !email || !password) return response.sendStatus(400);
    const hashedPassword = await bcrypt.hash(password,10)
    const text = 'INSERT INTO users(name, email,password) VALUES($1, $2,$3) RETURNING *';
    const values = [name, email, hashedPassword];
    try {
        const userResult = await db.query(text, values);
    //console.log(userResult.rows);
    //response.send(request.body);
        const user = userResult.rows[0];
        delete user.password;
        response.send(user)
    } catch (error) {
        console.log("error",error)
        response.sendStatus(500)
    }
    
})

app.post("/auth/login", async (request, response) => {
    //console.log(request.body)
    const {  email, password } = request.body;
     
    if (!email || !password) return response.sendStatus(401);
    const userResult = await db.query("select * from users where email = $1", [email]);
    if(!userResult.rows.length) return response.sendStatus(401)
    const user = userResult.rows[0];
    const hashPassword = user.password;
    const isCorrectPassword = await bcrypt.compare(password, hashPassword);

    if (isCorrectPassword) {
        //console.log(config.jwtSecret)
        const accessToken = jwt.sign(user, config.jwtSecret)
        return response.send({accessToken})
    }
    //return isCorrectPassword ? response.sendStatus(200) :response.sendStatus(401)
    return response.sendStatus(401)

 })

app.listen(port, () => {
    console.log(`server is listening on port:${port}`)
})