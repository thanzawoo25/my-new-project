import express, { Request, Response, response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";

const addonCategoriesRouter = express.Router();

addonCategoriesRouter.delete(
  "/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const addonCategoryId = request.params.id;
    if (!addonCategoryId) return response.send(400);
    await db.query(
      "update addon_categories set is_archived = true where id =$1",
      [addonCategoryId]
    );

    response.send(200);
  }
);

addonCategoriesRouter.put(
  "/:id",
  checkAuth,
  async (request: Request, response: Response) => {
    const addonCategoryId = request.params.id;
    const isValid = addonCategoryId;
    console.log("isValid", isValid);
    if (!isValid) return response.send(400);
    const existingAddonCategories = await db.query(
      "select * from addon_categories  where id =$1",
      [addonCategoryId]
    );
    const hasExistingAddon = existingAddonCategories.rows.length > 0;
    if (!hasExistingAddon) return response.send(400);

    const name = request.body.name;

    await db.query("update addon_categories set name = $1  where id = $2", [
      name,
      addonCategoryId,
    ]);
    response.send(200);
  }
);
addonCategoriesRouter.post(
  "/",
  checkAuth,
  async (request: Request, response: Response) => {
    const { name, isRequired, menuIds } = request.body;
    const isValid = name && isRequired !== undefined && menuIds.length;
    if (!isValid) return response.send(400);

    const newAddonCategories = await db.query(
      "insert into addon_categories (name,is_required) values($1,$2) returning *",
      [name, isRequired]
    );
    const newAddonCategoryId = newAddonCategories.rows[0].id;
    menuIds.forEach(async (item: number) => {
      await db.query(
        "insert into menus_addon_categories (menus_id,addon_categories_id) values ($1,$2) returning *",
        [item, newAddonCategoryId]
      );
    });

    response.send(200);
  }
);

export default addonCategoriesRouter;
