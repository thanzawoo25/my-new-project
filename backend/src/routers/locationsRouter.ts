
import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";

const LocationsRouter = express.Router();

// LocationsRouter.put ("/",checkAuth, async(request, response) => {
//     const menusResult = await db.query("select * from menus")
//     response.send(menusResult.rows)
// })

LocationsRouter.post("/", checkAuth, async (request:Request, response:Response) => {
    const { name, address, companyId } = request.body;
    console.log(request.body)
    const isValid = name && address && companyId;
    if (!isValid) return response.send(400);
    await db.query(
        "insert into locations(name,address,companies_id) values($1,$2,$3)",
        [name,address,companyId]
    )
    return response.send(200)
})
export default LocationsRouter;