import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Global User State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("music_user");
    return saved ? JSON.parse(saved) : { 
      name: "User", 
      email: "user@example.com", 
      pfp: null, 
      isLoggedIn: true 
    };
  });

  // Global App Settings
  const [appSettings, setAppSettings] = useState(() => {
    const saved = localStorage.getItem("music_settings");
    return saved ? JSON.parse(saved) : { theme: "dark", language: "en" };
  });

  useEffect(() => {
    localStorage.setItem("music_user", JSON.stringify(user));
    localStorage.setItem("music_settings", JSON.stringify(appSettings));
    document.body.className = appSettings.theme + "-theme";
  }, [user, appSettings]);

  const logout = () => {
    setUser({ ...user, isLoggedIn: false });
    localStorage.removeItem("music_user"); // Or keep it but set isLoggedIn to false
  };

  return (
    <AppContext.Provider value={{ user, setUser, appSettings, setAppSettings, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);