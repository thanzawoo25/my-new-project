import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";

const tablesRouter = express.Router();

tablesRouter.get("/:locationId", async (request, response) => {
  const locationId = request.params.locationId;
  if (!locationId) response.send(400);
  const tableResult = await db.query(
    "select * from tables where locations_id =$1",
    [locationId]
  );
  response.send(tableResult.rows);
});

tablesRouter.post(
  "/",
  checkAuth,
  async (request: Request, response: Response) => {
    console.log(request.body);
    const { name, locationId } = request.body;
    const isValid = name && locationId;
    if (!isValid) return response.send(400);
    await db.query(
      "insert into tables (name,locations_id) values ($1,$2) returning *",
      [name, locationId]
    );
    response.send(200);
  }
);
export default tablesRouter;
