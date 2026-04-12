const pool = require("../config/db");

const getRooms = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const result = await pool.query(
      `SELECT id, name, type, user_id, created_at
       FROM rooms
       WHERE user_id = $1
       ORDER BY id ASC`,
      [userId]
    );

    return res.status(200).json({
      success: true,
      rooms: result.rows,
    });
  } catch (error) {
    console.error("Get rooms error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
      error: error.message,
    });
  }
};

const createRoom = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { name, type } = req.body || {};

    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: "Name and type are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO rooms (name, type, user_id)
       VALUES ($1, $2, $3)
       RETURNING id, name, type, user_id, created_at`,
      [name, type, userId]
    );

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
      room: result.rows[0],
    });
  } catch (error) {
    console.error("Create room error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create room",
      error: error.message,
    });
  }
};

const updateRoom = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { id } = req.params;
    const { name, type } = req.body || {};

    const existingRoom = await pool.query(
      `SELECT * FROM rooms WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (existingRoom.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const currentRoom = existingRoom.rows[0];
    const updatedName = name ?? currentRoom.name;
    const updatedType = type ?? currentRoom.type;

    const result = await pool.query(
      `UPDATE rooms
       SET name = $1, type = $2
       WHERE id = $3 AND user_id = $4
       RETURNING id, name, type, user_id, created_at`,
      [updatedName, updatedType, id, userId]
    );

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room: result.rows[0],
    });
  } catch (error) {
    console.error("Update room error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update room",
      error: error.message,
    });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM rooms
       WHERE id = $1 AND user_id = $2
       RETURNING id, name, type`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room deleted successfully",
      room: result.rows[0],
    });
  } catch (error) {
    console.error("Delete room error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete room",
      error: error.message,
    });
  }
};

const getRoomDevices = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { id } = req.params;

    const roomCheck = await pool.query(
      `SELECT id, name, type FROM rooms WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (roomCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const devicesResult = await pool.query(
      `SELECT id, name, type, status, user_id, room_id, created_at
       FROM devices
       WHERE room_id = $1 AND user_id = $2
       ORDER BY id ASC`,
      [id, userId]
    );

    return res.status(200).json({
      success: true,
      room: roomCheck.rows[0],
      devices: devicesResult.rows,
    });
  } catch (error) {
    console.error("Get room devices error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch room devices",
      error: error.message,
    });
  }
};

module.exports = {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomDevices,
};