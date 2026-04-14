import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SensorCard from "../components/SensorCard";
import { getSensors, updateSensor } from "../api/sensors";

function Sensors() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSensors = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getSensors();
      setSensors(data.sensors || []);
    } catch (err) {
      setError(err.message || "Failed to load sensors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensors();
  }, []);

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
    const type = (sensor.type || "").toLowerCase();
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
      const detected = value === "detected" || value === "true" || value === true;
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
      const leak = value === "leak" || value === "detected" || value === "true" || value === true;
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
      const detected = value === "detected" || value === "wet" || value === "true" || value === true;
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