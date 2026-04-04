function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>SmartHome</h2>
      </div>

      <nav className="sidebar-nav">
        <a href="#" className="nav-item active">Overview</a>
        <a href="#" className="nav-item">Rooms</a>
        <a href="#" className="nav-item">Devices</a>
        <a href="#" className="nav-item">Sensors</a>
        <a href="#" className="nav-item">Settings</a>
      </nav>

      <div className="sidebar-footer">
        <p>Capstone Project</p>
      </div>
    </aside>
  );
}

export default Sidebar;