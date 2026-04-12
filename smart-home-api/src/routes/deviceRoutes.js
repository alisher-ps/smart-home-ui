const express = require("express");
const {
  getDevices,
  createDevice,
  updateDevice,
  deleteDevice,
} = require("../controllers/deviceController");
const { requireAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", requireAuth, getDevices);
router.post("/", requireAuth, createDevice);
router.patch("/:id", requireAuth, updateDevice);
router.delete("/:id", requireAuth, deleteDevice);

module.exports = router;