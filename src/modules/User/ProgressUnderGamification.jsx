import React, { useEffect, useState } from "react";

// ✅ Keep requirements outside
const baseRequirements = {
  silver: 500,
  gold: 1500,
  platinum: 3000,
};

const MusicProgress = () => {
  const [songsListened] = useState(2000);
  const [badgeData, setBadgeData] = useState({
    badge: "None",
    nextTarget: 0,
    cycle: 1,
    progress: 0,
  });

  useEffect(() => {
    const getCycleRequirements = (cycle) => ({
      silver: baseRequirements.silver * cycle,
      gold: baseRequirements.gold * cycle,
      platinum: baseRequirements.platinum * cycle,
    });

    const getCurrentBadge = (songs) => {
      let cycle = 1;
      let badge = "None";
      let nextTarget = 0;

      while (true) {
        const req = getCycleRequirements(cycle);

        if (songs < req.silver) {
          badge = "None";
          nextTarget = req.silver;
          break;
        } else if (songs < req.gold) {
          badge = `Silver`;
          nextTarget = req.gold;
          break;
        } else if (songs < req.platinum) {
          badge = `Gold`;
          nextTarget = req.platinum;
          break;
        } else {
          badge = `Platinum`;
          cycle++;
          continue;
        }
      }

      return { badge, nextTarget, cycle };
    };

    const { badge, nextTarget, cycle } = getCurrentBadge(songsListened);
    const progress = Math.min((songsListened / nextTarget) * 100, 100);

    setBadgeData({ badge, nextTarget, cycle, progress });
  }, [songsListened]);

  const toRoman = (num) => {
    const map = {
      M: 1000, CM: 900, D: 500, CD: 400,
      C: 100, XC: 90, L: 50, XL: 40,
      X: 10, IX: 9, V: 5, IV: 4, I: 1,
    };
    let str = "";
    for (let i in map) {
      while (num >= map[i]) {
        str += i;
        num -= map[i];
      }
    }
    return str;
  };

  const remaining = badgeData.nextTarget - songsListened;

  return (
    <div style={styles.body}>
      <h1 style={styles.heading}>🎵 Music Profile Progress</h1>

      <div style={styles.container}>
        <div style={styles.progressText}>
          You've listened to {songsListened} songs — {remaining} more until{" "}
          {badgeData.badge}
        </div>

        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${badgeData.progress}%`,
            }}
          />
        </div>

        <div
          style={{
            ...styles.badge,
            ...styles[badgeData.badge?.toLowerCase()],
            ...styles[`cycle${badgeData.cycle}`],
          }}
        >
          {badgeData.badge} {toRoman(badgeData.cycle)}
        </div>
      </div>
    </div>
  );
};

export default MusicProgress;

/* ================= STYLES ================= */
const styles = {
  body: {
    minHeight: "100vh",
    background: "#0a0015", // dark purple background
    color: "#f5e6ff",      // lavender text
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#9b5de5", // neon purple heading
    textShadow: "0 0 12px #ff00ff",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    background: "rgba(40,0,60,.9)", // deep purple card
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(155,93,229,.6)", // purple glow
  },
  progressText: {
    marginBottom: "10px",
    fontSize: "16px",
  },
  progressBar: {
    width: "100%",
    height: "20px",
    background: "#220033", // dark purple bar
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "20px",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #9b5de5, #ff00ff)", // neon purple gradient
    boxShadow: "0 0 12px #9b5de5",
    transition: "width 0.5s ease",
  },
  badge: {
    display: "inline-block",
    padding: "10px 20px",
    marginTop: "10px",
    borderRadius: "12px",
    fontWeight: "bold",
    position: "relative",
    color: "#fff",
  },
  silver: {
    border: "2px solid #d8b4fe",
    boxShadow: "0 0 10px #a78bfa",
  },
  gold: {
    border: "2px solid #ffd36a",
    boxShadow: "0 0 20px #ffb300",
  },
  platinum: {
    border: "2px solid #9b5de5",
    boxShadow: "0 0 20px #9b5de5, 0 0 40px #ff00ff", // neon purple glow
  },
  cycle1: { filter: "brightness(1)" },
  cycle2: { filter: "brightness(1.3)" },
  cycle3: { filter: "brightness(1.6)" },
};