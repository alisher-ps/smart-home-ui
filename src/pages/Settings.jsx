import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Settings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(true);

  return (
    <div className="dashboard-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <div className="main-content">
        <Topbar openSidebar={() => setIsSidebarOpen(true)} />

        <div className="content-area">
          <section className="hero-section">
            <div className="hero-text">
              <p className="hero-label">SMART HOME PANEL</p>
              <h1>Settings</h1>
              <p className="hero-subtext">
                Manage project information and dashboard mode.
              </p>
            </div>
          </section>

          <section className="settings-grid">
            <div className="settings-card">
              <p className="card-title">Project Name</p>
              <h3 className="card-value small-value">Smart Home Capstone</h3>
              <p className="card-subtitle">
                IoT-based home monitoring and control system.
              </p>
            </div>

            <div className="settings-card">
              <p className="card-title">System Status</p>
              <h3 className="card-value small-value">Online</h3>
              <p className="card-subtitle">
                Dashboard is ready for ESP32 integration.
              </p>
            </div>

            <div className="settings-card">
              <p className="card-title">Current Mode</p>
              <h3 className="card-value small-value">
                {demoMode ? "Demo Mode" : "Live Mode"}
              </h3>
              <p className="card-subtitle">
                Switch between UI testing and live integration mode.
              </p>

              <div className="settings-toggle-row">
                <button className="primary-btn" onClick={() => setDemoMode(true)}>
                  Demo
                </button>
                <button className="secondary-btn" onClick={() => setDemoMode(false)}>
                  Live
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Settings;