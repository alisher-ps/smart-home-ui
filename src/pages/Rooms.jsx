import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import RoomCard from "../components/RoomCard";
import { rooms } from "../data/roomsData";

function Rooms() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                Open each room to monitor sensors and control connected devices.
              </p>
            </div>
          </section>

          <section className="section-block">
            <div className="section-header">
              <h2>All Rooms</h2>
            </div>

            <div className="rooms-grid">
              {rooms.map((room) => (
                <RoomCard
                  key={room.name}
                  name={room.name}
                  subtitle={room.subtitle}
                  activeDevices={room.activeDevices}
                  status={room.status}
                  onView={() =>
                    navigate(`/rooms/${room.name.replaceAll(" ", "-")}`)
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

export default Rooms;