const express = require("express");
const {
  getSensors,
  createSensor,
  updateSensor,
  deleteSensor,
  getSensorReadings,
  createSensorReading,
} = require("../controllers/sensorController");
const { requireAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", requireAuth, getSensors);
router.post("/", requireAuth, createSensor);
router.patch("/:id", requireAuth, updateSensor);
router.delete("/:id", requireAuth, deleteSensor);

router.get("/:id/readings", requireAuth, getSensorReadings);
router.post("/:id/readings", requireAuth, createSensorReading);

module.exports = router;