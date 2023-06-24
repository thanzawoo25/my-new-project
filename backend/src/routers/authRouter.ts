
import dotenv from "dotenv"
dotenv.config();

import express, { Request, Response } from "express"
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { config } from "../config/config";


const authRouter = express.Router()


authRouter.post("/register", async (req: Request, res: Response) => {
  // console.log(req.body)
  // res.send(req.body)
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.sendStatus(400);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const companiesResult = await db.query(
      "insert into  companies (name) values ($1) returning *",
      ["Default company"]
    );
    // console.log(companiesResult.rows);
    const companiesId = companiesResult.rows[0].id;

    const userResults = await db.query(
      "insert into users (name, email, password, companies_id) values ($1, $2, $3, $4) returning *",
      [name, email, hashedPassword, companiesId]
    );
    const user = userResults.rows[0];
    delete userResults.rows[0].password;

    const locationResult = await db.query(
      "insert into locations (name,address,companies_id) values ($1,$2,$3) returning *",
      ["Default location", "Default address", companiesId]
    );
    const locationId = locationResult.rows[0].id;

    const menuResult = await db.query(
      "insert into menus (name,price) select * from unnest ($1::text[],$2::int[]) returning *",
      [
        ["monte-hinn-kharr", "shan-khout-swell"],
        [500, 1000],
      ]
    );
    const menus = menuResult.rows;
    const defaultMenuId1 = menus[0].id;
    const defaultMenuId2 = menus[1].id;
    // console.log("Menus: ", menus);

    const menuLocationResults = await db.query(
      "insert into menus_locations (menus_id, locations_id) select * from unnest ($1::int[],$2::int[]) returning *",
      [
        [defaultMenuId1, defaultMenuId2],
        [locationId, locationId],
      ]
    );
    // console.log("menuLocationResults: ...", menuLocationResults.rows);

    const menuCategoriesResult = await db.query(
      "insert into menu_categories (name) values ('defaultMenuCagegory1'),('defaultMenuCagegory2') returning * "
    );

    const defaultMenuCagegories = menuCategoriesResult.rows;
    const defaultMenuCategoryId1 = defaultMenuCagegories[0].id;
    const defaultMenuCategoryId2 = defaultMenuCagegories[1].id;
    // console.log("DefaultMenuCategories: ", defaultMenuCagegories);

    await db.query(
      `insert into menus_menu_categories (menus_id,menu_categories_id) values (${defaultMenuId1},${defaultMenuCategoryId1}),(${defaultMenuId2},${defaultMenuCategoryId2}) `
    );

    const defaultAddonCategoriesResult = await db.query(
      "insert into addon_categories (name,is_required) values ('Drinks',true),('Sizes',true) returning *"
    );
    const addonCategoriesIds = defaultAddonCategoriesResult.rows;
    const defaultAddonCategoryId1 = addonCategoriesIds[0].id;
    const defaultAddonCategoryId2 = addonCategoriesIds[1].id;
    // console.log(
    //   "DefalultAddonCategoryResults: ",
    //   defaultAddonCategoriesResult.rows
    // );

    await db.query(
      "insert into menus_addon_categories (menus_id, addon_categories_id) select * from unnest ($1::int[], $2::int[])",
      [
        [defaultMenuId1, defaultMenuId2],
        [defaultAddonCategoryId1, defaultAddonCategoryId2],
      ]
    );

    await db.query(
      "insert into addons (name, price, addon_categories_id) select * from unnest ($1::text[], $2::int[], $3::int[])",
      [
        ["Cola", "Pepsi", "Large", "Normal"],
        [50, 50, 30, 0],
        [
          defaultAddonCategoryId1,
          defaultAddonCategoryId1,
          defaultAddonCategoryId2,
          defaultAddonCategoryId2,
        ],
      ]
    );

    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

authRouter.post("/login", async (request, response) => {
    //console.log(request.body)
    const {  email, password } = request.body;
     
    if (!email || !password) return response.sendStatus(401);
    const userResult = await db.query("select * from users where email = $1", [email]);
    if(!userResult.rows.length) return response.sendStatus(401)
    const user = userResult.rows[0];
    const hashPassword = user.password;
    const isCorrectPassword = await bcrypt.compare(password, hashPassword);

    if (isCorrectPassword) {
        //console.log(config.jwtSecret)
        const accessToken = jwt.sign(user, config.jwtSecret)
        return response.send({accessToken})
    }
    //return isCorrectPassword ? response.sendStatus(200) :response.sendStatus(401)
    return response.sendStatus(401)

})
 
export default authRouter;

