const { Router } = require("express");
const ensureAdmin = require("../middlewares/admin.middleware");
const CategoryController = require("../controllers/categories.controller");

const CategoryRouter = Router();

const controller = new CategoryController();

CategoryRouter.get("/", controller.list);
CategoryRouter.post("/", ensureAdmin, controller.create);
CategoryRouter.get("/:id", controller.find);

module.exports = CategoryRouter;
