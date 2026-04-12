import { useNavigate } from "react-router-dom";

function RoomCard({ name, subtitle, activeDevices, status }) {
  const navigate = useNavigate();

  const isGood = status === "Normal" || status === "Secure";

  return (
    <div className="room-card">
      <div className="room-card-top">
        <div>
          <p className="card-title">{name}</p>
          <h3 className="room-card-value">{activeDevices} active</h3>
        </div>

        <span className={`room-status ${isGood ? "room-good" : "room-warning"}`}>
          {status}
        </span>
      </div>

      <p className="card-subtitle room-subtitle">{subtitle}</p>

      <div className="room-card-footer">
        <button
          className="room-btn"
          onClick={() => navigate(`/rooms/${name.replaceAll(" ", "-")}`)}
        >
          View
        </button>
      </div>
    </div>
  );
}

export default RoomCard;