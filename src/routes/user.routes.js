const { Router } = require("express");
const UserController = require("../controllers/user.controller");

const UserRouter = Router();

const controller = new UserController();

UserRouter.get("/:id", controller.getOne);
UserRouter.put("/:id", controller.update);
UserRouter.post("/", controller.create);

module.exports = UserRouter;
