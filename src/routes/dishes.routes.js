const { Router } = require("express");
const DishController = require("../controllers/dish.controller");
const ensureAdmin = require("../middlewares/admin.middleware");
const multer = require("../configs/multer");

const DishRouter = Router();

const controller = new DishController();

DishRouter.get("/", controller.getAll);
DishRouter.post(
  "/",
  ensureAdmin,
  multer.upload.single("image"),
  controller.create
);

DishRouter.get("/:id", controller.getOne);
DishRouter.put(
  "/:id",
  ensureAdmin,
  multer.upload.single("image"),
  controller.update
);
DishRouter.delete("/:id", ensureAdmin, controller.delete);

module.exports = DishRouter;
