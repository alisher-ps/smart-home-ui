import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SensorCard from "../components/SensorCard";
import { initialSensors } from "../data/dashboardData";

function Sensors() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sensors, setSensors] = useState(initialSensors);

  const updateSensor = (sensorName, value) => {
    setSensors((prev) => ({
      ...prev,
      [sensorName]: value,
    }));
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

            <div className="sensor-grid">
              <SensorCard
                title="Temperature"
                value={`${sensors.temperature}°C`}
                subtitle="Living room average"
                alert={sensors.temperature > 30}
                primaryLabel="Increase"
                secondaryLabel="Decrease"
                onPrimaryClick={() =>
                  updateSensor("temperature", sensors.temperature + 1)
                }
                onSecondaryClick={() =>
                  updateSensor("temperature", sensors.temperature - 1)
                }
              />

              <SensorCard
                title="Humidity"
                value={`${sensors.humidity}%`}
                subtitle="Normal indoor level"
                alert={sensors.humidity > 70}
                primaryLabel="Increase"
                secondaryLabel="Decrease"
                onPrimaryClick={() =>
                  updateSensor("humidity", sensors.humidity + 1)
                }
                onSecondaryClick={() =>
                  updateSensor("humidity", sensors.humidity - 1)
                }
              />

              <SensorCard
                title="Motion"
                value={sensors.motion ? "Detected" : "Clear"}
                subtitle="PIR sensor status"
                alert={sensors.motion}
                primaryLabel="Detect"
                secondaryLabel="Clear"
                onPrimaryClick={() => updateSensor("motion", true)}
                onSecondaryClick={() => updateSensor("motion", false)}
              />

              <SensorCard
                title="Gas"
                value={sensors.gas ? "Leak Detected" : "Safe"}
                subtitle="Gas sensor monitoring"
                alert={sensors.gas}
                primaryLabel="Trigger"
                secondaryLabel="Reset"
                onPrimaryClick={() => updateSensor("gas", true)}
                onSecondaryClick={() => updateSensor("gas", false)}
              />

              <SensorCard
                title="Water"
                value={sensors.water ? "Detected" : "Dry"}
                subtitle="Water sensor monitoring"
                alert={sensors.water}
                primaryLabel="Trigger"
                secondaryLabel="Reset"
                onPrimaryClick={() => updateSensor("water", true)}
                onSecondaryClick={() => updateSensor("water", false)}
              />

              <SensorCard
                title="Light Level"
                value={sensors.lightLevel}
                subtitle="Current room brightness"
                alert={sensors.lightLevel === "Dark"}
                primaryLabel="Bright"
                secondaryLabel="Dark"
                onPrimaryClick={() => updateSensor("lightLevel", "Bright")}
                onSecondaryClick={() => updateSensor("lightLevel", "Dark")}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Sensors;