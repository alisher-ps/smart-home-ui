import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/rooms/:roomName" element={<RoomDetails />} />
    </Routes>
  );
}

export default App;