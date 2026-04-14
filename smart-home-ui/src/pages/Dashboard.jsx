import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatusCard from "../components/StatusCard";
import SensorCard from "../components/SensorCard";
import DeviceCard from "../components/DeviceCard";
import RoomCard from "../components/RoomCard";
import { getRooms } from "../api/rooms";
import { getDevices, updateDevice } from "../api/devices";
import { getSensors, updateSensor } from "../api/sensors";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError("");

      const [roomsData, devicesData, sensorsData] = await Promise.all([
        getRooms(),
        getDevices(),
        getSensors(),
      ]);

      setRooms(roomsData.rooms || []);
      setDevices(devicesData.devices || []);
      setSensors(sensorsData.sensors || []);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const activeDevicesCount = devices.filter((device) => device.status).length;

  const safeSensorsCount = sensors.filter((sensor) => {
    const type = String(sensor.type || "").toLowerCase();
    const value = String(sensor.value || "").toLowerCase();

    if (type === "pir" || type === "motion") return value !== "detected";
    if (type === "gas") return value !== "leak" && value !== "detected";
    if (type === "water") return value !== "detected" && value !== "wet";

    return sensor.status !== "warning" && sensor.status !== "danger";
  }).length;

  const homeStatus = useMemo(() => {
    const hasDanger = sensors.some(
      (sensor) =>
        sensor.status === "danger" ||
        String(sensor.value || "").toLowerCase() === "leak"
    );

    return hasDanger ? "Alert" : "Secure";
  }, [sensors]);

  const featuredSensors = sensors.slice(0, 6);
  const featuredDevices = devices.slice(0, 4);

  const handleDeviceToggle = async (device, status) => {
    try {
      setError("");
      await updateDevice(device.id, { status });
      await fetchAllData();
    } catch (err) {
      setError(err.message || "Failed to update device");
    }
  };

  const handleSensorQuickUpdate = async (sensor, updates) => {
    try {
      setError("");
      await updateSensor(sensor.id, updates);
      await fetchAllData();
    } catch (err) {
      setError(err.message || "Failed to update sensor");
    }
  };

  const renderDashboardSensor = (sensor) => {
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
            handleSensorQuickUpdate(sensor, { value: String(numericValue + 1) })
          }
          onSecondaryClick={() =>
            handleSensorQuickUpdate(sensor, { value: String(numericValue - 1) })
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
            handleSensorQuickUpdate(sensor, { value: String(numericValue + 1) })
          }
          onSecondaryClick={() =>
            handleSensorQuickUpdate(sensor, { value: String(numericValue - 1) })
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
          onPrimaryClick={() => handleSensorQuickUpdate(sensor, { value: "detected" })}
          onSecondaryClick={() => handleSensorQuickUpdate(sensor, { value: "clear" })}
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
          onPrimaryClick={() => handleSensorQuickUpdate(sensor, { value: "leak" })}
          onSecondaryClick={() => handleSensorQuickUpdate(sensor, { value: "safe" })}
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
          onPrimaryClick={() => handleSensorQuickUpdate(sensor, { value: "detected" })}
          onSecondaryClick={() => handleSensorQuickUpdate(sensor, { value: "dry" })}
        />
      );
    }

    return (
      <SensorCard
        key={sensor.id}
        title={sensor.name}
        value={sensor.value ?? "N/A"}
        subtitle={sensor.type || "Sensor"}
        alert={sensor.status === "warning" || sensor.status === "danger"}
        primaryLabel="Normal"
        secondaryLabel="Warning"
        onPrimaryClick={() => handleSensorQuickUpdate(sensor, { status: "normal" })}
        onSecondaryClick={() => handleSensorQuickUpdate(sensor, { status: "warning" })}
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
              <h1>Overview</h1>
              <p className="hero-subtext">
                Monitor your home sensors and control your main devices.
              </p>
            </div>
          </section>

          {loading && <p>Loading dashboard...</p>}
          {error && <p>{error}</p>}

          <section className="status-grid">
            <StatusCard
              title="Home Status"
              value={homeStatus}
              subtitle="System-wide live status"
            />
            <StatusCard
              title="Active Devices"
              value={activeDevicesCount}
              subtitle="Currently running devices"
            />
            <StatusCard
              title="Safe Sensors"
              value={`${safeSensorsCount}/${sensors.length || 0}`}
              subtitle="Sensors currently normal"
            />
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2>Sensors Overview</h2>
            </div>

            <div className="sensor-grid">
              {featuredSensors.map(renderDashboardSensor)}
            </div>
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2>Device Control</h2>
            </div>

            <div className="device-grid">
              {featuredDevices.map((device) => (
                <DeviceCard
                  key={device.id}
                  title={device.name}
                  subtitle={device.type}
                  status={
                    device.type === "door"
                      ? device.status
                        ? "OPEN"
                        : "CLOSED"
                      : device.status
                      ? "ON"
                      : "OFF"
                  }
                  onPrimaryClick={() => handleDeviceToggle(device, true)}
                  onSecondaryClick={() => handleDeviceToggle(device, false)}
                  primaryLabel={device.type === "door" ? "Open" : "Turn On"}
                  secondaryLabel={device.type === "door" ? "Close" : "Turn Off"}
                />
              ))}
            </div>
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2>Rooms</h2>
            </div>

            <div className="rooms-grid">
              {rooms.map((room) => {
                const roomDeviceCount = devices.filter(
                  (device) => device.room_id === room.id && device.status
                ).length;

                return (
                  <RoomCard
                    key={room.id}
                    name={room.name}
                    subtitle={room.type}
                    activeDevices={roomDeviceCount}
                    status="Connected"
                  />
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;