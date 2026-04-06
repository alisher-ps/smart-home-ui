import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <div className="main-content">
        <Topbar openSidebar={() => setIsSidebarOpen(true)} />

        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;