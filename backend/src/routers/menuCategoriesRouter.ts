import express, { Request, Response, response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";

const menuCategoriesRouter = express.Router();

menuCategoriesRouter.put(
  "/",
  checkAuth,
  async (request: Request, response: Response) => {
    const { id, name, locationIds } = request.body;
    if (!id) return response.send(400);
    if (name) {
      await db.query(
        "update menu_categories set name =$1 where id=$2 returning*",
        [name, id]
      );
      return response.send(200);
    }
    const existingResultRows = await db.query(
      "select locations_id from menus_menu_categories_locations where menu_categories_id =$1",
      [id]
    );
    const existingLocationIds = existingResultRows.rows.map(
      (item) => item.locations_id
    );
    console.log("existingLocationIds", existingLocationIds);
    const removedLocationIds = existingLocationIds.filter(
      (item) => !locationIds.includes(item)
    );
    console.log("removedLocationIds", removedLocationIds);
    if (!removedLocationIds.length) {
      removedLocationIds.forEach(async (item) => {
        await db.query(
          "update menus_menu_categories_locations set is_archived = true where menu_categories_id =$1 and locations_id =$2",
          [Number(id), item]
        );
      });
    }

    const addedLocationIds = locationIds.filter(async (item: number) =>
      existingLocationIds.includes(item)
    );
    if (addedLocationIds.length) {
      addedLocationIds.forEach(async (item: number) => {
        await db.query(
          "insert into menus_menu_categories_locations (menu_categories_id,locations_id) values ($1,$2)",
          [id, item]
        );
      });
    }
    response.send(200);
  }
);

menuCategoriesRouter.put(
  "/removedMenu",
  checkAuth,
  async (request: Request, response: Response) => {
    const { menuId, menuCategoryId, locationId } = request.body;
    const isValid = menuId && menuCategoryId && locationId;
    if (!isValid) return response.send(400);

    const menusMenuCategoriesLocations = await db.query(
      "select * from menus_menu_categories_locations where menus_id =$1 and menu_categories_id=$2 and locations_id =$3",
      [menuId, menuCategoryId, locationId]
    );
    const hasMenusMenuCategoriesLocations =
      menusMenuCategoriesLocations.rows.length;
    if (!hasMenusMenuCategoriesLocations) return response.send(400);
    await db.query(
      "update menus_menu_categories_locations set is_archived = true where menus_id =$1 and menu_categories_id=$2 and locations_id =$3",
      [menuId, menuCategoryId, locationId]
    );
    response.send(200);
  }
);
export default menuCategoriesRouter;
