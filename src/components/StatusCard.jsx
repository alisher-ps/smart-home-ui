function StatusCard({ title, value, subtitle }) {
  return (
    <div className="status-card">
      <div className="status-card-line"></div>
      <p className="card-title">{title}</p>
      <h3 className="card-value">{value}</h3>
      <p className="card-subtitle">{subtitle}</p>
    </div>
  );
}

export default StatusCard;