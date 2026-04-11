import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Sensors from "./pages/Sensors";
import Rooms from "./pages/Rooms";
import Settings from "./pages/Settings";
import RoomDetails from "./pages/RoomDetails";
import Security from "./pages/Security";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/devices" element={<Devices />} />
      <Route path="/sensors" element={<Sensors />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/rooms/:roomName" element={<RoomDetails />} />
      <Route path="/security" element={<Security />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;