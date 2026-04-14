import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SensorCard from "../components/SensorCard";
import { getSensors, updateSensor, createSensor } from "../api/sensors";
import { getRooms } from "../api/rooms";

function Sensors() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sensors, setSensors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "temperature",
    value: "",
    unit: "C",
    status: "normal",
    room_id: "",
  });

  const fetchSensors = async () => {
    const data = await getSensors();
    setSensors(data.sensors || []);
  };

  const fetchRooms = async () => {
    const data = await getRooms();
    setRooms(data.rooms || []);
  };

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError("");
      await Promise.all([fetchSensors(), fetchRooms()]);
    } catch (err) {
      setError(err.message || "Failed to load sensors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const getDefaultUnitByType = (type) => {
    switch (type) {
      case "temperature":
        return "C";
      case "humidity":
        return "%";
      case "gas":
        return "ppm";
      case "light":
      case "light_level":
        return "lux";
      default:
        return "";
    }
  };

  const getDefaultValueByType = (type) => {
    switch (type) {
      case "temperature":
        return "24";
      case "humidity":
        return "50";
      case "pir":
      case "motion":
        return "clear";
      case "gas":
        return "safe";
      case "water":
        return "dry";
      case "light":
      case "light_level":
        return "Bright";
      case "vibration":
        return "stable";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "type") {
        return {
          ...prev,
          type: value,
          unit: getDefaultUnitByType(value),
          value: getDefaultValueByType(value),
        };
      }

      return {
        ...prev,
        [name]:
          name === "room_id" ? (value === "" ? "" : Number(value)) : value,
      };
    });
  };

  const handleCreateSensor = async (e) => {
    e.preventDefault();

    try {
      setCreating(true);
      setError("");

      const payload = {
        name: formData.name,
        type: formData.type,
        value: formData.value,
        unit: formData.unit || null,
        status: formData.status,
        room_id: formData.room_id === "" ? null : formData.room_id,
      };

      await createSensor(payload);

      setFormData({
        name: "",
        type: "temperature",
        value: "24",
        unit: "C",
        status: "normal",
        room_id: "",
      });

      await fetchSensors();
    } catch (err) {
      setError(err.message || "Failed to create sensor");
    } finally {
      setCreating(false);
    }
  };

  const handleSensorUpdate = async (sensor, updates) => {
    try {
      setError("");
      await updateSensor(sensor.id, updates);
      await fetchSensors();
    } catch (err) {
      setError(err.message || "Failed to update sensor");
    }
  };

  const renderSensorCard = (sensor) => {
    const type = String(sensor.type || "").toLowerCase();
    const value = sensor.value;

    if (type === "temperature") {
      const numericValue = Number(value) || 0;
      return (
        <SensorCard
          key={sensor.id}
          title={sensor.name}
          value={`${numericValue}${sensor.unit || ""}`}
          subtitle="Temperature sensor"
          alert={numericValue > 30}
          primaryLabel="Increase"
          secondaryLabel="Decrease"
          onPrimaryClick={() =>
            handleSensorUpdate(sensor, { value: String(numericValue + 1) })
          }
          onSecondaryClick={() =>
            handleSensorUpdate(sensor, { value: String(numericValue - 1) })
          }
        />
      );
    }

    if (type === "humidity") {
      const numericValue = Number(value) || 0;
      return (
        <SensorCard
          key={sensor.id}
          title={sensor.name}
          value={`${numericValue}${sensor.unit || ""}`}
          subtitle="Humidity sensor"
          alert={numericValue > 70}
          primaryLabel="Increase"
          secondaryLabel="Decrease"
          onPrimaryClick={() =>
            handleSensorUpdate(sensor, { value: String(numericValue + 1) })
          }
          onSecondaryClick={() =>
            handleSensorUpdate(sensor, { value: String(numericValue - 1) })
          }
        />
      );
    }

    if (type === "pir" || type === "motion") {
      const detected =
        value === "detected" || value === "true" || value === true;
      return (
        <SensorCard
          key={sensor.id}
          title={sensor.name}
          value={detected ? "Detected" : "Clear"}
          subtitle="PIR sensor status"
          alert={detected}
          primaryLabel="Detect"
          secondaryLabel="Clear"
          onPrimaryClick={() => handleSensorUpdate(sensor, { value: "detected" })}
          onSecondaryClick={() => handleSensorUpdate(sensor, { value: "clear" })}
        />
      );
    }

    if (type === "gas") {
      const leak =
        value === "leak" || value === "detected" || value === "true" || value === true;
      return (
        <SensorCard
          key={sensor.id}
          title={sensor.name}
          value={leak ? "Leak Detected" : "Safe"}
          subtitle="Gas sensor monitoring"
          alert={leak}
          primaryLabel="Trigger"
          secondaryLabel="Reset"
          onPrimaryClick={() => handleSensorUpdate(sensor, { value: "leak" })}
          onSecondaryClick={() => handleSensorUpdate(sensor, { value: "safe" })}
        />
      );
    }

    if (type === "water") {
      const detected =
        value === "detected" || value === "wet" || value === "true" || value === true;
      return (
        <SensorCard
          key={sensor.id}
          title={sensor.name}
          value={detected ? "Detected" : "Dry"}
          subtitle="Water sensor monitoring"
          alert={detected}
          primaryLabel="Trigger"
          secondaryLabel="Reset"
          onPrimaryClick={() => handleSensorUpdate(sensor, { value: "detected" })}
          onSecondaryClick={() => handleSensorUpdate(sensor, { value: "dry" })}
        />
      );
    }

    if (type === "light" || type === "light_level") {
      const dark = String(value).toLowerCase() === "dark";
      return (
        <SensorCard
          key={sensor.id}
          title={sensor.name}
          value={value || "Unknown"}
          subtitle="Current room brightness"
          alert={dark}
          primaryLabel="Bright"
          secondaryLabel="Dark"
          onPrimaryClick={() => handleSensorUpdate(sensor, { value: "Bright" })}
          onSecondaryClick={() => handleSensorUpdate(sensor, { value: "Dark" })}
        />
      );
    }

    if (type === "vibration") {
      const vibrating = String(value).toLowerCase() === "vibrating";
      return (
        <SensorCard
          key={sensor.id}
          title={sensor.name}
          value={vibrating ? "Vibration" : "Stable"}
          subtitle="Vibration sensor"
          alert={vibrating}
          primaryLabel="Trigger"
          secondaryLabel="Reset"
          onPrimaryClick={() =>
            handleSensorUpdate(sensor, { value: "vibrating", status: "warning" })
          }
          onSecondaryClick={() =>
            handleSensorUpdate(sensor, { value: "stable", status: "normal" })
          }
        />
      );
    }

    return (
      <SensorCard
        key={sensor.id}
        title={sensor.name}
        value={value ?? "N/A"}
        subtitle={sensor.type || "Sensor"}
        alert={sensor.status === "warning" || sensor.status === "danger"}
        primaryLabel="Set Normal"
        secondaryLabel="Set Warning"
        onPrimaryClick={() => handleSensorUpdate(sensor, { status: "normal" })}
        onSecondaryClick={() => handleSensorUpdate(sensor, { status: "warning" })}
      />
    );
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <div className="main-content">
        <Topbar openSidebar={() => setIsSidebarOpen(true)} />

        <div className="content-area">
          <section className="hero-section">
            <div className="hero-text">
              <p className="hero-label">SMART HOME PANEL</p>
              <h1>Sensors</h1>
              <p className="hero-subtext">
                Monitor your sensor values and alerts.
              </p>
            </div>
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2>Add New Sensor</h2>
            </div>

            <form
              onSubmit={handleCreateSensor}
              style={{
                display: "grid",
                gap: "12px",
                gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                marginBottom: "24px",
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Sensor name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #d1d5db",
                }}
              />

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #d1d5db",
                }}
              >
                <option value="temperature">Temperature</option>
                <option value="humidity">Humidity</option>
                <option value="pir">PIR Motion</option>
                <option value="gas">Gas</option>
                <option value="water">Water</option>
                <option value="light">Light</option>
                <option value="vibration">Vibration</option>
              </select>

              <input
                type="text"
                name="value"
                placeholder="Value"
                value={formData.value}
                onChange={handleChange}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #d1d5db",
                }}
              />

              <input
                type="text"
                name="unit"
                placeholder="Unit"
                value={formData.unit}
                onChange={handleChange}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #d1d5db",
                }}
              />

              <select
                name="room_id"
                value={formData.room_id}
                onChange={handleChange}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #d1d5db",
                }}
              >
                <option value="">No room</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={creating}
                style={{
                  padding: "12px 18px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#0f172a",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                {creating ? "Adding..." : "Add Sensor"}
              </button>
            </form>
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2>All Sensors</h2>
            </div>

            {loading && <p>Loading sensors...</p>}
            {error && <p>{error}</p>}

            <div className="sensor-grid">
              {sensors.map(renderSensorCard)}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Sensors;