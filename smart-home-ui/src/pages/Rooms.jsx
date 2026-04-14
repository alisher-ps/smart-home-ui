import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import RoomCard from "../components/RoomCard";
import { getRooms } from "../api/rooms";

function Rooms() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    fetchRooms();
  }, []);

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