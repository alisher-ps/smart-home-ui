import { FiBell, FiWifi, FiUser, FiMenu } from "react-icons/fi";

function Topbar({ openSidebar }) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu-btn" onClick={openSidebar}>
          <FiMenu />
        </button>

        <div>
          <p className="topbar-small">{today}</p>
          <h3>Smart Home Dashboard</h3>
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-icon-box">
          <FiWifi />
        </div>

        <div className="topbar-icon-box">
          <FiBell />
        </div>

        <div className="topbar-user">
          <FiUser />
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;