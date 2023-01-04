require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");

const { SERVER_PORT } = require("./src/configs/server.config");

const express = require("express");
const app = express();
const port = SERVER_PORT | 3000;


const usersRouter = require("./src/routes/users.route");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/users", usersRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
