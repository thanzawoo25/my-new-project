import dotenv from "dotenv"
dotenv.config();

import express, { response } from "express";
import cors from "cors"
import { db } from "./src/db/db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "./src/config/config";
import { checkAuth } from "./src/utils/auth";
import authRouter from "./src/routers/authRouter";
import menusRouter from "./src/routers/menusRouter";
import appRouter from "./src/routers/appRouter";
import LocationsRouter from "./src/routers/locationsRouter";

console.log("config", config)



const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());

app.use("/",appRouter)
app.use("/menus", menusRouter)
app.use("/auth", authRouter);
app.use("/locations", LocationsRouter);

app.listen(port, () => {
    console.log(`server is listening on port:${port}`)
})
