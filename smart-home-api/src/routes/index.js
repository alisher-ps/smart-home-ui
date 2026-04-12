const express = require("express");
const pool = require("../config/db");
const authRoutes = require("./authRoutes");
const deviceRoutes = require("./deviceRoutes");
const roomRoutes = require("./roomRoutes");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Smart Home API is running",
  });
});

router.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.status(200).json({
      success: true,
      message: "Database connected successfully",
      serverTime: result.rows[0].now,
    });
  } catch (error) {
    console.error("Health check error:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

router.use("/auth", authRoutes);
router.use("/devices", deviceRoutes);
router.use("/rooms", roomRoutes);

module.exports = router;