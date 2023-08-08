import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";

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

tablesRouter.put(
  "/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const tableId = request.params.id;
    const { name } = request.body;
    const isValid = tableId && name;
    if (!isValid) return response.send(400);
    const hasExistingTable = await db.query(
      "select * from tables  where id =$1",
      [tableId]
    );
    const hasExistingTableId = hasExistingTable.rows.length > 0;
    if (!hasExistingTableId) return response.send(400);

    await db.query("update tables set name = $1 where id = $2", [
      name,
      tableId,
    ]);
    response.send(200);
  }
);

tablesRouter.delete(
  "/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const tableId = request.params.id;
    if (!tableId) return response.send(400);
    const existingTables = await db.query(
      "select * from tables  where id =$1",
      [tableId]
    );
    const hasExistingTable = existingTables.rows.length;
    if (!hasExistingTable) return response.send(400);

    await db.query("update tables set is_archived = true where id = $1", [
      tableId,
    ]);
    response.send(200);
  }
);
export default tablesRouter;
