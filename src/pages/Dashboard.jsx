import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatusCard from "../components/StatusCard";
import SensorCard from "../components/SensorCard";
import DeviceCard from "../components/DeviceCard";

function Dashboard() {
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
            <StatusCard title="Home Status" value="Secure" subtitle="All main systems normal" />
            <StatusCard title="Active Devices" value="4" subtitle="Lights, fans and doors running" />
            <StatusCard title="Connection" value="Online" subtitle="ESP32 and dashboard connected" />
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
              <DeviceCard title="Lights" subtitle="Control room lighting" status="ON" />
              <DeviceCard title="Fans" subtitle="Control air flow" status="OFF" />
              <DeviceCard title="Doors" subtitle="Main room doors" status="CLOSED" />
              <DeviceCard title="Garage Door" subtitle="Garage access panel" status="OPEN" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;