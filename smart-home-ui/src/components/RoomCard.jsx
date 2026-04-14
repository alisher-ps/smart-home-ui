import { Link } from "react-router-dom";

function RoomCard({ id, name, subtitle, activeDevices, status }) {
  const roomSlug = String(name || "")
    .toLowerCase()
    .trim()
    .replaceAll(" ", "-");

  return (
    <Link
      to={`/rooms/${roomSlug}`}
      className="room-card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="room-card-top">
        <div>
          <h3>{name}</h3>
          <p>{subtitle}</p>
        </div>

        <span className="room-status-badge">{status}</span>
      </div>

      <div className="room-card-bottom">
        <p>{activeDevices} active devices</p>
        <span>Open room</span>
      </div>
    </Link>
  );
}

export default RoomCard;