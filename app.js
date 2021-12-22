const express = require("express");

const indexRouter = require("./controllers/index");

const app = express();

app.use(express.json());

app.use("/", indexRouter);

app.listen(8000, () => console.log("Server is listening at port 8000"));

module.exports = app;
