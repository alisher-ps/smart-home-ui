function Topbar() {
  return (
    <header className="topbar">
      <div>
        <p className="topbar-small">Welcome back</p>
        <h3>Smart Home Dashboard</h3>
      </div>

      <div className="topbar-right">
        <div className="topbar-badge">Online</div>
        <div className="topbar-user">Admin</div>
      </div>
    </header>
  );
}

export default Topbar;