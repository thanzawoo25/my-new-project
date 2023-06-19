
import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";

const menusRouter = express.Router()

menusRouter.get("/",checkAuth, async(request, response) => {
    const menusResult = await db.query("select * from menus")
    response.send(menusResult.rows)
})
export default menusRouter;