import {
  FiHome,
  FiGrid,
  FiCpu,
  FiActivity,
  FiSettings,
  FiX,
  FiShield,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, closeSidebar }) {
  const getNavClass = ({ isActive }) =>
    isActive ? "nav-item active" : "nav-item";

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "show-overlay" : ""}`}
        onClick={closeSidebar}
      ></div>

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div>
          <div className="sidebar-top">
            <NavLink to="/" className="sidebar-logo" onClick={closeSidebar}>
              <h2>SmartHome</h2>
              <p>Control Panel</p>
            </NavLink>

            <button className="sidebar-close-btn" onClick={closeSidebar}>
              <FiX />
            </button>
          </div>

          <nav className="sidebar-nav">
            <NavLink to="/" className={getNavClass} onClick={closeSidebar}>
              <FiHome /> Overview
            </NavLink>

            <NavLink to="/rooms" className={getNavClass} onClick={closeSidebar}>
              <FiGrid /> Rooms
            </NavLink>

            <NavLink to="/devices" className={getNavClass} onClick={closeSidebar}>
              <FiCpu /> Devices
            </NavLink>

            <NavLink to="/sensors" className={getNavClass} onClick={closeSidebar}>
              <FiActivity /> Sensors
            </NavLink>

            <NavLink to="/security" className={getNavClass} onClick={closeSidebar}>
              <FiShield /> Security
            </NavLink>

            <NavLink to="/settings" className={getNavClass} onClick={closeSidebar}>
              <FiSettings /> Settings
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="project-badge">Capstone Project</div>
          <p>Smart home monitoring system</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;