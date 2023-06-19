require("dotenv").config();
require("express-async-errors");

const express = require("express");
const router = require("./routes");
const AppError = require("./utils/AppError");
const cors = require("cors");

const app = express();

if (process.env.DEVELOPMENT) {
  app.use(
    cors({
      origin: process.env.DEVELOPMENT_FRONTEND_ENDPOINT,
    })
  );
} else {
  app.use(
    cors({
      origin: process.env.FRONTEND_ENDPOINT,
    })
  );
}

app.use(express.json());
app.use(router);
app.use(express.static("src/uploads"));
app.use((error, _req, res, _next) => {
  if (error instanceof AppError) {
    return res
      .status(error.status)
      .json({ message: error.message, status: "error" });
  }

  console.log(error);

  return res
    .status(500)
    .json({ message: "Internal Server Error", status: "error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(
    `[${
      process.env.DEVELOPMENT ? "DEV" : "PROD"
    } SERVER] => Running on port ${PORT}`
  )
);
