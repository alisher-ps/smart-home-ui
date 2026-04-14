import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DeviceCard from "../components/DeviceCard";
import { getDevices, updateDevice } from "../api/devices";

function Devices() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDevices = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getDevices();
      setDevices(data.devices || []);
    } catch (err) {
      setError(err.message || "Failed to load devices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const toggleDevice = async (device, newStatus) => {
    try {
      setError("");

      await updateDevice(device.id, {
        status: newStatus,
      });

      await fetchDevices();
    } catch (err) {
      setError(err.message || "Failed to update device");
    }
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
                Manage all connected smart home devices.
              </p>
            </div>
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2>All Devices</h2>
            </div>

            {loading && <p>Loading devices...</p>}
            {error && <p>{error}</p>}

            <div className="device-grid">
              {devices.map((device) => (
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
                  onPrimaryClick={() => toggleDevice(device, true)}
                  onSecondaryClick={() => toggleDevice(device, false)}
                  primaryLabel={device.type === "door" ? "Open" : "Turn On"}
                  secondaryLabel={device.type === "door" ? "Close" : "Turn Off"}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Devices;