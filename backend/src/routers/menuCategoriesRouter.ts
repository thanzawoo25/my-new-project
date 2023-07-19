import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";

const menuCategoriesRouter = express.Router();

menuCategoriesRouter.put(
  "/",
  checkAuth,
  async (request: Request, response: Response) => {
    const { id, name, locationIds } = request.body;
    if (!id) return response.send(400);
    await db.query(
      "update menu_categories set name =$1 where id=$2 returning*",
      [name, id]
    );
    const existingResultRows = await db.query(
      "select locations_id from menus_menu_categories_locations where menu_categories_id =$1",
      [id]
    );
    const existingLocationIds = existingResultRows.rows.map(
      (item) => item.locations_id
    );
    const removedLocationIds = existingLocationIds.filter(
      (item) => !locationIds.includes(item)
    );
    if (!removedLocationIds.length) {
      removedLocationIds.forEach(async (item) => {
        await db.query(
          "update menus_menu_categories_locations set is_archived = true where menu_categories_id =$1 and locations_id =$2",
          [Number(id), item]
        );
      });
    }
    response.send(200);
  }
);
export default menuCategoriesRouter;
