import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom"; 
import "./StudyMode.css";
import logo from "../../assets/logo.png";

const PIXABAY_API_KEY = "YOUR_PIXABAY_API_KEY_HERE"; 

const playlists = {
  focus: [
    { title: "Lo-fi Chillhop 1", artist: "DataStream Artist", src: "/audio/lo-fi-1.mp3", duration: "04:20" },
    { title: "Lo-fi Chillhop 2", artist: "DataStream Artist", src: "/audio/slow-lo-fi.mp3", duration: "03:15" },
    { title: "Lo-fi Chillhop 3", artist: "DataStream Artist", src: "/audio/vintage-lo-fi.mp3", duration: "05:10" },
  ],
  relax: [
    { title: "Relaxing 1", artist: "Nature Synth", src: "/audio/relax1.mp3", duration: "06:00" },
    { title: "Relaxing 2", artist: "Nature Synth", src: "/audio/relax2.mp3", duration: "04:45" },
    { title: "Relaxing 3", artist: "Nature Synth", src: "/audio/relax3.mp3", duration: "03:50" },
  ],
};

const quotes = [
  "SYSTEM_STATUS: LIMITLESS. KEEP PUSHING.",
  "FOCUS IS THE ONLY CURRENCY THAT MATTERS.",
  "EXECUTION TRUMPS TALENT. GET TO WORK.",
  "NOISE REDUCED. OUTPUT MAXIMIZED.",
  "DREAMS DON'T WORK UNLESS YOU DO.",
  "CONSISTENCY IS THE ULTIMATE SUPERPOWER.",
  "STAY HUNGRY. STAY FOOLISH. STAY FOCUSED."
];

export default function StudyMode() {
  const navigate = useNavigate(); 
  const [mode, setMode] = useState("focus");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bgImage, setBgImage] = useState("");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [onBreak, setOnBreak] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  // Audio State
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const currentTrack = playlists[mode][currentIndex];

  const fetchBackground = useCallback(async (currentMode) => {
    const query = currentMode === "focus" ? "lofi study aesthetic" : "nature relaxing forest";
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=20`
      );
      const data = await response.json();
      if (data.hits.length > 0) {
        const randomImg = data.hits[Math.floor(Math.random() * data.hits.length)].largeImageURL;
        setBgImage(randomImg);
      }
    } catch (error) {
      console.error("Pixabay Fetch Error:", error);
    }
  }, []);

  useEffect(() => { fetchBackground(mode); }, [mode, fetchBackground]);

  // TRACK NAVIGATION LOGIC
  const nextTrack = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % playlists[mode].length);
    setIsPlaying(true); // Auto-play on skip
  }, [mode]);

  const prevTrack = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + playlists[mode].length) % playlists[mode].length);
    setIsPlaying(true); // Auto-play on skip
  }, [mode]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setOnBreak(newMode === "relax");
    setTimeLeft(newMode === "focus" ? 25 * 60 : 5 * 60);
    setCurrentIndex(0);
    setIsPlaying(false); // Reset player on mode switch
  };

  // Focus Timer Logic
  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (isPlaying && timeLeft === 0) {
      if (!onBreak) {
        setOnBreak(true); setMode("relax"); setTimeLeft(5 * 60); setCurrentIndex(0);
      } else {
        setOnBreak(false); setMode("focus"); setTimeLeft(25 * 60); setCurrentIndex(0);
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, onBreak]);

  // Audio Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMeta = () => setDuration(audio.duration);
    const handleEnded = () => nextTrack();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setMeta);
    audio.addEventListener("ended", handleEnded);

    // Sync play/pause state when track changes
    if (isPlaying) {
      audio.play().catch((e) => console.log("Playback interrupted"));
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setMeta);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack, isPlaying, nextTrack]);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const changeQuote = () => setQuoteIndex((prev) => (prev + 1) % quotes.length);

  return (
    <div 
      className="studymood-container" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url(${bgImage})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        position: 'relative'
      }}
    >
      <button onClick={() => navigate("/dashboard")} className="back-arrow" title="Back to Dashboard">←</button>

      <div className="study-logo">
        <img src={logo} alt="App Logo" />
      </div>

      <h2 className="studymood-title">DATASTREAMX // SYSTEM_ACTIVE</h2>

      <div className="main-content-layout">
        
        {/* LEFT SIDE: TIMER */}
        <div className="timer-wrapper">
          <p className="timer">{formatTime(timeLeft)}</p>
          <p className="mode-text">MODE: {onBreak ? "RELAX_STATION" : "DEEP_FOCUS"}</p>
          
          <div className="motivation-status-container" onClick={changeQuote}>
            <p className="motivation-quote">{quotes[quoteIndex]}</p>
            <span className="quote-hint"> [ CLICK_TO_REGENERATE ] </span>
          </div>

          <div className="timer-controls">
            <button onClick={() => setIsPlaying(true)}>▶</button>
            <button onClick={() => setIsPlaying(false)}>⏸</button>
            <button onClick={() => setTimeLeft(onBreak ? 5 * 60 : 25 * 60)}>🔄</button>
          </div>

          <div className="mood-options">
            <div className={`mood-card ${mode === "focus" ? "active" : ""}`} onClick={() => switchMode("focus")}>
              FOCUS_MODE
            </div>
            <div className={`mood-card ${mode === "relax" ? "active" : ""}`} onClick={() => switchMode("relax")}>
              RELAX_MODE
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: PLAYER */}
        <div className="player-box">
          <div className="panel-header">
            <h3>STATION_PLAYLIST // {playlists[mode].length} TRACKS</h3>
            <span className="live-tag">LIVE_FEED</span>
          </div>

          <div className="track-list">
            {playlists[mode].map((track, index) => (
              <div 
                key={index} 
                className={`track-item ${currentIndex === index ? "active" : ""}`}
                onClick={() => { setCurrentIndex(index); setIsPlaying(true); }}
              >
                <div className="track-meta">
                  <span className="track-number">{String(index + 1).padStart(2, '0')}</span>
                  <div className="track-info">
                    <p className="track-title">{track.title}</p>
                    <p className="track-artist">{track.artist || "Unknown Data"}</p>
                  </div>
                </div>
                <span className="track-duration">{track.duration}</span>
              </div>
            ))}
          </div>

          <div className={`player ${isPlaying ? "playing" : ""}`}>
            <audio ref={audioRef} src={currentTrack.src} />
            
            {/* SONG TIMER UI */}
            <div className="song-timer-display">
               <span>{formatTime(currentTime)}</span>
               <span>{formatTime(duration)}</span>
            </div>

            <div className="progress-container">
              <input 
                type="range" min="0" max={duration || 0} value={currentTime} 
                onChange={(e) => { audioRef.current.currentTime = e.target.value; }} 
                className="progress-bar"
              />
            </div>
            <div className="controls">
              <button onClick={prevTrack}>⏮</button>
              <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button onClick={nextTrack}>⏭</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}