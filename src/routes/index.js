const { Router } = require("express");
const UserRouter = require("./user.routes");
const DishRouter = require("./dishes.routes");
const SessionRouter = require("./session.routes");
const CategoryRouter = require("./category.routes");
const UploadRouter = require("./upload.routes");

const router = Router();

router.use("/users", UserRouter);
router.use("/dishes", DishRouter);
router.use("/sessions", SessionRouter);
router.use("/categories", CategoryRouter);
router.use("/uploads", UploadRouter);

module.exports = router;
