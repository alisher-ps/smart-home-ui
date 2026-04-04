import {
  WiThermometer,
  WiHumidity,
} from "react-icons/wi";
import { FiSun, FiAlertTriangle, FiDroplet } from "react-icons/fi";
import { MdSensors } from "react-icons/md";

function SensorCard({ title, value, subtitle, alert = false }) {
  const getIcon = () => {
    if (title === "Temperature") return <WiThermometer />;
    if (title === "Humidity") return <WiHumidity />;
    if (title === "Motion") return <MdSensors />;
    if (title === "Gas") return <FiAlertTriangle />;
    if (title === "Water") return <FiDroplet />;
    if (title === "Light Level") return <FiSun />;
    return <MdSensors />;
  };

  return (
    <div className={`sensor-card ${alert ? "sensor-alert" : ""}`}>
      <div className="sensor-header">
        <div className="sensor-icon">{getIcon()}</div>
        <span className={`sensor-dot ${alert ? "dot-alert" : "dot-normal"}`}></span>
      </div>

      <p className="card-title">{title}</p>
      <h3 className="card-value">{value}</h3>
      <p className="card-subtitle">{subtitle}</p>
    </div>
  );
}

export default SensorCard;