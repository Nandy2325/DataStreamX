import React, { useMemo, useState } from "react";
import { useGamification } from "../../context/Gamification"; 

const MusicProfile = () => {
  const { stats, leaderboardData, getBadge, userName, setUserName } = useGamification(); 
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const handleSave = () => {
    if (tempName.trim()) {
      setUserName(tempName);
      setIsEditing(false);
    }
  };

  const milestone = useMemo(() => {
    const total = stats.totalSongs;
    if (total < 500) {
      return { next: "Silver Listener", target: 500, remaining: 500 - total, percent: (total / 500) * 100, color: "#d8b4fe" };
    } else if (total < 10500) {
      return { next: "Gold Listener", target: 10500, remaining: 10500 - total, percent: ((total - 500) / (10500 - 500)) * 100, color: "#ffb347" };
    } else if (total < 30500) {
      return { next: "Platinum Legend", target: 30500, remaining: 30500 - total, percent: ((total - 10500) / (30500 - 10500)) * 100, color: "#9b5de5" };
    }
    return { next: "Max Level Reached!", target: total, remaining: 0, percent: 100, color: "#00f2ff" };
  }, [stats.totalSongs]);

  const currentBadge = getBadge(stats.totalSongs);

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        
        {/* POLISHED PROFILE HEADER */}
        <div style={styles.profileCard}>
          <div style={styles.avatarGlow}>
            <div style={styles.avatar}>{userName.charAt(0).toUpperCase()}</div>
          </div>
          <div style={styles.infoSection}>
            {isEditing ? (
              <div style={styles.editGroup}>
                <input 
                  style={styles.input} 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)}
                  autoFocus
                />
                <button onClick={handleSave} style={styles.saveBtn}>Save</button>
              </div>
            ) : (
              <div style={styles.nameHeader}>
                <h2 style={styles.userNameText}>{userName}</h2>
                <button onClick={() => setIsEditing(true)} style={styles.editIcon}>
                   <span role="img" aria-label="edit">✏️</span>
                </button>
              </div>
            )}
            
            <div style={styles.tag}>✨ Music Explorer</div>
            
            <div style={styles.statsRow}>
              <div style={styles.statBox}>
                <span style={styles.statVal}>{stats.daily ? 1 : 0}</span>
                <span style={styles.statLabel}>Today</span>
              </div>
              <div style={styles.statBox}>
                <span style={styles.statVal}>{stats.weeklySongs}</span>
                <span style={styles.statLabel}>Weekly</span>
              </div>
              <div style={styles.statBox}>
                <span style={styles.statVal}>{stats.totalSongs}</span>
                <span style={styles.statLabel}>Total</span>
              </div>
            </div>

            <div style={{ ...styles.badge, borderColor: currentBadge.color, color: currentBadge.color }}>
              {currentBadge.label}
            </div>
          </div>
        </div>

        {/* PROGRESS SECTION */}
        <div style={styles.glassSection}>
          <div style={styles.sectionHeader}>
            <span style={styles.goalText}>Next Goal: <b>{milestone.next}</b></span>
            <span style={{ ...styles.remainingText, color: milestone.color }}>{milestone.remaining.toLocaleString()} more songs</span>
          </div>
          <div style={styles.progressTrack}>
            <div style={{ 
              ...styles.progressFill, 
              width: `${milestone.percent}%`, 
              background: `linear-gradient(90deg, ${milestone.color}88, ${milestone.color})`,
              boxShadow: `0 0 15px ${milestone.color}66`
            }}></div>
          </div>
        </div>

        {/* LEADERBOARD SECTION */}
        <div style={styles.glassSection}>
          <h3 style={styles.leaderTitle}>Global Leaderboard</h3>
          <div style={styles.leaderList}>
            {leaderboardData.map((user, index) => {
              const userBadge = getBadge(user.totalSongs);
              return (
                <div key={index} style={{ 
                  ...styles.leaderItem, 
                  backgroundColor: user.isUser ? 'rgba(155, 93, 229, 0.15)' : 'rgba(255,255,255,0.03)',
                  border: user.isUser ? '1px solid rgba(155, 93, 229, 0.3)' : '1px solid transparent'
                }}>
                  <div style={styles.leaderLeft}>
                    <span style={styles.rankText}>#{index + 1}</span>
                    <span style={user.isUser ? styles.userNameActive : styles.userNameDefault}>
                      {user.name} {user.isUser && "⭐"}
                    </span>
                  </div>
                  <div style={styles.leaderRight}>
                    <span style={{ ...styles.miniBadge, color: userBadge.color }}>{userBadge.label.split(' ')[1]}</span>
                    <span style={styles.songCount}>{user.totalSongs.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  body: { 
    minHeight: "100vh", 
    background: "radial-gradient(circle at top right, #1a0033, #05000a)", 
    color: "#f5e6ff", 
    padding: "40px 20px", 
    fontFamily: "'Inter', sans-serif" 
  },
  container: { maxWidth: "700px", margin: "0 auto", display: 'flex', flexDirection: 'column', gap: '24px' },
  
  // Profile Card
  profileCard: { 
    display: "flex", 
    alignItems: "center", 
    gap: "35px", 
    background: "rgba(255, 255, 255, 0.03)", 
    backdropFilter: "blur(10px)",
    padding: "40px", 
    borderRadius: "32px", 
    border: "1px solid rgba(255, 255, 255, 0.08)"
  },
  avatarGlow: {
    padding: '5px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #9b5de5, #ff00ff)',
    boxShadow: '0 0 30px rgba(155, 93, 229, 0.3)'
  },
  avatar: { 
    width: "110px", 
    height: "110px", 
    borderRadius: "50%", 
    background: "#0a0015", 
    display: "grid", 
    placeItems: "center", 
    fontSize: "48px", 
    fontWeight: "800",
    color: "#fff"
  },
  
  // Text Styles
  userNameText: { fontSize: '2.2rem', margin: 0, letterSpacing: '-0.5px' },
  nameHeader: { display: 'flex', alignItems: 'center', gap: '12px' },
  tag: { color: "#9b5de5", fontSize: "0.95rem", fontWeight: '500', marginTop: '4px' },
  
  // Stats
  statsRow: { display: "flex", gap: "12px", marginTop: "24px" },
  statBox: { 
    background: "rgba(255, 255, 255, 0.05)", 
    padding: "12px 20px", 
    borderRadius: "16px", 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '85px'
  },
  statVal: { fontSize: '1.1rem', fontWeight: 'bold' },
  statLabel: { fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.5, marginTop: '2px' },

  // Edit Mode
  editGroup: { display: 'flex', gap: '10px' },
  input: { 
    background: 'rgba(0,0,0,0.3)', 
    border: '2px solid #9b5de5', 
    borderRadius: '12px', 
    color: '#fff', 
    padding: '8px 16px', 
    fontSize: '1.5rem', 
    outline: 'none',
    width: '240px'
  },
  saveBtn: { 
    background: '#9b5de5', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '12px', 
    padding: '0 20px', 
    cursor: 'pointer', 
    fontWeight: 'bold' 
  },
  editIcon: { background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  // Sections
  glassSection: { 
    background: "rgba(255, 255, 255, 0.02)", 
    backdropFilter: "blur(10px)",
    padding: "28px", 
    borderRadius: "28px", 
    border: "1px solid rgba(255, 255, 255, 0.05)" 
  },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '14px' },
  progressTrack: { width: '100%', height: '10px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: '10px', transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)' },

  // Leaderboard
  leaderTitle: { margin: '0 0 20px 0', fontSize: '1.2rem', color: '#9b5de5', fontWeight: '600' },
  leaderList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  leaderItem: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '16px 20px', 
    borderRadius: '20px'
  },
  leaderLeft: { display: 'flex', alignItems: 'center', gap: '18px' },
  rankText: { opacity: 0.4, fontWeight: 'bold', fontSize: '0.9rem', width: '25px' },
  leaderRight: { display: 'flex', alignItems: 'center', gap: '20px' },
  songCount: { fontWeight: '700', fontSize: '1rem', width: '70px', textAlign: 'right' },
  miniBadge: { fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' },
  
  badge: { 
    marginTop: "24px", 
    padding: "8px 16px", 
    borderRadius: "12px", 
    display: "inline-block", 
    fontSize: '0.75rem', 
    fontWeight: '800', 
    textTransform: 'uppercase', 
    letterSpacing: '1.5px',
    border: '1px solid'
  }
};

export default MusicProfile;