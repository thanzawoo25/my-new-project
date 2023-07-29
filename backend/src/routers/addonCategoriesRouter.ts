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
    const existingAddon = await db.query(
      "update addon_categories  where id =$1",
      [addonCategoryId]
    );

    response.send(200);
  }
);

export default addonCategoriesRouter;
