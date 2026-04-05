import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Devices from "./pages/Devices";
import Sensors from "./pages/Sensors";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/rooms/:roomName" element={<RoomDetails />} />
      <Route path="/devices" element={<Devices />} />
      <Route path="/sensors" element={<Sensors />} />
    </Routes>
  );
}

export default App;