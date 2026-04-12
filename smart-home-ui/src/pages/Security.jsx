import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SensorCard from "../components/SensorCard";
import DeviceCard from "../components/DeviceCard";
import { initialSensors, initialDevices } from "../data/dashboardData";

function Security() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [sensors, setSensors] = useState(initialSensors);
  const [devices, setDevices] = useState(initialDevices);

  const updateSensor = (sensorName, value) => {
    setSensors((prev) => ({
      ...prev,
      [sensorName]: value,
    }));
  };

  const toggleDevice = (deviceName, action) => {
    setDevices((prev) => ({
      ...prev,
      [deviceName]: action,
    }));
  };

  const securityScore = [
    !sensors.motion,
    !sensors.gas,
    !sensors.water,
    !devices.doors,
    !devices.garage,
  ].filter(Boolean).length;

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
              <h1>Security</h1>
              <p className="hero-subtext">
                Monitor safety sensors and entry points.
              </p>
            </div>
          </section>

          <section className="status-grid">
            <div className="status-card">
              <p className="card-title">Security Score</p>
              <h3 className="card-value">{securityScore}/5</h3>
              <p className="card-subtitle">
                Based on sensors and entry status
              </p>
            </div>
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2>Security Sensors</h2>
            </div>

            <div className="sensor-grid">
              <SensorCard
                title="Motion"
                value={sensors.motion ? "Detected" : "Clear"}
                subtitle="PIR monitoring"
                alert={sensors.motion}
                primaryLabel="Trigger"
                secondaryLabel="Reset"
                onPrimaryClick={() => updateSensor("motion", true)}
                onSecondaryClick={() => updateSensor("motion", false)}
              />

              <SensorCard
                title="Gas Leak"
                value={sensors.gas ? "Leak Detected" : "Safe"}
                subtitle="Gas sensor monitoring"
                alert={sensors.gas}
                primaryLabel="Trigger"
                secondaryLabel="Reset"
                onPrimaryClick={() => updateSensor("gas", true)}
                onSecondaryClick={() => updateSensor("gas", false)}
              />

              <SensorCard
                title="Water Leak"
                value={sensors.water ? "Detected" : "Dry"}
                subtitle="Water sensor monitoring"
                alert={sensors.water}
                primaryLabel="Trigger"
                secondaryLabel="Reset"
                onPrimaryClick={() => updateSensor("water", true)}
                onSecondaryClick={() => updateSensor("water", false)}
              />
            </div>
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2>Entry Points</h2>
            </div>

            <div className="device-grid">
              <DeviceCard
                title="Main Doors"
                subtitle="Door access control"
                status={devices.doors ? "OPEN" : "CLOSED"}
                primaryLabel="Open"
                secondaryLabel="Close"
                onPrimaryClick={() => toggleDevice("doors", true)}
                onSecondaryClick={() => toggleDevice("doors", false)}
              />

              <DeviceCard
                title="Garage Door"
                subtitle="Garage access control"
                status={devices.garage ? "OPEN" : "CLOSED"}
                primaryLabel="Open"
                secondaryLabel="Close"
                onPrimaryClick={() => toggleDevice("garage", true)}
                onSecondaryClick={() => toggleDevice("garage", false)}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Security;