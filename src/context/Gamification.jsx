import React, { createContext, useContext, useState, useEffect } from "react";

const GamificationContext = createContext();

const getBadge = (count) => {
  if (count >= 30500) return { label: "💎 Platinum", color: "#9b5de5" };
  if (count >= 10500) return { label: "🥇 Gold", color: "#ffb347" };
  if (count >= 500) return { label: "🥈 Silver", color: "#d8b4fe" };
  return { label: "🎵 Rookie", color: "#888" };
};

export const GamificationProvider = ({ children }) => {
  // 1. Initialize userName from localStorage or a default
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("gamificationUserName") || "Music Explorer";
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("musicStats");
    return saved ? JSON.parse(saved) : {
      daily: false,
      weeklySongs: 0,
      monthlySongs: 0,
      totalSongs: 0,
      streak: 0,
      lastListenedDate: null
    };
  });

  // 2. Save name changes to localStorage whenever they happen
  useEffect(() => {
    localStorage.setItem("gamificationUserName", userName);
  }, [userName]);

  const leaderboardData = [
    { name: userName, totalSongs: stats.totalSongs, isUser: true }, // Use dynamic name here
    { name: "Mike", totalSongs: 42000, isUser: false },
    { name: "Nandy", totalSongs: 15000, isUser: false },
    { name: "Elona", totalSongs: 800, isUser: false },
    { name: "Rahul", totalSongs: 120, isUser: false },
  ].sort((a, b) => b.totalSongs - a.totalSongs);

  useEffect(() => {
    localStorage.setItem("musicStats", JSON.stringify(stats));
  }, [stats]);

  const trackSongPlay = () => {
    const today = new Date().toDateString();
    setStats((prev) => ({
      ...prev,
      daily: true,
      lastListenedDate: today,
      totalSongs: prev.totalSongs + 1,
      weeklySongs: prev.weeklySongs + 1,
      monthlySongs: prev.monthlySongs + 1,
    }));
  };

  return (
    <GamificationContext.Provider value={{ stats, trackSongPlay, leaderboardData, getBadge, userName, setUserName }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => useContext(GamificationContext);
export default GamificationContext;