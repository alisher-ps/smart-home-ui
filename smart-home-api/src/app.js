require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const routes = require("./routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    name: "smart_home_sid",
    secret: "smart-home-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Smart Home API running");
});

module.exports = app;