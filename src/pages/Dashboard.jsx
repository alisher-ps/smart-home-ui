import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatusCard from "../components/StatusCard";
import SensorCard from "../components/SensorCard";
import DeviceCard from "../components/DeviceCard";
import RoomCard from "../components/RoomCard";

function Dashboard() {
  const [devices, setDevices] = useState({
    lights: true,
    fans: false,
    doors: false,
    garage: true,
  });

  const toggleDevice = (deviceName, action) => {
    setDevices((prev) => ({
      ...prev,
      [deviceName]: action,
    }));
  };

  const activeDevicesCount = Object.values(devices).filter(Boolean).length;

  const rooms = [
    {
      name: "Kitchen",
      subtitle: "Lights and water sensor connected",
      activeDevices: 2,
      status: "Normal",
    },
    {
      name: "Bedroom",
      subtitle: "Fan and light available",
      activeDevices: 1,
      status: "Normal",
    },
    {
      name: "Living Room",
      subtitle: "Main temperature and motion sensors",
      activeDevices: 3,
      status: "Secure",
    },
    {
      name: "Big Living Room",
      subtitle: "Central lights and climate control",
      activeDevices: 2,
      status: "Normal",
    },
    {
      name: "Garage",
      subtitle: "Garage door and light monitoring",
      activeDevices: 1,
      status: "Secure",
    },
    {
      name: "Garden / Pool",
      subtitle: "Outdoor lighting and water area",
      activeDevices: 1,
      status: "Attention",
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="content-area">
          <section className="hero-section">
            <div className="hero-text">
              <p className="hero-label">SMART HOME PANEL</p>
              <h1>Overview</h1>
              <p className="hero-subtext">
                Monitor your home sensors and control your main devices.
              </p>
            </div>
          </section>

          <section className="status-grid">
            <StatusCard
              title="Home Status"
              value="Secure"
              subtitle="All main systems normal"
            />
            <StatusCard
              title="Active Devices"
              value={activeDevicesCount}
              subtitle="Currently running devices"
            />
            <StatusCard
              title="Connection"
              value="Online"
              subtitle="ESP32 and dashboard connected"
            />
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2>Sensors Overview</h2>
            </div>

            <div className="sensor-grid">
              <SensorCard title="Temperature" value="24°C" subtitle="Living room average" />
              <SensorCard title="Humidity" value="48%" subtitle="Normal indoor level" />
              <SensorCard title="Motion" value="Detected" subtitle="PIR sensor active" alert />
              <SensorCard title="Gas" value="Safe" subtitle="No gas leakage detected" />
              <SensorCard title="Water" value="Dry" subtitle="No water detected" />
              <SensorCard title="Light Level" value="Bright" subtitle="Room light is sufficient" />
            </div>
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2>Device Control</h2>
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

          <section className="section-block">
            <div className="section-header">
              <h2>Rooms</h2>
            </div>

            <div className="rooms-grid">
              {rooms.map((room) => (
                <RoomCard
                  key={room.name}
                  name={room.name}
                  subtitle={room.subtitle}
                  activeDevices={room.activeDevices}
                  status={room.status}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;