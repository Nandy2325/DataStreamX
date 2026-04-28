import { useState, useRef, useEffect, useMemo } from "react";
import logo from "../../assets/logo.png";
import "./UnifiedSearch.css";

export default function UnifiedSearch({ compact = false, onTrackSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [status, setStatus] = useState("Search active");
  const [isListening, setIsListening] = useState(false);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/library")
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error("Search fetch error:", err));
  }, []);

  const filteredResults = useMemo(() => {
    if (query.trim() === "") return [];
    return results.filter(
      (song) =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, results]);

  // --- UPDATED LOGIC: RESET SEARCH ON PLAY ---
  const handlePlaySong = (song) => {
    if (onTrackSelect) {
      onTrackSelect(song); 
    }
    
    // 1. Reset the states so the UI disappears
    setQuery("");           // Clears the typing in search bar
    setShowResults(false);  // Hides the results dropdown
    
    // 2. Update status and current track info
    setCurrentTrack(song);
    setIsPlaying(true);
    setStatus(`Now playing: ${song.title}`);
  };

  useEffect(() => {
    setShowResults(query.trim() !== "" && filteredResults.length > 0);
  }, [query, filteredResults]);

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus("Chrome Browser Required");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onstart = () => { setStatus("Listening..."); setIsListening(true); };
    recognition.onresult = (e) => {
      let voice = e.results[0][0].transcript.toLowerCase();
      setQuery(voice);
      const match = results.find(s => s.title.toLowerCase().includes(voice) || s.artist.toLowerCase().includes(voice));
      if (match) handlePlaySong(match); 
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const renderResults = (isCompact) => (
    <div className={`${isCompact ? "compact-results" : "unifiedsearch-results"} ${showResults ? "" : "hide"}`}>
      {filteredResults.map((item) => (
        <div
          key={item.id}
          className={isCompact ? "compact-result-card" : "unifiedsearch-card"}
          onClick={() => handlePlaySong(item)} 
        >
          <img src={item.cover || item.img} alt={item.title} />
          <div className="track-info">
            <h4>{item.title}</h4>
            <p>{item.artist}</p>
          </div>
          <div className="play-indicator">
            {currentTrack?.id === item.id && isPlaying ? "⏸" : "▶"}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={compact ? "unifiedsearch-compact" : "unifiedsearch-module"} ref={wrapperRef}>
      {!compact && (
        <div className="unifiedsearch-header">
          <img src={logo} alt="Logo" />
          <span>DataStreamX</span>
        </div>
      )}

      <form className={compact ? "compact-search-bar" : "unifiedsearch-bar"} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search and play..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">🔍</button>
        <button type="button" onClick={handleVoiceSearch} className={isListening ? "mic-btn active" : "mic-btn"}>🎤</button>
      </form>

      <div className="search-status" style={{ color: "#a259ff", fontSize: "12px", marginTop: "5px" }}>{status}</div>
      {renderResults(compact)}

      {currentTrack && (
        <div className="sidebar-mini-player" style={miniPlayerStyle}>
           <img src={currentTrack.img || currentTrack.cover} alt="" style={miniImgStyle} />
           <div style={{ flex: 1, overflow: "hidden" }}>
             <div style={miniTitleStyle}>{currentTrack.title}</div>
           </div>
           <button onClick={() => handlePlaySong(currentTrack)} style={miniBtnStyle}>
             {isPlaying ? "⏸" : "▶"}
           </button>
        </div>
      )}
    </div>
  );
}

const miniPlayerStyle = { marginTop: "15px", background: "#222", padding: "10px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px", border: "1px solid #a259ff" };
const miniImgStyle = { width: "30px", height: "30px", borderRadius: "5px" };
const miniTitleStyle = { fontSize: "12px", color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
const miniBtnStyle = { background: "none", border: "none", color: "#a259ff", cursor: "pointer", fontSize: "16px" };