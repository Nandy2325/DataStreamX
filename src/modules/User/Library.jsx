import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import logo from "../../assets/logo.png";
import { useGamification } from "../../context/Gamification";

// Image Imports
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
import blueImg from "../../assets/blue.jpg";
import solImg from "../../assets/sol.jpg";
import vaanImg from "../../assets/vaan.jpg";
import dnaImg from "../../assets/dna.jpg";
import virumanImg from "../../assets/viruman.jpg";
import hjImg from "../../assets/hj.jpg";
import vipImg from "../../assets/vip.jpg";
import ddImg from "../../assets/dd.jpg";
import masterImg from "../../assets/master.jpg";
import enemyImg from "../../assets/enemy.jpg";

// Audio Imports (.mpeg)
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
import blueAudio from "../../assets/audio/RAILIN.mpeg";
import solAudio from "../../assets/audio/SOLL.mpeg";
import vaanAudio from "../../assets/audio/VAAN.mpeg";
import dnaAudio from "../../assets/audio/MEGHAM.mpeg";
import virumanAudio from "../../assets/audio/UN.mpeg";
import hjAudio from "../../assets/audio/ENNAIKONJO.mpeg";
import vipAudio from "../../assets/audio/V.mpeg";
import ddAudio from "../../assets/audio/ROW.mpeg";
import masterAudio from "../../assets/audio/VAATHI.mpeg";
import enemyAudio from "../../assets/audio/TUM.mpeg";

export default function DataStreamX() {
  const navigate = useNavigate(); // Initialize navigate
  const { trackSongPlay } = useGamification();

  const tamilSongs = [
    { id: 1, title: "Leo - Badass", artist: "Anirudh", img: leoImg, src: leoAudio, lyrics: "Mr. Leo Das is a Badass!" },
    { id: 2, title: "Vikram Title", artist: "Anirudh", img: vikramImg, src: vikramAudio, lyrics: "Once upon a time..." },
    { id: 3, title: "Arabic Kuthu", artist: "Anirudh", img: beastImg, src: beastAudio, lyrics: "Halamithi Habibo..." },
    { id: 4, title: "Enjoy Enjaami", artist: "Dhee ft. Arivu", img: eeImg, src: eeAudio, lyrics: "Cuckoo Cuckoo..." },
    { id: 5, title: "Katchi Sera", artist: "Sai Abhyankkar", img: ksImg, src: ksAudio, lyrics: "Katchi sera..." },
    { id: 6, title: "Nizhaliye", artist: "Nani", img: hinannaImg, src: hinannaAudio, lyrics: "Nizhaliye..." },
    { id: 7, title: "Hukum", artist: "Anirudh", img: jailerImg, src: jailerAudio, lyrics: "Hukum Tiger ka Hukum!" },
    { id: 8, title: "Vizhigalil", artist: "Saindhavi", img: vizhigalilImg, src: vizhigalilAudio, lyrics: "Vizhigalil..." },
    { id: 9, title: "Aasa Kooda", artist: "Sai Abhyankkar", img: akImg, src: akAudio, lyrics: "Aasa kooda..." },
    { id: 10, title: "Minnalai", artist: "Hariharan", img: classicImg, src: classicAudio, lyrics: "Minnalai..." },
    { id: 11, title: "Railin Oligal", artist: "Pradeep Kumar", img: blueImg, src: blueAudio, lyrics: "Railin..." },
    { id: 12, title: "Sol", artist: "A.R. Rahman", img: solImg, src: solAudio, lyrics: "Sol..." },
    { id: 13, title: "Vaan", artist: "Shashaa Tirupati", img: vaanImg, src: vaanAudio, lyrics: "Vaan..." },
    { id: 14, title: "Megham", artist: "Dhanush", img: dnaImg, src: dnaAudio, lyrics: "Megham..." },
    { id: 15, title: "Kanja Poovu", artist: "Yuvan Shankar Raja", img: virumanImg, src: virumanAudio, lyrics: "Kanja..." },
    { id: 16, title: "Ennai Konjam", artist: "Harris Jayaraj", img: hjImg, src: hjAudio, lyrics: "Ennai..." },
    { id: 17, title: "Udhungada Sangu", artist: "Anirudh", img: vipImg, src: vipAudio, lyrics: "VIP da!" },
    { id: 18, title: "Rowdy Baby", artist: "Dhanush & Dhee", img: ddImg, src: ddAudio, lyrics: "Rowdy baby..." },
    { id: 19, title: "Vaathi Coming", artist: "Anirudh", img: masterImg, src: masterAudio, lyrics: "Vaathi..." },
    { id: 20, title: "Tum Tum", artist: "Thaman S", img: enemyImg, src: enemyAudio, lyrics: "Tum tum..." }
  ];

  const [selectedSong, setSelectedSong] = useState(tamilSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [showLikedSongs, setShowLikedSongs] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const [songToAdd, setSongToAdd] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const audioRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    fetch("http://localhost:8080/api/songs/liked")
      .then(res => res.json())
      .then(data => setLikedSongs(data))
      .catch(() => console.log("Backend offline, working in local mode."));
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const playSong = (song) => {
    setSelectedSong(song);
    setShowLyrics(false);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = song.src;
      audioRef.current.load();
      audioRef.current.play()
        .then(() => trackSongPlay())
        .catch(err => console.error("Playback error", err));
    }
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].slice(0, 5);
    });
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().then(() => trackSongPlay());
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const currentIndex = tamilSongs.findIndex(s => s.id === selectedSong.id);
    const nextIndex = (currentIndex + 1) % tamilSongs.length;
    playSong(tamilSongs[nextIndex]);
  };

  const playPrev = () => {
    const currentIndex = tamilSongs.findIndex(s => s.id === selectedSong.id);
    const prevIndex = (currentIndex - 1 + tamilSongs.length) % tamilSongs.length;
    playSong(tamilSongs[prevIndex]);
  };

  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
  const handleLoadedMetadata = () => setDuration(audioRef.current.duration);
  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const goHome = () => {
    setShowLikedSongs(false);
    setShowPlaylistModal(false);
    setSelectedPlaylist(null);
    setShowCreatePlaylist(false);
  };

  const toggleLike = (song, e) => {
    e.stopPropagation();
    const alreadyLiked = likedSongs.find(s => s.id === song.id);
    if (alreadyLiked) {
      setLikedSongs(likedSongs.filter(s => s.id !== song.id));
    } else {
      setLikedSongs([...likedSongs, song]);
    }
    fetch(`http://localhost:8080/api/songs/like/${song.id}`, { method: 'POST' })
      .catch(err => console.error("Could not sync like with server", err));
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      setPlaylists([...playlists, { id: Date.now(), name: newPlaylistName, songs: [] }]);
      setNewPlaylistName("");
      setShowCreatePlaylist(false);
    }
  };

  const addToPlaylist = (playlistId) => {
    setPlaylists(playlists.map(p => {
      if (p.id === playlistId && !p.songs.find(s => s.id === songToAdd.id)) {
        return { ...p, songs: [...p.songs, songToAdd] };
      }
      return p;
    }));
    setShowAddToPlaylist(false);
    setSongToAdd(null);
  };

  return (
    <div style={{ 
      padding: isMobile ? "10px" : "25px", 
      background: "linear-gradient(135deg,#0a0a12,#1a1a2e)", 
      minHeight: "100vh", color: "white", fontFamily: "'Poppins', sans-serif" 
    }}>
      
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate} 
        onLoadedMetadata={handleLoadedMetadata} 
        onEnded={playNext} 
      />

      {/* HEADER */}
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", gap: "15px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* Dashboard Back Arrow */}
          <button 
            onClick={() => navigate("/dashboard")} 
            style={backArrowStyle}
            title="Back to Dashboard"
          >
            ←
          </button>
          
          <div onClick={goHome} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <img src={logo} alt="logo" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #a259ff" }} />
            <h2 style={{ color: "#a259ff", margin: 0 }}>DataStreamX</h2>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={goHome} style={btnStyle}>📚 Library</button>
          <button onClick={() => { setShowLikedSongs(true); setShowPlaylistModal(false); }} style={{...btnStyle, background: "rgba(255, 71, 87, 0.2)", borderColor: "#ff4757"}}>❤️ Liked</button>
          <button onClick={() => { setShowPlaylistModal(true); setShowLikedSongs(false); }} style={{...btnStyle, background: "rgba(162, 89, 255, 0.2)", borderColor: "#a259ff"}}>📁 Folders</button>
        </div>
      </div>

      {/* RECENTLY PLAYED */}
      <div style={{ marginBottom: "20px", padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: "15px" }}>
        <h4 style={{ margin: "0 0 10px 0", color: "#888", fontSize: "12px" }}>Recently Played</h4>
        <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "5px" }}>
          {recentlyPlayed.map(song => (
            <div key={song.id} onClick={() => playSong(song)} style={{ textAlign: "center", cursor: "pointer" }}>
              <img src={song.img} alt={song.title} style={{ width: "60px", height: "60px", borderRadius: "10px", objectFit: "cover" }} />
              <p style={{ fontSize: "10px", marginTop: "5px", width: "60px", overflow: "hidden" }}>{song.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "20px" }}>
        <div style={{ flex: 2 }}>
          {showLikedSongs ? (
            <div style={gridStyle(isMobile)}>
              {likedSongs.map(song => (
                <SongCard key={song.id} song={song} isLiked={true} playSong={playSong} toggleLike={toggleLike} setSongToAdd={setSongToAdd} setShowAddToPlaylist={setShowAddToPlaylist} isMobile={isMobile} />
              ))}
            </div>
          ) : showPlaylistModal && !selectedPlaylist ? (
            <div style={{ display: "grid", gap: "10px" }}>
               {!showCreatePlaylist ? (
                 <button onClick={() => setShowCreatePlaylist(true)} style={createBtnStyle}>+ Create New Folder</button>
               ) : (
                 <div style={{ display: "flex", gap: "10px" }}>
                    <input autoFocus placeholder="Folder Name..." value={newPlaylistName} onChange={(e) => setNewPlaylistName(e.target.value)} style={inputStyle} />
                    <button onClick={handleCreatePlaylist} style={saveBtnStyle}>Save</button>
                 </div>
               )}
               {playlists.map(p => (
                 <div key={p.id} onClick={() => setSelectedPlaylist(p)} style={folderItemStyle}>
                   <span>📂 {p.name}</span>
                   <span style={{ color: "#888" }}>{p.songs.length} songs</span>
                 </div>
               ))}
            </div>
          ) : selectedPlaylist ? (
            <div>
              <button onClick={() => setSelectedPlaylist(null)} style={backBtnStyle}>← Back to Folders</button>
              <div style={gridStyle(isMobile)}>
                {selectedPlaylist.songs.map(song => (
                  <SongCard key={song.id} song={song} isLiked={likedSongs.some(s => s.id === song.id)} playSong={playSong} toggleLike={toggleLike} setSongToAdd={setSongToAdd} setShowAddToPlaylist={setShowAddToPlaylist} isMobile={isMobile} />
                ))}
              </div>
            </div>
          ) : (
            <div style={gridStyle(isMobile)}>
              {tamilSongs.map(song => (
                <SongCard key={song.id} song={song} isLiked={likedSongs.some(s => s.id === song.id)} playSong={playSong} toggleLike={toggleLike} setSongToAdd={setSongToAdd} setShowAddToPlaylist={setShowAddToPlaylist} isMobile={isMobile} />
              ))}
            </div>
          )}
        </div>

        {/* PLAYER SIDEBAR */}
        <div style={playerSidebarStyle(isMobile)}>
          <img src={selectedSong.img} alt={selectedSong.title} style={{ width: isMobile ? "50%" : "100%", borderRadius: "15px", marginBottom: "15px" }} />
          <h3>{selectedSong.title}</h3>
          <p style={{ color: "#a259ff", marginBottom: "20px" }}>{selectedSong.artist}</p>
          
          <div style={{ marginBottom: "15px" }}>
            <input 
              type="range" 
              min="0" 
              max={duration || 0} 
              value={currentTime} 
              onChange={handleProgressChange} 
              style={progressBarStyle} 
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#888", marginTop: "5px" }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", justifyContent: "center", alignItems: "center", marginBottom: "15px" }}>
            <button onClick={playPrev} style={navBtnStyle}>⏮</button>
            <button onClick={togglePlayPause} style={mainPlayBtnStyle}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button onClick={playNext} style={navBtnStyle}>⏭</button>
          </div>

          <button onClick={() => setShowLyrics(!showLyrics)} style={lyricsBtnStyle}>Lyrics</button>
          {showLyrics && <div style={lyricsBoxStyle}>{selectedSong.lyrics}</div>}
        </div>
      </div>

      {showAddToPlaylist && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h4 style={{ textAlign: "center" }}>Add to Folder</h4>
            {playlists.map(p => (
              <button key={p.id} onClick={() => addToPlaylist(p.id)} style={playlistOptionStyle}>📂 {p.name}</button>
            ))}
            <button onClick={() => setShowAddToPlaylist(false)} style={cancelBtnStyle}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function SongCard({ song, isLiked, playSong, toggleLike, setSongToAdd, setShowAddToPlaylist, isMobile }) {
  return (
    <div onClick={() => playSong(song)} style={cardStyle}>
      <div style={cardActionsStyle}>
        <button onClick={(e) => toggleLike(song, e)} style={iconBtnStyle}>{isLiked ? "❤️" : "🤍"}</button>
        <button onClick={(e) => { e.stopPropagation(); setSongToAdd(song); setShowAddToPlaylist(true); }} style={iconBtnStyle}>➕</button>
      </div>
      <img src={song.img} alt={song.title} style={{ width: "100%", height: isMobile ? "120px" : "150px", objectFit: "cover", borderRadius: "10px" }} />
      <h5 style={cardTitleStyle}>{song.title}</h5>
    </div>
  );
}

// Styles 
const backArrowStyle = {
  background: "rgba(162, 89, 255, 0.1)",
  border: "1px solid #a259ff",
  color: "#a259ff",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  cursor: "pointer",
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.3s"
};

const btnStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "8px 15px", borderRadius: "20px", color: "white", cursor: "pointer", fontSize: "12px" };
const mainPlayBtnStyle = { background: "#a259ff", border: "none", color: "white", width: "50px", height: "50px", borderRadius: "50%", cursor: "pointer", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center" };
const navBtnStyle = { background: "none", border: "none", color: "white", fontSize: "24px", cursor: "pointer" };
const progressBarStyle = { width: "100%", height: "4px", accentColor: "#a259ff", cursor: "pointer" };
const gridStyle = (isMobile) => ({ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" });
const cardStyle = { background: "#1e1e1e", padding: "10px", borderRadius: "15px", position: "relative", cursor: "pointer" };
const cardActionsStyle = { position: "absolute", top: "5px", right: "5px", zIndex: 2, display: "flex", flexDirection: "column", gap: "5px" };
const iconBtnStyle = { border: "none", background: "rgba(0,0,0,0.5)", borderRadius: "50%", width: "28px", height: "28px", color: "white", cursor: "pointer" };
const cardTitleStyle = { margin: "8px 0 0 0", fontSize: "13px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
const playerSidebarStyle = (isMobile) => ({ flex: 1, background: "#161625", padding: "20px", borderRadius: "20px", height: "fit-content", position: isMobile ? "relative" : "sticky", top: "20px", border: "1px solid rgba(162, 89, 255, 0.3)", textAlign: "center" });
const lyricsBtnStyle = { background: "none", border: "1px solid #444", color: "#888", padding: "5px 15px", borderRadius: "15px", fontSize: "12px", cursor: "pointer" };
const lyricsBoxStyle = { marginTop: "15px", fontSize: "12px", color: "#ccc", textAlign: "left", maxHeight: "150px", overflowY: "auto", padding: "10px", background: "#000", borderRadius: "10px" };
const modalOverlayStyle = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" };
const modalContentStyle = { background: "#1e1e1e", padding: "20px", borderRadius: "15px", width: "300px" };
const playlistOptionStyle = { width: "100%", padding: "12px", background: "#a259ff", color: "white", border: "none", borderRadius: "10px", marginBottom: "8px", cursor: "pointer" };
const cancelBtnStyle = { width: "100%", background: "none", border: "none", color: "#888", cursor: "pointer" };
const createBtnStyle = { background: "#00d2d3", color: "white", padding: "12px", borderRadius: "10px", border: "none", fontWeight: "bold", cursor: "pointer" };
const inputStyle = { flex: 1, padding: "10px", borderRadius: "8px", background: "#000", color: "#fff", border: "1px solid #a259ff" };
const saveBtnStyle = { background: "#a259ff", color: "white", padding: "0 15px", borderRadius: "8px", border: "none", cursor: "pointer" };
const folderItemStyle = { background: "#1e1e1e", padding: "15px", borderRadius: "10px", display: "flex", justifyContent: "space-between", cursor: "pointer", border: "1px solid rgba(255,255,255,0.05)" };
const backBtnStyle = { background: "none", color: "#a259ff", border: "none", marginBottom: "15px", cursor: "pointer" };