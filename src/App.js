import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext'; 
// 1. IMPORT THE PROVIDER CORRECTLY
import { GamificationProvider } from './context/Gamification'; 

import Login from './modules/User/Login.jsx';
import SignUp from './modules/User/SignUp.jsx';
import Dashboard from './modules/User/Dashboard.jsx';
import StudyMode from './modules/User/StudyMode.jsx';
import Admin from './modules/User/Admin.jsx';
import Lib from './modules/User/Library.jsx';
import Notification from './modules/User/Notification.jsx';
import TicketBooking from './modules/User/TicketBooking.jsx';
import Customization from './modules/User/Customization.jsx';
import Settings from './modules/User/Settings.jsx';
import MusicProfile from './modules/User/MusicProfile.jsx'; // 2. RENAME THIS TO AVOID CONFUSION
import ProgressUnderGamification from './modules/User/ProgressUnderGamification.jsx';
import Home from './modules/User/Home.jsx';
import UnifiedSearch from './modules/User/UnifiedSearch.jsx';

export default function App() {
  return (
    /* 3. WRAP EVERYTHING IN THE PROVIDER */
    <AppProvider>
    <GamificationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/StudyMode" element={<StudyMode />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Library" element={<Lib />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/TicketBooking" element={<TicketBooking />} />
          <Route path="/Customization" element={<Customization />} />
          <Route path="/Settings" element={<Settings />} />
          
          {/* 4. POINT THE ROUTE TO YOUR COMPONENT, NOT THE CONTEXT */}
          <Route path="/Gamification" element={<MusicProfile />} /> 
          
          <Route path="/ProgressUnderGamification" element={<ProgressUnderGamification />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/UnifiedSearch" element={<UnifiedSearch/>} />
        </Routes>
      </Router>
    </GamificationProvider>
    </AppProvider>
  );
}