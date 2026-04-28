import React from "react";
import { useNavigate } from "react-router-dom";
// Corrected path: Up from User -> Up from modules -> Into context
import { useApp } from "../../context/AppContext"; 

const Settings = () => {
  const { user, setUser, appSettings, setAppSettings, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out of DataStreamX?")) {
      logout();
      navigate("/login"); 
    }
  };

  const updateProfile = (key, value) => {
    setUser(prev => ({ ...prev, [key]: value }));
  };

  const toggleTheme = () => {
    setAppSettings(prev => ({ ...prev, theme: prev.theme === "dark" ? "light" : "dark" }));
  };

  return (
    <div style={styles.container}>
      {/* --- BACK NAVIGATION --- */}
      <div style={styles.headerRow}>
        <button 
          onClick={() => navigate("/dashboard")} 
          style={styles.backBtn}
          onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
        >
          ←
        </button>
        <h1 style={styles.title}>Settings</h1>
      </div>

      {/* USER PROFILE SECTION */}
      <div style={styles.section}>
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>
            {user.pfp ? (
              <img src={user.pfp} style={styles.img} alt="profile" />
            ) : (
              user.name ? user.name[0].toUpperCase() : "U"
            )}
          </div>
          <div>
            <h2 style={styles.userName}>{user.name}</h2>
            <p style={styles.userEmail}>{user.email}</p>
          </div>
        </div>
        <button 
          style={styles.editBtn} 
          onClick={() => {
            const n = prompt("Change Name:", user.name);
            if(n) updateProfile("name", n);
          }}
        >
          Edit Profile
        </button>
      </div>

      {/* APP PREFERENCES */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>App Settings</h3>
        
        <div style={styles.row}>
          <span>Dark Mode</span>
          <input 
            type="checkbox" 
            checked={appSettings.theme === "dark"} 
            onChange={toggleTheme} 
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div style={styles.row}>
          <span>Language</span>
          <select 
            value={appSettings.language} 
            onChange={(e) => setAppSettings(prev => ({...prev, language: e.target.value}))}
            style={styles.select}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>

      {/* DANGER ZONE */}
      <div style={styles.section}>
        <button style={styles.logoutBtn} onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '600px', margin: '0 auto', padding: '40px 20px', color: '#fff', fontFamily: 'Inter, sans-serif' },
  headerRow: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' },
  backBtn: { 
    background: 'rgba(255, 255, 255, 0.05)', 
    border: '1px solid #282828', 
    color: '#fff', 
    width: '45px', 
    height: '45px', 
    borderRadius: '50%', 
    cursor: 'pointer', 
    fontSize: '1.2rem', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    transition: '0.2s',
    backdropFilter: 'blur(10px)'
  },
  title: { fontSize: '2rem', margin: 0, fontWeight: 'bold' },
  section: { background: '#121212', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: '1px solid #282828' },
  sectionTitle: { fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', marginBottom: '15px', letterSpacing: '1px' },
  profileHeader: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' },
  avatar: { width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #9b5de5, #ff00ff)', display: 'grid', placeItems: 'center', fontSize: '1.8rem', fontWeight: 'bold' },
  img: { width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' },
  userName: { margin: 0, fontSize: '1.4rem', fontWeight: '700' },
  userEmail: { margin: 0, fontSize: '0.9rem', color: '#b3b3b3' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #222' },
  editBtn: { background: '#fff', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' },
  logoutBtn: { width: '100%', background: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '14px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' },
  select: { background: '#282828', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }
};

export default Settings;