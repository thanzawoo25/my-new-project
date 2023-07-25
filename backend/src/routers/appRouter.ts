import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { fileUpload } from "../utils/fileUpload";
import { send } from "process";

const appRouter = express.Router();

appRouter.get("/", checkAuth, async (request: Request, response: Response) => {
  //@ts-ignore
  const userEmail = request.email;

  try {
    //get user rows
    const userResult = await db.query("select * from users where email= $1", [
      userEmail,
    ]);

    //get companies rows and id
    const companyId = userResult.rows[0].companies_id;
    const companyResult = await db.query(
      "select * from companies where id = $1",
      [companyId]
    );

    //get location rows and ids

    const locations = await db.query(
      "select * from locations where companies_id =$1",
      [companyId]
    );
    const locationIds = locations.rows.map((row) => row.id);

    const menusMenuCategoriesLocations = await db.query(
      "select * from menus_menu_categories_locations where is_archived = false and locations_id =ANY($1::int[])",
      [locationIds]
    );

    //gets menus row and id
    const menuIds = menusMenuCategoriesLocations.rows.map(
      (row) => row.menus_id
    );

    const menus = await db.query(
      `select * from menus where id= ANY($1::int[])`,
      [menuIds]
    );

    //menu categories id and rows

    const menuCategoryIds = menusMenuCategoriesLocations.rows.map(
      (row) => row.menu_categories_id
    );

    const menuCategoriesResult = await db.query(
      "select * from menu_categories where id = ANY($1::int[])",
      [menuCategoryIds]
    );

    //addon categories

    const menusAddonCategoriesResult = await db.query(
      "select * from menus_addon_categories where menus_id = ANY($1::int[])",
      [menuIds]
    );
    const addonCategoryIds = menusAddonCategoriesResult.rows.map(
      (row) => row.addon_categories_id
    );

    //addon
    console.log(addonCategoryIds);

    const addonCategories = await db.query(
      "select * from addon_categories where id = ANY($1::int[])",
      [addonCategoryIds]
    );

    const addons = await db.query(
      "select * from addons where addon_categories_id = ANY($1::int[])",
      [addonCategoryIds]
    );

    const companiesResult = await db.query(
      "select * from companies where id = $1",
      [companyId]
    );

    const company = companiesResult.rows[0];
    const tableResult = await db.query(
      "select * from tables where locations_id = ANY($1::int[])",
      [locationIds]
    );
    response.send({
      menus: menus.rows,
      menuCategories: menuCategoriesResult.rows,
      addons: addons.rows,
      addonCategories: addonCategories.rows,
      tables: tableResult.rows,
      locations: locations.rows,
      menusAddonCategories: menusAddonCategoriesResult.rows,
      menusMenuCategoriesLocations: menusMenuCategoriesLocations.rows,
      company,
    });
  } catch (error) {
    console.log("ERROR", error);
    response.sendStatus(500);
  }
});

appRouter.post("/assets", (request: Request, response: Response) => {
  console.log("Config", config);

  try {
    fileUpload(request, response, async (error) => {
      console.log(error);
      if (error) {
        console.log(error);
        return response.sendStatus(500);
      }
      const files = request.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      response.send({ assetUrl });
    });
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
});
export default appRouter;
