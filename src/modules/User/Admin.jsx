import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Admin.css";

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const fetchRealUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/users");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("CRITICAL_SYSTEM_ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const terminateUser = async (id) => {
    if (window.confirm(`CONFIRM_DE_AUTHORIZATION_OF_UID_#${id}?`)) {
      try {
        await fetch(`http://localhost:8080/users/${id}`, { method: "DELETE" });
        fetchRealUsers(); // Refresh the grid
      } catch (err) {
        alert("TERMINATION_FAILED: Check database uplink.");
      }
    }
  };

  useEffect(() => {
    fetchRealUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => navigate("/dashboard")} className="admin-back-btn">←</button>
            <img src={logo} alt="Logo" className="admin-logo" />
          </div>
          <h2>DataStream<span className="brand-purple">X</span></h2>
          <p className="version-tag">SYSTEM_ADMIN_V1.2</p>
        </div>

        <ul className="admin-nav">
          <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>👥 User Registry</li>
          <li className={activeTab === "analytics" ? "active" : ""} onClick={() => setActiveTab("analytics")}>📊 System Metrics</li>
        </ul>
        
        <button onClick={() => navigate("/login")} className="admin-logout">TERMINATE_SESSION</button>
      </aside>

      <main className="admin-main">
        <header className="main-header">
           <div className={`status-pill ${loading ? 'syncing' : 'online'}`}>
             {loading ? 'SYNCING...' : 'SYSTEM_ONLINE'}
           </div>
           <button onClick={fetchRealUsers} className="refresh-btn">FORCE_RELOAD</button>
        </header>

        {activeTab === "users" && (
          <div className="tab-content">
            <div className="content-header">
               <h3>USER_MANAGEMENT_PROTOCOL</h3>
               <div className="badge">{filteredUsers.length} RECORDS_DETECTED</div>
            </div>

            <input
              type="text"
              placeholder="Querying active uplink records..."
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setPage(1);}}
              className="admin-search-input"
            />

            <table className="admin-table">
              <thead>
                <tr>
                  <th>UID</th>
                  <th>IDENTITY</th>
                  <th>UPLINK_EMAIL</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="tech-id">#{user.id}</td>
                    <td className="name-cell">{user.name || "UNNAMED_ENTITY"}</td>
                    <td className="email-cell">{user.email}</td>
                    <td>
                       <button onClick={() => terminateUser(user.id)} className="deauth-btn">DE_AUTH</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="admin-pagination">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>PREV</button>
              <span>NODE_{page}/{totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>NEXT</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}