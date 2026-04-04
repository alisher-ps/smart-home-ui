function StatusCard({ title, value, subtitle }) {
  return (
    <div className="status-card">
      <p className="card-title">{title}</p>
      <h3 className="card-value">{value}</h3>
      <p className="card-subtitle">{subtitle}</p>
    </div>
  );
}

export default StatusCard;