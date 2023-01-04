require("dotenv").config();

const express = require("express");
const app = express();
const { SERVER_PORT } = require("./src/configs/server.config");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}`);
});
