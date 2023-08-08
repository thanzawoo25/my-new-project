import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";

const locationsRouter = express.Router();

locationsRouter.put(
  "/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const locationId = request.params.id;
    const { name, address } = request.body;
    const isValid = locationId && name && address;
    if (!isValid) return response.send(400);

    const hasExistingLocation = await db.query(
      "select * from locations  where id =$1",
      [locationId]
    );
    const hasExistingLocationId = hasExistingLocation.rows.length > 0;
    if (!hasExistingLocationId) return response.send(400);

    await db.query("update locations set name = $1,address=$2 where id = $3", [
      name,
      address,
      locationId,
    ]);
    response.send(200);
  }
);

locationsRouter.post(
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

locationsRouter.delete(
  "/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const locationId = request.params.id;
    if (!locationId) return response.send(400);
    const existingLocation = await db.query(
      "select * from locations  where id =$1",
      [locationId]
    );
    const hasExistingLocation = existingLocation.rows.length;
    if (!hasExistingLocation) return response.send(400);

    await db.query("update locations set is_archived = true where id = $1", [
      locationId,
    ]);
    response.send(200);
  }
);
export default locationsRouter;
