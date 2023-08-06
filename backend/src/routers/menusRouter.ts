import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";

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

menusRouter.put(
  "/",
  checkAuth,
  async (request: Request, response: Response) => {
    const { id, name, price, addonCategoryIds } = request.body;

    const isValid = id && name;
    console.log("addOnID", addonCategoryIds);
    if (!isValid) return response.send(400);
    await db.query(
      "update menus set name =$1, price =$2 where id =$3 returning *",
      [name, price, id]
    );
    const existinAddonCategoryIds = await db.query(
      "select addon_categories_id from menus_addon_categories where menus_id = $1",
      [id]
    );

    if (addonCategoryIds) {
      const removedAddonCategoryIds = existinAddonCategoryIds.rows.filter(
        (item) => !addonCategoryIds.includes(item.addon_categories_id)
      );

      if (removedAddonCategoryIds.length) {
        removedAddonCategoryIds.forEach(
          async (item: any) =>
            await db.query(
              "delete from menus_addon_categories where menus_id=$1 and addon_categories_id =$2",
              [id, item.addon_categories_id]
            )
        );
        const addedAddonCategoryIds = addonCategoryIds.filter(
          (item: number) => !existinAddonCategoryIds.rows.includes(item)
        );
        if (addedAddonCategoryIds) {
          addedAddonCategoryIds.forEach(async (item: number) => {
            await db.query(
              "insert into addon_categories (menus_id,addon_categories_id) values ($1,$2) ",
              [id, item]
            );
          });
        }
      }
    }
    response.send(200);
  }
);

menusRouter.delete(
  "/:menuId",
  checkAuth,
  async (req: Request, res: Response) => {
    const menuId = req.params.menuId;
    if (!menuId) return res.send(400);
    await db.query("update menus set is_archived = true where id = $1", [
      menuId,
    ]);
    res.send(200);
  }
);
export default menusRouter;
