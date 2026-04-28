import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added for navigation
import logo from "../../assets/logo.png";
import { useGamification } from "../../context/Gamification";

// --- IMAGE IMPORTS ---
import leoImg from "../../assets/leo.jpg";
import vikramImg from "../../assets/vikram.jpg";
import beastImg from "../../assets/beast.jpg";
import eeImg from "../../assets/ee.jpg";
import ksImg from "../../assets/ks.jpg";
import hinannaImg from "../../assets/hinanna.jpg";
import jailerImg from "../../assets/jailer.jpg";
import vizhigalilImg from "../../assets/vizhigalil.jpg";
import akImg from "../../assets/ak.jpg";
import classicImg from "../../assets/classic.jpg";

// --- AUDIO IMPORTS ---
import leoAudio from "../../assets/audio/LEOBA.mpeg";
import vikramAudio from "../../assets/audio/VIK.mpeg";
import beastAudio from "../../assets/audio/ARABIC.mpeg";
import eeAudio from "../../assets/audio/ENJOY.mpeg";
import ksAudio from "../../assets/audio/KATCHI.mpeg";
import hinannaAudio from "../../assets/audio/NIZHALIYE.mpeg";
import jailerAudio from "../../assets/audio/HUKUM.mpeg";
import vizhigalilAudio from "../../assets/audio/VIZHIGALILI.mpeg";
import akAudio from "../../assets/audio/AASA.mpeg";
import classicAudio from "../../assets/audio/MINNALAI.mpeg";

const localLibrary = [
  { id: 1, title: "Leo - Badass", artist: "Anirudh", img: leoImg, src: leoAudio },
  { id: 2, title: "Vikram Title", artist: "Anirudh", img: vikramImg, src: vikramAudio },
  { id: 3, title: "Arabic Kuthu", artist: "Anirudh", img: beastImg, src: beastAudio },
  { id: 4, title: "Enjoy Enjaami", artist: "Dhee ft. Arivu", img: eeImg, src: eeAudio },
  { id: 5, title: "Katchi Sera", artist: "Sai Abhyankkar", img: ksImg, src: ksAudio },
  { id: 7, title: "Hukum", artist: "Anirudh", img: jailerImg, src: jailerAudio },
  { id: 8, title: "Vizhigalil", artist: "Saindhavi", img: vizhigalilImg, src: vizhigalilAudio },
  { id: 9, title: "Aasa Kooda", artist: "Sai Abhyankkar", img: akImg, src: akAudio },
  { id: 10, title: "Minnalai", artist: "Hariharan", img: classicImg, src: classicAudio },
  { id: 6, title: "Nizhaliye", artist: "Nani", img: hinannaImg, src: hinannaAudio }
];

const presets = [
  { name: "Cyber City", url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f" },
  { name: "Mars", url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9" },
  { name: "Forest", url: "https://images.unsplash.com/photo-1511497584788-876760111969" },
  { name: "Neon Alley", url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455" }
];

const colors = ["#0077b6", "#ff7f50", "#6a0dad", "#ff00ff", "#f3a1c3", "#d00000", "#a259ff", "#333333", "#00ff00", "#ff0000"];

export default function Customization() {
  const navigate = useNavigate(); // ✅ Initialize Navigate
  const { trackSongPlay } = useGamification(); 
  const [songs] = useState(localLibrary); 
  const [bgImage, setBgImage] = useState("");
  const [accent, setAccent] = useState("#ff7f50");
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.src;
      audioRef.current.load();
      if (isPlaying) {
        setTimeout(() => {
          audioRef.current.play().catch(err => console.error("Playback blocked:", err));
        }, 50);
      }
    }
  }, [currentSong]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) setShowSidebar(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const savedBg = localStorage.getItem("userBackground");
    const savedAccent = localStorage.getItem("userAccent");
    if (savedBg) setBgImage(savedBg);
    if (savedAccent) {
      setAccent(savedAccent);
      document.body.style.setProperty('--accent-color', savedAccent);
    }
  }, []);

  const changeSong = (direction) => {
    const currentIndex = songs.findIndex(s => s.id === currentSong?.id);
    let nextIndex = currentIndex === -1 ? 0 : currentIndex;

    if (direction === "next") {
      nextIndex = (nextIndex + 1) % songs.length;
    } else {
      nextIndex = (nextIndex - 1 + songs.length) % songs.length;
    }

    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const selectSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (isMobile) setShowSidebar(false);
  };

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Play error", err));
      trackSongPlay(); 
    }
    setIsPlaying(!isPlaying);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setBgImage(e.target.result);
      localStorage.setItem("userBackground", e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const applyAccent = (color) => {
    setAccent(color);
    localStorage.setItem("userAccent", color);
    document.body.style.setProperty('--accent-color', color);
  };

  const navBtnStyle = {
    background: "rgba(0,0,0,0.4)",
    border: `1px solid ${accent}66`,
    width: isMobile ? "40px" : "50px",
    height: isMobile ? "40px" : "50px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: isMobile ? "16px" : "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: accent,
    transition: "all 0.3s ease",
    backdropFilter: "blur(8px)",
    zIndex: 10
  };

  return (
    <div style={{
      display: "flex", flexDirection: isMobile ? "column" : "row",
      width: "100%", minHeight: "100vh",
      backgroundImage: bgImage ? `url(${bgImage})` : "none",
      backgroundColor: "#000", backgroundSize: "cover", backgroundPosition: "center",
      transition: "0.5s", overflow: "hidden"
    }}>

      <audio 
        ref={audioRef} 
        preload="auto"
        onPlay={() => trackSongPlay()} 
        onEnded={() => {
          trackSongPlay(); 
          changeSong("next");
        }} 
      />

      {/* --- HEADER --- */}
      <div style={{ position: "fixed", top: isMobile ? "15px" : "20px", left: isMobile ? "15px" : "20px", zIndex: "1005", display: "flex", alignItems: "center", gap: "12px" }}>
        {/* ✅ BACK ARROW ADDED */}
        <button 
          onClick={() => navigate("/dashboard")} 
          style={{ 
            background: "rgba(0,0,0,0.6)", 
            border: `1px solid ${accent}44`, 
            borderRadius: "50%", 
            width: "40px", 
            height: "40px", 
            color: accent, 
            cursor: "pointer", 
            fontSize: "18px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            backdropFilter: "blur(5px)",
            transition: "0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.background = accent + "22"}
          onMouseOut={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.6)"}
        >
          ←
        </button>

        <img src={logo} alt="Logo" style={{ width: isMobile ? "40px" : "50px", height: isMobile ? "40px" : "50px", borderRadius: "50%", border: `2px solid ${accent}`, background: "rgba(0,0,0,0.8)", padding: "3px" }} />
        
        <button onClick={() => setShowSidebar(!showSidebar)} style={{ background: accent, border: "none", borderRadius: "50%", width: "35px", height: "35px", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.3)", transform: !isMobile && showSidebar ? `translateX(275px)` : "translateX(0)", transition: "transform 0.3s ease" }}>
          {showSidebar ? "✕" : "☰"}
        </button>
      </div>

      {/* --- SIDEBAR --- */}
      <div style={{
        width: isMobile ? "100%" : "340px", background: isMobile ? "rgba(10, 10, 10, 0.98)" : "rgba(10, 10, 10, 0.85)",
        backdropFilter: "blur(15px)", padding: "20px", paddingTop: isMobile ? "70px" : "90px",
        color: "white", overflowY: "auto", height: isMobile ? "70vh" : "100vh",
        borderRight: !isMobile ? `1px solid ${accent}44` : "none", position: "fixed",
        bottom: isMobile ? 0 : "auto", left: 0, zIndex: "1004",
        transform: showSidebar ? "translate(0)" : (isMobile ? "translateY(100%)" : "translateX(-100%)"),
        transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)", borderTopLeftRadius: isMobile ? "25px" : "0", borderTopRightRadius: isMobile ? "25px" : "0",
      }}>
        <h2 style={{ color: accent, textAlign: "center", fontSize: "1.2rem", marginBottom: "20px" }}>THEME SETTINGS</h2>
        
        <label style={{ padding: "12px", border: `2px dashed ${accent}`, borderRadius: "10px", display: "block", textAlign: "center", cursor: "pointer", background: "rgba(255,255,255,0.05)", marginBottom: "20px" }}>
          Upload Wallpaper
          <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
        </label>

        <h4 style={{ color: accent, fontSize: "14px", marginBottom: "10px" }}>Wallpapers</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "20px" }}>
          {presets.map((bg, i) => (
            <div key={i} onClick={() => { setBgImage(bg.url); localStorage.setItem("userBackground", bg.url); }}
              style={{ height: "45px", borderRadius: "8px", backgroundImage: `url(${bg.url})`, backgroundSize: "cover", cursor: "pointer", border: bgImage === bg.url ? `2px solid white` : "none" }} />
          ))}
        </div>

        <h4 style={{ color: accent, fontSize: "14px", marginBottom: "10px" }}>Accent</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
          {colors.map((c, i) => (
            <div key={i} onClick={() => applyAccent(c)}
              style={{ width: "28px", height: "28px", background: c, borderRadius: "50%", cursor: "pointer", border: accent === c ? "2px solid white" : "none" }} />
          ))}
        </div>

        <h4 style={{ color: accent, fontSize: "14px", marginBottom: "10px" }}>Preview Tracks</h4>
        {songs.map(song => (
          <div key={song.id} onClick={() => selectSong(song)}
            style={{
              display: "flex", alignItems: "center", background: currentSong?.id === song.id ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)",
              padding: "10px", borderRadius: "10px", marginBottom: "8px", cursor: "pointer", borderLeft: currentSong?.id === song.id ? `3px solid ${accent}` : "none"
            }}>
            <img src={song.img} alt="" style={{ width: "35px", height: "35px", borderRadius: "4px", marginRight: "10px" }} />
            <div style={{ fontSize: "12px" }}>{song.title}</div>
          </div>
        ))}
      </div>

      {/* --- PREVIEW AREA --- */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", marginLeft: (!isMobile && showSidebar) ? "340px" : "0", transition: "0.3s ease" }}>
        {currentSong ? (
          <div style={{ textAlign: "center", width: "100%", maxWidth: "600px" }}>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? "15px" : "40px" }}>
              
              <button onClick={() => changeSong("prev")} style={navBtnStyle}>❮</button>

              <div style={{ position: "relative", display: "inline-block" }}>
                  <img src={currentSong.img} alt="" style={{ width: isMobile ? "220px" : "320px", borderRadius: "24px", boxShadow: `0 25px 50px rgba(0,0,0,0.7)`, border: `2px solid ${accent}` }} />
                  
                  <div onClick={togglePlayPause} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "rgba(0,0,0,0.1)", borderRadius: "24px" }}>
                      <div style={{ background: accent, width: "65px", height: "65px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", color: "white", boxShadow: `0 0 20px ${accent}66` }}>
                          {isPlaying ? "⏸" : "▶"}
                      </div>
                  </div>
              </div>

              <button onClick={() => changeSong("next")} style={navBtnStyle}>❯</button>
            </div>

            <h1 style={{ fontSize: isMobile ? "1.8rem" : "2.8rem", marginTop: "25px", color: "white", fontWeight: "bold", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{currentSong.title}</h1>
            <p style={{ color: accent, fontSize: "1.3rem", fontWeight: "600", marginTop: "5px" }}>{currentSong.artist}</p>
          </div>
        ) : (
          <h3 style={{ color: "rgba(255,255,255,0.3)" }}>Select a song to begin</h3>
        )}
      </div>

      {isMobile && showSidebar && (
        <div onClick={() => setShowSidebar(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: "1003" }} />
      )}
    </div>
  );
}