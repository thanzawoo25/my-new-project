import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";

const addonsRouter = express.Router();

addonsRouter.delete(
  "/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const addonId = request.params.id;
    if (!addonId) return response.send(400);
    const existingAddon = await db.query("select * from addons  where id =$1", [
      addonId,
    ]);
    const hasExistingAddon = existingAddon.rows.length;
    if (!hasExistingAddon) return response.send(400);

    await db.query("update addons set is_archived = true where id = $1", [
      addonId,
    ]);
    response.send(200);
  }
);

addonsRouter.put(
  "/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const addonId = request.params.id;
    const isValid = addonId;
    console.log("isValid", isValid);
    if (!isValid) return response.send(400);
    const existingAddon = await db.query("select * from addons  where id =$1", [
      addonId,
    ]);
    const hasExistingAddon = existingAddon.rows.length > 0;
    if (!hasExistingAddon) return response.send(400);

    const name = request.body.name;
    const existingPrice = existingAddon.rows[0].price;
    const price = request.body.price || existingPrice;

    await db.query("update addons set name = $1 ,price = $2 where id = $3", [
      name,
      price,
      addonId,
    ]);
    response.send(200);
  }
);

addonsRouter.post(
  "/",
  checkAuth,
  async (request: Request, response: Response) => {
    const { name, price = 0, addonCategoryId } = request.body;
    const isValid = name && addonCategoryId && price;
    if (!isValid) return response.send(400);
    await db.query(
      "insert into addons (name,price,addon_categories_id) values ($1,$2,$3) returning * ",
      [name, price, addonCategoryId]
    );
    response.send(200);
  }
);

export default addonsRouter;
