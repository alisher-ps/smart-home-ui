const pool = require("../config/db");

const getSensors = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const result = await pool.query(
      `SELECT id, name, type, value, unit, status, user_id, room_id, created_at, updated_at
       FROM sensors
       WHERE user_id = $1
       ORDER BY id ASC`,
      [userId]
    );

    return res.status(200).json({
      success: true,
      sensors: result.rows,
    });
  } catch (error) {
    console.error("Get sensors error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch sensors",
      error: error.message,
    });
  }
};

const createSensor = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { name, type, value, unit, status, room_id } = req.body || {};

    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: "Name and type are required",
      });
    }

    if (room_id) {
      const roomCheck = await pool.query(
        `SELECT id FROM rooms WHERE id = $1 AND user_id = $2`,
        [room_id, userId]
      );

      if (roomCheck.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Room not found for this user",
        });
      }
    }

    const result = await pool.query(
      `INSERT INTO sensors (name, type, value, unit, status, user_id, room_id, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
       RETURNING id, name, type, value, unit, status, user_id, room_id, created_at, updated_at`,
      [name, type, value ?? null, unit ?? null, status ?? "normal", userId, room_id ?? null]
    );

    return res.status(201).json({
      success: true,
      message: "Sensor created successfully",
      sensor: result.rows[0],
    });
  } catch (error) {
    console.error("Create sensor error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create sensor",
      error: error.message,
    });
  }
};

const updateSensor = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { id } = req.params;
    const { name, type, value, unit, status, room_id } = req.body || {};

    const existingSensor = await pool.query(
      `SELECT * FROM sensors WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (existingSensor.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sensor not found",
      });
    }

    if (room_id !== undefined && room_id !== null) {
      const roomCheck = await pool.query(
        `SELECT id FROM rooms WHERE id = $1 AND user_id = $2`,
        [room_id, userId]
      );

      if (roomCheck.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Room not found for this user",
        });
      }
    }

    const currentSensor = existingSensor.rows[0];

    const updatedName = name ?? currentSensor.name;
    const updatedType = type ?? currentSensor.type;
    const updatedValue = value ?? currentSensor.value;
    const updatedUnit = unit ?? currentSensor.unit;
    const updatedStatus = status ?? currentSensor.status;
    const updatedRoomId =
      room_id === undefined ? currentSensor.room_id : room_id;

    const result = await pool.query(
      `UPDATE sensors
       SET name = $1,
           type = $2,
           value = $3,
           unit = $4,
           status = $5,
           room_id = $6,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 AND user_id = $8
       RETURNING id, name, type, value, unit, status, user_id, room_id, created_at, updated_at`,
      [
        updatedName,
        updatedType,
        updatedValue,
        updatedUnit,
        updatedStatus,
        updatedRoomId,
        id,
        userId,
      ]
    );

    return res.status(200).json({
      success: true,
      message: "Sensor updated successfully",
      sensor: result.rows[0],
    });
  } catch (error) {
    console.error("Update sensor error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update sensor",
      error: error.message,
    });
  }
};

const deleteSensor = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM sensors
       WHERE id = $1 AND user_id = $2
       RETURNING id, name, type, value, unit, status, room_id`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sensor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sensor deleted successfully",
      sensor: result.rows[0],
    });
  } catch (error) {
    console.error("Delete sensor error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete sensor",
      error: error.message,
    });
  }
};

const getSensorReadings = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { id } = req.params;

    const sensorCheck = await pool.query(
      `SELECT id, name, type, value, unit, status FROM sensors WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (sensorCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sensor not found",
      });
    }

    const readingsResult = await pool.query(
      `SELECT id, sensor_id, value, created_at
       FROM sensor_readings
       WHERE sensor_id = $1
       ORDER BY created_at DESC`,
      [id]
    );

    return res.status(200).json({
      success: true,
      sensor: sensorCheck.rows[0],
      readings: readingsResult.rows,
    });
  } catch (error) {
    console.error("Get sensor readings error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch sensor readings",
      error: error.message,
    });
  }
};

const createSensorReading = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { id } = req.params;
    const { value } = req.body || {};

    if (value === undefined || value === null || value === "") {
      return res.status(400).json({
        success: false,
        message: "Reading value is required",
      });
    }

    const sensorCheck = await pool.query(
      `SELECT id, name, type FROM sensors WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (sensorCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sensor not found",
      });
    }

    const readingResult = await pool.query(
      `INSERT INTO sensor_readings (sensor_id, value)
       VALUES ($1, $2)
       RETURNING id, sensor_id, value, created_at`,
      [id, String(value)]
    );

    await pool.query(
      `UPDATE sensors
       SET value = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2 AND user_id = $3`,
      [String(value), id, userId]
    );

    return res.status(201).json({
      success: true,
      message: "Sensor reading added successfully",
      reading: readingResult.rows[0],
    });
  } catch (error) {
    console.error("Create sensor reading error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create sensor reading",
      error: error.message,
    });
  }
};

module.exports = {
  getSensors,
  createSensor,
  updateSensor,
  deleteSensor,
  getSensorReadings,
  createSensorReading,
};