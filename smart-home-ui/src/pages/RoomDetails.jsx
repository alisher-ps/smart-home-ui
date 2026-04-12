import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeviceCard from "../components/DeviceCard";
import SensorCard from "../components/SensorCard";
import { roomDetailsData } from "../data/roomDetailsData";

function RoomDetails() {
  const { roomName } = useParams();
  const navigate = useNavigate();

  const formattedRoomName = roomName.replaceAll("-", " ");

  const roomConfig = useMemo(() => {
    return (
      roomDetailsData[formattedRoomName] || {
        devices: {},
        sensors: {},
      }
    );
  }, [formattedRoomName]);

  const [devices, setDevices] = useState(roomConfig.devices);
  const [sensors, setSensors] = useState(roomConfig.sensors);

  const toggleDevice = (deviceName, action) => {
    setDevices((prev) => ({
      ...prev,
      [deviceName]: action,
    }));
  };

  const updateSensor = (sensorName, value) => {
    setSensors((prev) => ({
      ...prev,
      [sensorName]: value,
    }));
  };

  return (
    <div className="page-container">
      <div className="page-topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div>
          <p className="page-label">ROOM DETAILS</p>
          <h1>{formattedRoomName}</h1>
        </div>
      </div>

      <section className="section-block">
        <div className="section-header">
          <h2>Devices</h2>
        </div>

        <div className="device-grid">
          {"lights" in devices && (
            <DeviceCard
              title="Lights"
              subtitle="Room lighting"
              status={devices.lights ? "ON" : "OFF"}
              onPrimaryClick={() => toggleDevice("lights", true)}
              onSecondaryClick={() => toggleDevice("lights", false)}
              primaryLabel="Turn On"
              secondaryLabel="Turn Off"
            />
          )}

          {"fan" in devices && (
            <DeviceCard
              title="Fans"
              subtitle="Air control"
              status={devices.fan ? "ON" : "OFF"}
              onPrimaryClick={() => toggleDevice("fan", true)}
              onSecondaryClick={() => toggleDevice("fan", false)}
              primaryLabel="Turn On"
              secondaryLabel="Turn Off"
            />
          )}

          {"door" in devices && (
            <DeviceCard
              title="Doors"
              subtitle="Room door control"
              status={devices.door ? "OPEN" : "CLOSED"}
              onPrimaryClick={() => toggleDevice("door", true)}
              onSecondaryClick={() => toggleDevice("door", false)}
              primaryLabel="Open"
              secondaryLabel="Close"
            />
          )}

          {"garageDoor" in devices && (
            <DeviceCard
              title="Garage Door"
              subtitle="Garage access control"
              status={devices.garageDoor ? "OPEN" : "CLOSED"}
              onPrimaryClick={() => toggleDevice("garageDoor", true)}
              onSecondaryClick={() => toggleDevice("garageDoor", false)}
              primaryLabel="Open"
              secondaryLabel="Close"
            />
          )}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2>Sensors</h2>
        </div>

        <div className="sensor-grid">
          {"temperature" in sensors && (
            <SensorCard
              title="Temperature"
              value={`${sensors.temperature}°C`}
              subtitle="Room temperature"
              alert={sensors.temperature > 30}
              primaryLabel="Increase"
              secondaryLabel="Decrease"
              onPrimaryClick={() =>
                updateSensor("temperature", sensors.temperature + 1)
              }
              onSecondaryClick={() =>
                updateSensor("temperature", sensors.temperature - 1)
              }
            />
          )}

          {"humidity" in sensors && (
            <SensorCard
              title="Humidity"
              value={`${sensors.humidity}%`}
              subtitle="Room humidity"
              alert={sensors.humidity > 70}
              primaryLabel="Increase"
              secondaryLabel="Decrease"
              onPrimaryClick={() =>
                updateSensor("humidity", sensors.humidity + 1)
              }
              onSecondaryClick={() =>
                updateSensor("humidity", sensors.humidity - 1)
              }
            />
          )}

          {"motion" in sensors && (
            <SensorCard
              title="Motion"
              value={sensors.motion ? "Detected" : "Clear"}
              subtitle="PIR sensor status"
              alert={sensors.motion}
              primaryLabel="Detect"
              secondaryLabel="Clear"
              onPrimaryClick={() => updateSensor("motion", true)}
              onSecondaryClick={() => updateSensor("motion", false)}
            />
          )}

          {"gas" in sensors && (
            <SensorCard
              title="Gas"
              value={sensors.gas ? "Leak Detected" : "Safe"}
              subtitle="Gas sensor status"
              alert={sensors.gas}
              primaryLabel="Trigger"
              secondaryLabel="Reset"
              onPrimaryClick={() => updateSensor("gas", true)}
              onSecondaryClick={() => updateSensor("gas", false)}
            />
          )}

          {"water" in sensors && (
            <SensorCard
              title="Water"
              value={sensors.water ? "Detected" : "Dry"}
              subtitle="Water sensor status"
              alert={sensors.water}
              primaryLabel="Trigger"
              secondaryLabel="Reset"
              onPrimaryClick={() => updateSensor("water", true)}
              onSecondaryClick={() => updateSensor("water", false)}
            />
          )}

          {"lightLevel" in sensors && (
            <SensorCard
              title="Light Level"
              value={sensors.lightLevel}
              subtitle="Current brightness"
              alert={sensors.lightLevel === "Dark"}
              primaryLabel="Bright"
              secondaryLabel="Dark"
              onPrimaryClick={() => updateSensor("lightLevel", "Bright")}
              onSecondaryClick={() => updateSensor("lightLevel", "Dark")}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default RoomDetails;