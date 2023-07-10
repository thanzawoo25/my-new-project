import express, { Request, Response, response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";

const LocationsRouter = express.Router();

LocationsRouter.put(
  "/:locationId",
  checkAuth,
  async (request: Request, response: Response) => {
    const locationId = request.params.locationId;
    const { name, address } = request.body;
    if (name && !address) {
      const updatedLocation = await db.query(
        "update locations set name= $1 where id = $2",
        [name, locationId]
      );
    } else if (address && !name) {
      const updatedLocation = await db.query(
        "update locations set address=$1 where id = $2 ",
        [address, locationId]
      );
    } else if (name && address) {
      const updatedLocation = await db.query(
        "update locations set name =$1,address=$2 where id=$3",
        [name, address, locationId]
      );
    } else {
      response.sendStatus(400);
    }

    response.send({ message: "Update....." });
  }
);

LocationsRouter.post(
  "/",
  checkAuth,
  async (request: Request, response: Response) => {
    const { name, address, companyId } = request.body;
    console.log(request.body);
    const isValid = name && address && companyId;
    if (!isValid) return response.send(400);
    await db.query(
      "insert into locations(name,address,companies_id) values($1,$2,$3)",
      [name, address, companyId]
    );
    return response.send(200);
  }
);

LocationsRouter.delete(
  "/:locationId",
  checkAuth,
  async (request: Request, response: Response) => {
    const locationId = request.params.locationId;
    if (!locationId) return response.sendStatus(400);
    try {
      await db.query(
        "DELETE from menus_menu_categories_locations where locations_id=$1",
        [locationId]
      );
      await db.query("DELETE from locations where id =$1", [locationId]);
      response.sendStatus(200);
    } catch (error) {
      response.sendStatus(500);
    }
  }
);
export default LocationsRouter;
