const pool = require("../config/db");

const getDevices = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const result = await pool.query(
      `SELECT id, name, type, status, user_id, created_at
       FROM devices
       WHERE user_id = $1
       ORDER BY id ASC`,
      [userId]
    );

    return res.status(200).json({
      success: true,
      devices: result.rows,
    });
  } catch (error) {
    console.error("Get devices error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch devices",
      error: error.message,
    });
  }
};

const createDevice = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { name, type, status } = req.body || {};

    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: "Name and type are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO devices (name, type, status, user_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, type, status, user_id, created_at`,
      [name, type, status ?? false, userId]
    );

    return res.status(201).json({
      success: true,
      message: "Device created successfully",
      device: result.rows[0],
    });
  } catch (error) {
    console.error("Create device error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create device",
      error: error.message,
    });
  }
};

const updateDevice = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { id } = req.params;
    const { name, type, status } = req.body || {};

    const existingDevice = await pool.query(
      `SELECT * FROM devices WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (existingDevice.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    const currentDevice = existingDevice.rows[0];

    const updatedName = name ?? currentDevice.name;
    const updatedType = type ?? currentDevice.type;
    const updatedStatus = status ?? currentDevice.status;

    const result = await pool.query(
      `UPDATE devices
       SET name = $1, type = $2, status = $3
       WHERE id = $4 AND user_id = $5
       RETURNING id, name, type, status, user_id, created_at`,
      [updatedName, updatedType, updatedStatus, id, userId]
    );

    return res.status(200).json({
      success: true,
      message: "Device updated successfully",
      device: result.rows[0],
    });
  } catch (error) {
    console.error("Update device error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update device",
      error: error.message,
    });
  }
};

const deleteDevice = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM devices
       WHERE id = $1 AND user_id = $2
       RETURNING id, name, type, status`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Device deleted successfully",
      device: result.rows[0],
    });
  } catch (error) {
    console.error("Delete device error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete device",
      error: error.message,
    });
  }
};

module.exports = {
  getDevices,
  createDevice,
  updateDevice,
  deleteDevice,
};