import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";

const menusRouter = express.Router();

menusRouter.get("/", checkAuth, async (request, response) => {
  const menusResult = await db.query("select * from menus");
  //response.send(menusResult.rows)
});

menusRouter.post(
  "/",
  checkAuth,
  async (request: Request, response: Response) => {
    const { name, description, price, assetUrl, locationId, menuCategoryIds } =
      request.body;
    console.log("request.body", request.body);
    const newMenuResult = await db.query(
      "insert into menus (name,description,price,asset_url) values ($1,$2,$3,$4) returning *",
      [name, description, price, assetUrl]
    );
    const menuIds = newMenuResult.rows[0].id;
    menuCategoryIds.forEach(async (item: number) => {
      await db.query(
        "insert into menus_menu_categories_locations (menus_id,menu_categories_id,locations_id) values ($1,$2,$3)",
        [menuIds, item, Number(locationId)]
      );
    });
    response.send(newMenuResult.rows);
  }
);
export default menusRouter;
