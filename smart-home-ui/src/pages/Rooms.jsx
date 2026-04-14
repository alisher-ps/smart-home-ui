import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import RoomCard from "../components/RoomCard";
import { getRooms, createRoom } from "../api/rooms";

function Rooms() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "living_room",
  });

  const [creating, setCreating] = useState(false);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getRooms();
      setRooms(data.rooms || []);
    } catch (err) {
      setError(err.message || "Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();

    try {
      setCreating(true);
      setError("");

      await createRoom(formData);

      setFormData({
        name: "",
        type: "living_room",
      });

      await fetchRooms();
    } catch (err) {
      setError(err.message || "Failed to create room");
    } finally {
      setCreating(false);
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
              <h1>Rooms</h1>
              <p className="hero-subtext">
                Open each room to monitor its devices and sensors.
              </p>
            </div>
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2>Add New Room</h2>
            </div>

            <form
              onSubmit={handleCreateRoom}
              style={{
                display: "grid",
                gap: "12px",
                gridTemplateColumns: "1fr 1fr auto",
                marginBottom: "24px",
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Room name"
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
                <option value="living_room">Living Room</option>
                <option value="kitchen">Kitchen</option>
                <option value="bedroom">Bedroom</option>
                <option value="bathroom">Bathroom</option>
                <option value="garage">Garage</option>
                <option value="garden">Garden</option>
                <option value="office">Office</option>
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
                {creating ? "Adding..." : "Add Room"}
              </button>
            </form>
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2>All Rooms</h2>
            </div>

            {loading && <p>Loading rooms...</p>}
            {error && <p>{error}</p>}

            <div className="rooms-grid">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  name={room.name}
                  subtitle={room.type}
                  activeDevices={0}
                  status="Connected"
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Rooms;