import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeviceCard from "../components/DeviceCard";
import SensorCard from "../components/SensorCard";
import { getRooms, getRoomDevices } from "../api/rooms";
import { updateDevice } from "../api/devices";
import { getSensors, updateSensor } from "../api/sensors";

function RoomDetails() {
  const { roomName } = useParams();
  const navigate = useNavigate();

  const formattedRoomName = useMemo(
    () => String(roomName || "").replaceAll("-", " ").toLowerCase(),
    [roomName]
  );

  const [room, setRoom] = useState(null);
  const [devices, setDevices] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRoomDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const roomsData = await getRooms();
      const matchedRoom = (roomsData.rooms || []).find(
        (item) =>
          item.name.toLowerCase().replaceAll(" ", "-") === roomName ||
          item.name.toLowerCase() === formattedRoomName
      );

      if (!matchedRoom) {
        setError("Room not found");
        setRoom(null);
        setDevices([]);
        setSensors([]);
        return;
      }

      setRoom(matchedRoom);

      const [devicesData, sensorsData] = await Promise.all([
        getRoomDevices(matchedRoom.id),
        getSensors(),
      ]);

      setDevices(devicesData.devices || []);
      setSensors(
        (sensorsData.sensors || []).filter(
          (sensor) => sensor.room_id === matchedRoom.id
        )
      );
    } catch (err) {
      setError(err.message || "Failed to load room details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomDetails();
  }, [roomName]);

  const handleDeviceToggle = async (device, status) => {
    try {
      setError("");
      await updateDevice(device.id, { status });
      await fetchRoomDetails();
    } catch (err) {
      setError(err.message || "Failed to update device");
    }
  };

  const handleSensorUpdate = async (sensor, updates) => {
    try {
      setError("");
      await updateSensor(sensor.id, updates);
      await fetchRoomDetails();
    } catch (err) {
      setError(err.message || "Failed to update sensor");
    }
  };

  const renderRoomSensor = (sensor) => {
    const type = String(sensor.type || "").toLowerCase();
    const value = sensor.value;

    if (type === "temperature") {
      const numericValue = Number(value) || 0;
      return (
        <SensorCard
          key={sensor.id}
          title={sensor.name}
          value={`${numericValue}${sensor.unit || ""}`}
          subtitle="Room temperature"
          alert={numericValue > 30}
          primaryLabel="Increase"
          secondaryLabel="Decrease"
          onPrimaryClick={() =>
            handleSensorUpdate(sensor, { value: String(numericValue + 1) })
          }
          onSecondaryClick={() =>
            handleSensorUpdate(sensor, { value: String(numericValue - 1) })
          }
        />
      );
    }

    if (type === "humidity") {
      const numericValue = Number(value) || 0;
      return (
        <SensorCard
          key={sensor.id}
          title={sensor.name}
          value={`${numericValue}${sensor.unit || ""}`}
          subtitle="Room humidity"
          alert={numericValue > 70}
          primaryLabel="Increase"
          secondaryLabel="Decrease"
          onPrimaryClick={() =>
            handleSensorUpdate(sensor, { value: String(numericValue + 1) })
          }
          onSecondaryClick={() =>
            handleSensorUpdate(sensor, { value: String(numericValue - 1) })
          }
        />
      );
    }

    if (type === "pir" || type === "motion") {
      const detected = value === "detected" || value === "true" || value === true;
      return (
        <SensorCard
          key={sensor.id}
          title={sensor.name}
          value={detected ? "Detected" : "Clear"}
          subtitle="PIR sensor status"
          alert={detected}
          primaryLabel="Detect"
          secondaryLabel="Clear"
          onPrimaryClick={() => handleSensorUpdate(sensor, { value: "detected" })}
          onSecondaryClick={() => handleSensorUpdate(sensor, { value: "clear" })}
        />
      );
    }

    if (type === "gas") {
      const leak = value === "leak" || value === "detected" || value === "true" || value === true;
      return (
        <SensorCard
          key={sensor.id}
          title={sensor.name}
          value={leak ? "Leak Detected" : "Safe"}
          subtitle="Gas sensor status"
          alert={leak}
          primaryLabel="Trigger"
          secondaryLabel="Reset"
          onPrimaryClick={() => handleSensorUpdate(sensor, { value: "leak" })}
          onSecondaryClick={() => handleSensorUpdate(sensor, { value: "safe" })}
        />
      );
    }

    if (type === "water") {
      const detected = value === "detected" || value === "wet" || value === "true" || value === true;
      return (
        <SensorCard
          key={sensor.id}
          title={sensor.name}
          value={detected ? "Detected" : "Dry"}
          subtitle="Water sensor status"
          alert={detected}
          primaryLabel="Trigger"
          secondaryLabel="Reset"
          onPrimaryClick={() => handleSensorUpdate(sensor, { value: "detected" })}
          onSecondaryClick={() => handleSensorUpdate(sensor, { value: "dry" })}
        />
      );
    }

    if (type === "light" || type === "light_level") {
      const dark = String(value).toLowerCase() === "dark";
      return (
        <SensorCard
          key={sensor.id}
          title={sensor.name}
          value={value || "Unknown"}
          subtitle="Current brightness"
          alert={dark}
          primaryLabel="Bright"
          secondaryLabel="Dark"
          onPrimaryClick={() => handleSensorUpdate(sensor, { value: "Bright" })}
          onSecondaryClick={() => handleSensorUpdate(sensor, { value: "Dark" })}
        />
      );
    }

    return (
      <SensorCard
        key={sensor.id}
        title={sensor.name}
        value={value ?? "N/A"}
        subtitle={sensor.type || "Sensor"}
        alert={sensor.status === "warning" || sensor.status === "danger"}
        primaryLabel="Normal"
        secondaryLabel="Warning"
        onPrimaryClick={() => handleSensorUpdate(sensor, { status: "normal" })}
        onSecondaryClick={() => handleSensorUpdate(sensor, { status: "warning" })}
      />
    );
  };

  return (
    <div className="page-container">
      <div className="page-topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div>
          <p className="page-label">ROOM DETAILS</p>
          <h1>{room ? room.name : "Room"}</h1>
        </div>
      </div>

      {loading && <p>Loading room details...</p>}
      {error && <p>{error}</p>}

      <section className="section-block">
        <div className="section-header">
          <h2>Devices</h2>
        </div>

        <div className="device-grid">
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              title={device.name}
              subtitle={device.type}
              status={
                device.type === "door" || device.type === "garage_door"
                  ? device.status
                    ? "OPEN"
                    : "CLOSED"
                  : device.status
                  ? "ON"
                  : "OFF"
              }
              onPrimaryClick={() => handleDeviceToggle(device, true)}
              onSecondaryClick={() => handleDeviceToggle(device, false)}
              primaryLabel={
                device.type === "door" || device.type === "garage_door"
                  ? "Open"
                  : "Turn On"
              }
              secondaryLabel={
                device.type === "door" || device.type === "garage_door"
                  ? "Close"
                  : "Turn Off"
              }
            />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <h2>Sensors</h2>
        </div>

        <div className="sensor-grid">
          {sensors.map(renderRoomSensor)}
        </div>
      </section>
    </div>
  );
}

export default RoomDetails;