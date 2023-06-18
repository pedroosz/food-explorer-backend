const { Router } = require("express");
const SessionController = require("../controllers/session.controller");

const SessionRouter = Router();
const controller = new SessionController();

SessionRouter.post("/", controller.create);
SessionRouter.get("/", controller.verify);

module.exports = SessionRouter;
