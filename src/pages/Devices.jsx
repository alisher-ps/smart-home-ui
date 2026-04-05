import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DeviceCard from "../components/DeviceCard";
import { initialDevices } from "../data/dashboardData";

function Devices() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [devices, setDevices] = useState(initialDevices);

  const toggleDevice = (deviceName, action) => {
    setDevices((prev) => ({
      ...prev,
      [deviceName]: action,
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
              <h1>Devices</h1>
              <p className="hero-subtext">
                Manage all connected home devices from one place.
              </p>
            </div>
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2>All Devices</h2>
            </div>

            <div className="device-grid">
              <DeviceCard
                title="Lights"
                subtitle="Control room lighting"
                status={devices.lights ? "ON" : "OFF"}
                onPrimaryClick={() => toggleDevice("lights", true)}
                onSecondaryClick={() => toggleDevice("lights", false)}
                primaryLabel="Turn On"
                secondaryLabel="Turn Off"
              />

              <DeviceCard
                title="Fans"
                subtitle="Control air flow"
                status={devices.fans ? "ON" : "OFF"}
                onPrimaryClick={() => toggleDevice("fans", true)}
                onSecondaryClick={() => toggleDevice("fans", false)}
                primaryLabel="Turn On"
                secondaryLabel="Turn Off"
              />

              <DeviceCard
                title="Doors"
                subtitle="Main room doors"
                status={devices.doors ? "OPEN" : "CLOSED"}
                onPrimaryClick={() => toggleDevice("doors", true)}
                onSecondaryClick={() => toggleDevice("doors", false)}
                primaryLabel="Open"
                secondaryLabel="Close"
              />

              <DeviceCard
                title="Garage Door"
                subtitle="Garage access panel"
                status={devices.garage ? "OPEN" : "CLOSED"}
                onPrimaryClick={() => toggleDevice("garage", true)}
                onSecondaryClick={() => toggleDevice("garage", false)}
                primaryLabel="Open"
                secondaryLabel="Close"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Devices;