import { FiWind, FiPower, FiUnlock, FiSidebar } from "react-icons/fi";
import { MdOutlineLightbulb } from "react-icons/md";

function DeviceCard({
  title,
  subtitle,
  status,
  onPrimaryClick,
  onSecondaryClick,
  primaryLabel,
  secondaryLabel,
}) {
  const isActive = status === "ON" || status === "OPEN";

  const getIcon = () => {
    if (title === "Lights") return <MdOutlineLightbulb />;
    if (title === "Fans") return <FiWind />;
    if (title === "Doors") return <FiUnlock />;
    if (title === "Garage Door") return <FiSidebar />;
    return <FiPower />;
  };

  return (
    <div className="device-card">
      <div className="device-card-top">
        <div className="device-icon-box">{getIcon()}</div>

        <span className={`device-status ${isActive ? "status-active" : "status-inactive"}`}>
          {status}
        </span>
      </div>

      <div className="device-card-content">
        <p className="card-title">{title}</p>
        <p className="card-subtitle">{subtitle}</p>
      </div>

      <div className="device-card-actions">
        <button className="primary-btn" onClick={onPrimaryClick}>
          {primaryLabel}
        </button>

        <button className="secondary-btn" onClick={onSecondaryClick}>
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}

export default DeviceCard;