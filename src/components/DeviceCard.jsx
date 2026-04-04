function DeviceCard({ title, subtitle, status }) {
  const isActive = status === "ON" || status === "OPEN";

  return (
    <div className="device-card">
      <div className="device-card-top">
        <div>
          <p className="card-title">{title}</p>
          <p className="card-subtitle">{subtitle}</p>
        </div>

        <span className={`device-status ${isActive ? "status-active" : "status-inactive"}`}>
          {status}
        </span>
      </div>

      <div className="device-card-actions">
        <button className="primary-btn">Turn On</button>
        <button className="secondary-btn">Turn Off</button>
      </div>
    </div>
  );
}

export default DeviceCard;