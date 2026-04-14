import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import DeviceCard from "../components/DeviceCard";
import { getDevices, updateDevice, createDevice } from "../api/devices";
import { getRooms } from "../api/rooms";

function Devices() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "light",
    status: false,
    room_id: "",
    hardware_key: "",
  });

  const fetchDevices = async () => {
    const data = await getDevices();
    setDevices(data.devices || []);
  };

  const fetchRooms = async () => {
    const data = await getRooms();
    setRooms(data.rooms || []);
  };

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError("");
      await Promise.all([fetchDevices(), fetchRooms()]);
    } catch (err) {
      setError(err.message || "Failed to load devices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "room_id"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleCreateDevice = async (e) => {
    e.preventDefault();

    try {
      setCreating(true);
      setError("");

      const payload = {
        name: formData.name,
        type: formData.type,
        status: formData.status,
        room_id: formData.room_id === "" ? null : formData.room_id,
      };

      await createDevice(payload);

      setFormData({
        name: "",
        type: "light",
        status: false,
        room_id: "",
        hardware_key: "",
      });

      await fetchDevices();
    } catch (err) {
      setError(err.message || "Failed to create device");
    } finally {
      setCreating(false);
    }
  };

  const toggleDevice = async (device, newStatus) => {
    try {
      setError("");
      await updateDevice(device.id, { status: newStatus });
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
              <h2>Add New Device</h2>
            </div>

            <form
              onSubmit={handleCreateDevice}
              style={{
                display: "grid",
                gap: "12px",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                marginBottom: "24px",
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Device name"
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
                <option value="light">Light</option>
                <option value="fan">Fan</option>
                <option value="door">Door</option>
                <option value="garage_door">Garage Door</option>
                <option value="ac">AC</option>
                <option value="alarm">Alarm</option>
                <option value="camera">Camera</option>
              </select>

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

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #d1d5db",
                  background: "#fff",
                }}
              >
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                />
                Start enabled
              </label>

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
                {creating ? "Adding..." : "Add Device"}
              </button>
            </form>
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
                  subtitle={
                    device.room_id
                      ? `${device.type} • Room ID ${device.room_id}`
                      : device.type
                  }
                  status={
                    device.type === "door" || device.type === "garage_door"
                      ? device.status
                        ? "OPEN"
                        : "CLOSED"
                      : device.status
                      ? "ON"
                      : "OFF"
                  }
                  onPrimaryClick={() => toggleDevice(device, true)}
                  onSecondaryClick={() => toggleDevice(device, false)}
                  primaryLabel={
                    device.type === "door" || device.type === "garage_door"
                      ? "Open"
                      : "Turn On"
                  }
                  secondaryLabel={
                    device.type === "door" || device.type === "garage_door"
                      ? "Close"
                      : "Turn Off"
                  }
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