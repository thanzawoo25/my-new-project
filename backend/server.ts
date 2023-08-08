import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import { config } from "./src/config/config";
import addonCategoriesRouter from "./src/routers/addonCategoriesRouter";
import addonsRouter from "./src/routers/addonsRouter";
import appRouter from "./src/routers/appRouter";
import authRouter from "./src/routers/authRouter";
import locationsRouter from "./src/routers/locationsRouter";
import menuCategoriesRouter from "./src/routers/menuCategoriesRouter";
import menusRouter from "./src/routers/menusRouter";
import tablesRouter from "./src/routers/tablesRouter";

console.log("config", config);

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/", appRouter);
app.use("/menus", menusRouter);
app.use("/menu-categories", menuCategoriesRouter);
app.use("/addon-categories", addonCategoriesRouter);
app.use("/addons", addonsRouter);
app.use("/auth", authRouter);
app.use("/locations", locationsRouter);
app.use("/tables", tablesRouter);

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});
