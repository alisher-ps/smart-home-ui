import { FiBell, FiWifi, FiUser, FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getMe } from "../api/auth";

function Topbar({ openSidebar }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await getMe();
        setUserName(data?.user?.name || "User");
      } catch (error) {
        setUserName("User");
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      navigate("/login");
    }
  };

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

        <button
          type="button"
          className="topbar-user"
          onClick={handleLogout}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          title="Logout"
        >
          <FiUser />
          <span>{userName}</span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;