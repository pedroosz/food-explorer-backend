const { Router } = require("express");
const UploadController = require("../controllers/upload.controller");

const controller = new UploadController();
const UploadRouter = Router();

UploadRouter.get("/:id", controller.getOne);

module.exports = UploadRouter;
