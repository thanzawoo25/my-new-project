
import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";

const menusRouter = express.Router()

menusRouter.get("/",checkAuth, async(request, response) => {
    const menusResult = await db.query("select * from menus")
    //response.send(menusResult.rows)
})

menusRouter.post("/", checkAuth, async (request: Request, response: Response) => {
    console.log("AssetURl",request.body)
    const { name, description, price, assetUrl } = request.body;
    const newMenuResult = await db.query(
        "insert into menus (name,description,price,asset_url) values ($1,$2,$3,$4) returning *",
        [name, description, price, assetUrl]
    )
    response.send(newMenuResult.rows)
})
export default menusRouter;