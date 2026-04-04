import { useNavigate } from "react-router-dom";

function Rooms() {
  const navigate = useNavigate();

  const rooms = [
    "Kitchen",
    "Bedroom",
    "Living Room",
    "Big Living Room",
    "Garage",
    "Garden / Pool",
  ];

  return (
    <div className="page-container">
      <h1>Rooms</h1>

      <div className="rooms-grid">
        {rooms.map((room) => (
          <div
            key={room}
            className="room-card"
            onClick={() =>
              navigate(`/rooms/${room.replaceAll(" ", "-")}`)
            }
          >
            <h3>{room}</h3>
            <p>Click to open controls</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;