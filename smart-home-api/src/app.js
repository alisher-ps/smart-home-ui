require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const routes = require("./routes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    name: "smart_home_sid",
    secret: process.env.SESSION_SECRET || "smart-home-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", (req, res) => {
  res.send("Smart Home API running");
});

app.use("/api", routes);

module.exports = app;