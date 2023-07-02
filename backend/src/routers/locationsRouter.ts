
import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";

const LocationsRouter = express.Router();

// LocationsRouter.put ("/:locationId",checkAuth, async(request, response) => {
//     const locationId = request.params.locationId;
//     const { name, address } = request.body;
//     if (name && !address) {
//         const updateLocation = await db.query(
//             "update locations set name= $1 where id = $3",
//             [name,locationId]
//         )
//     } else if (address && !name) {
//         const updateLocation = await db.query(
//             "update locations set address=$2 where id = $3 ",
//             [address,locationId]
//         )
//     } else {
//         const updateLocation = await db.query(
//         "update locations set name =$1,address=$2 where id=$3",
//         [name,address,locationId]
//         )
//         response.sendStatus(400)
//     }
    
//     response.send({message:"Update....."})
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