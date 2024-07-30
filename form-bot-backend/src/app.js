const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Form Bot",
    data: {},
  });
});

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is available",
    data: {},
  });
});

const endpointURL = "/api/v1";

// User
const userRouter = require("./routes/user");
app.use(`${endpointURL}/user`, userRouter);

// Form
const formRouter = require("./routes/form");
app.use(`${endpointURL}/form`, formRouter);

// Folder
const folderRouter = require("./routes/folder");
app.use(`${endpointURL}/folder`, folderRouter);

module.exports = app;
