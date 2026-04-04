function SensorCard({ title, value, subtitle, alert = false }) {
  return (
    <div className={`sensor-card ${alert ? "sensor-alert" : ""}`}>
      <div className="sensor-top">
        <p className="card-title">{title}</p>
        <span className={`sensor-dot ${alert ? "dot-alert" : "dot-normal"}`}></span>
      </div>

      <h3 className="card-value">{value}</h3>
      <p className="card-subtitle">{subtitle}</p>
    </div>
  );
}

export default SensorCard;