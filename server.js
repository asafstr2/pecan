require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const errorHandler = require("./handlers/error");
const theRoute = require("./routes/theOnlyRoute");
require("./services/cache")
app.use(cors());

app.use(bodyParser.json());

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("tiny"));
}

app.use("/v1/api", theRoute);

app.use((req, res, next) => {
  let err = new Error("not found");
  err.status = 404;
  next(err);
});
app.use(errorHandler);

module.exports = app;
