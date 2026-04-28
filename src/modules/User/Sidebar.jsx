import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom"; // Added useLocation

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState({ libraryCount: 0, likedCount: 0 });
  const location = useLocation(); // To highlight the active page

  useEffect(() => {
    fetch("http://localhost:8080/api/library")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          libraryCount: data.length,
          likedCount: data.filter(track => track.isLiked).length || 0 
        });
      })
      .catch((err) => console.error("Sidebar sync error:", err));
  }, []);

  // --- STYLES ---
  const sidebarStyle = {
    width: collapsed ? "80px" : "260px",
    background: "#0A0A0A",
    padding: collapsed ? "15px 10px" : "24px",
    borderRight: "1px solid #1A1A1A",
    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "sticky",
    top: 0,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000
  };

  const navItem = (path, icon, label, badge = null) => {
    const isActive = location.pathname === path;
    
    return (
      <li style={{ margin: "5px 0", listStyle: "none" }}>
        <Link to={path} style={{
          display: "flex",
          alignItems: "center",
          padding: "12px",
          borderRadius: "10px",
          color: isActive ? "#fff" : "#a259ff",
          background: isActive ? "rgba(162, 89, 255, 0.15)" : "transparent",
          textDecoration: "none",
          transition: "0.2s",
          fontWeight: isActive ? "600" : "400"
        }}>
          <span style={{ fontSize: "20px" }}>{icon}</span>
          {!collapsed && <span style={{ marginLeft: "15px", flex: 1 }}>{label}</span>}
          {!collapsed && badge !== null && (
            <span style={badgeStyle}>{badge}</span>
          )}
        </Link>
      </li>
    );
  };

  const badgeStyle = {
    background: "#a259ff",
    padding: "2px 8px",
    borderRadius: "20px",
    fontSize: "10px",
    color: "#fff",
    fontWeight: "bold"
  };

  return (
    <aside style={sidebarStyle}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", marginBottom: "30px" }}>
        {!collapsed && <span style={{ color: "#fff", fontWeight: "bold", letterSpacing: "1px" }}>DATASTREAM</span>}
        <button
          style={{ background: "none", border: "none", color: "#a259ff", cursor: "pointer", fontSize: "22px" }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "→" : "☰"}
        </button>
      </div>

      <img 
        src={logo} 
        alt="Logo" 
        style={{
          width: collapsed ? "40px" : "70px",
          height: collapsed ? "40px" : "70px",
          borderRadius: "50%",
          margin: "0 auto 30px auto",
          display: "block",
          border: "2px solid #a259ff",
          padding: "3px"
        }} 
      />

      <nav style={{ flex: 1 }}>
        <ul style={{ padding: 0, margin: 0 }}>
          {navItem("/Home", "🏠", "Home")}
          {navItem("/library", "📚", "Library", stats.libraryCount)}
          {navItem("/studymode", "🎧", "Study Mode")}
          {navItem("/Gamification", "🎮", "Gamification")}
          {navItem("/TicketBooking", "🎟️", "Tickets")}
          {navItem("/Customization", "🖼️", "Custom📷", stats.likedCount)}
        </ul>
      </nav>

      <div style={{ borderTop: "1px solid #1A1A1A", paddingTop: "20px" }}>
        {navItem("/Settings", "⚙️", "Settings")}
      </div>
    </aside>
  );
}