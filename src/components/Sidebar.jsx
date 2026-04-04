import {
  FiHome,
  FiGrid,
  FiCpu,
  FiActivity,
  FiSettings,
  FiMenu,
} from "react-icons/fi";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <h2>SmartHome</h2>
            <p>Control Panel</p>
          </div>

          <button className="sidebar-menu-btn">
            <FiMenu />
          </button>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <span className="nav-icon"><FiHome /></span>
            <span>Overview</span>
          </a>

          <a href="#" className="nav-item">
            <span className="nav-icon"><FiGrid /></span>
            <span>Rooms</span>
          </a>

          <a href="#" className="nav-item">
            <span className="nav-icon"><FiCpu /></span>
            <span>Devices</span>
          </a>

          <a href="#" className="nav-item">
            <span className="nav-icon"><FiActivity /></span>
            <span>Sensors</span>
          </a>

          <a href="#" className="nav-item">
            <span className="nav-icon"><FiSettings /></span>
            <span>Settings</span>
          </a>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="project-badge">Capstone Project</div>
        <p>Smart home monitoring system</p>
      </div>
    </aside>
  );
}

export default Sidebar;