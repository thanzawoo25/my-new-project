import dotenv from "dotenv"
dotenv.config();

import express, { response } from "express";
import cors from "cors"
import { db } from "./src/db/db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "./src/config/config";
import { checkAuth } from "./src/utils/auth";

console.log("config",config.jwtSecret)


const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());

app.get("/menus",checkAuth, async(request, response) => {
    const menusResult = await db.query("select * from menus")
    response.send(menusResult.rows)
})


app.post("/auth/register", async (request, response) => {
    //console.log(request.body)
    const { name, email, password } = request.body;
    if (!name || !email || !password) return response.sendStatus(400);
     const hashedPassword = await bcrypt.hash(password, 10)
try {
    const companiesResult = await db.query(
      "insert into companies(name) values($1)  RETURNING *",
      ["Defult company"]
    );
    console.log(companiesResult.rows);
    const companiesId = companiesResult.rows[0].id;

    const text =
        "INSERT INTO users(name, email, password,companies_id) VALUES($1, $2, $3,$4) RETURNING *";
     
    const values = [name, email, hashedPassword, companiesId];
    const userResult = await db.query(text, values);
    const user = userResult.rows[0];
    delete user.password;

    const locationResult = await db.query(
      "insert into locations(name,address,companies_id) values($1,$2,$3)  RETURNING *",
      ["Defult location", "Defult address", companiesId]
    );

    const locationId = locationResult.rows[0].id;

    const menusResult = await db.query(
      "insert into menus(name,price) select * from unnest($1::text[],$2::int[]) returning *",
      [
        ["mote-hinn-kharr", "shan-khout-swell"],
        [500, 1000],
      ]
    );

    const menus = menusResult.rows;
    const defaultMenuId1 = menus[0].id;
    const defaultMenuId2 = menus[1].id;
    await db.query(
      "insert into menus_locations(menus_id,locations_id) select * from unnest($1::int[],$2::int[]) returning *",
      [
        [defaultMenuId1, defaultMenuId2],
        [locationId, locationId],
      ]
    );

    const menuCategoriesResult = await db.query(
      "insert into menu_categories (name) values ('defaultMenuCategory1'),('defaultMenuCategory2') returning *"
    );
    const defaultMenuCategories = menuCategoriesResult.rows;
    const defaultMenuCategoryId1 = defaultMenuCategories[0].id;
    const defaultMenuCategoryId2 = defaultMenuCategories[1].id;

    await db.query(
      `insert into menus_menu_categories (menus_id, menu_categories_id) values(${defaultMenuId1}, ${defaultMenuCategoryId1}), (${defaultMenuId2}, ${defaultMenuCategoryId2})`
    );

    const defaultAddonCategoriesResult = await db.query(
      "insert into addon_categories (name,is_required) values ('Drinks',true), ('Sizes',true) returning *"
    );

    const addonCotegoriesIds = defaultAddonCategoriesResult.rows;
    const defaultAddonCategoryId1 = addonCotegoriesIds[0].id;
    const defaultAddonCategoryId2 = addonCotegoriesIds[1].id;

    await db.query (
      `insert into menus_addon_categories (menus_id, addon_categories_id) values (${defaultMenuId1}, ${defaultAddonCategoryId1}), (${defaultMenuId2}, ${defaultAddonCategoryId2})`
    );

    await db.query (`insert into addons (name, price, addon_categories_id) values ('Cola', 50, ${defaultAddonCategoryId1}), ('Pepsi', 50, ${defaultAddonCategoryId1}), 
      ('Large', 30, ${defaultAddonCategoryId2}), ('Normal', 0, ${defaultAddonCategoryId2})`
    );

    response.send(user);
  } catch (err) {
    console.log(err);
    response.sendStatus(500);
    }
    
    //  const text = 'INSERT INTO users(name, email,password) VALUES($1, $2,$3) RETURNING *';
    // const values = [name, email, hashedPassword];
    // try {
    //     const userResult = await db.query(text, values);
    // //console.log(userResult.rows);
    // //response.send(request.body);
    //     const user = userResult.rows[0];
    //     delete user.password;
    //     response.send(user)
    // } catch (error) {
    //     console.log("error",error)
    //     response.sendStatus(500)
    // }
    
})

app.post("/auth/login", async (request, response) => {
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

app.listen(port, () => {
    console.log(`server is listening on port:${port}`)
})
