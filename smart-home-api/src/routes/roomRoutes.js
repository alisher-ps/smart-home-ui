const express = require("express");
const {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomDevices,
} = require("../controllers/roomController");
const { requireAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", requireAuth, getRooms);
router.post("/", requireAuth, createRoom);
router.patch("/:id", requireAuth, updateRoom);
router.delete("/:id", requireAuth, deleteRoom);
router.get("/:id/devices", requireAuth, getRoomDevices);

module.exports = router;