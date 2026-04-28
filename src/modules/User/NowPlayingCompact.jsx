import { useState } from "react";
import jloAlbum from "../../assets/JenniferLopez.jpg";

export default function NowPlayingCompact({
  track,
  isPlaying,
  currentTime,
  duration,
  onSeek,
  onTogglePlay,
  onExpand,
  onZoom,
  onNext,
  onPrev,
  onVolumeChange, // From Dashboard
  onLyrics,       // From Dashboard
  lyrics,         // From Dashboard
  tracks = []
}) {
  const [showQueue, setShowQueue] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false); // ✅ New state

  if (!track) return null;

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleLyricsToggle = () => {
    if (!showLyrics) onLyrics(); // Fetch lyrics when opening
    setShowLyrics(!showLyrics);
    setShowQueue(false); // Close queue if lyrics are open
  };

  return (
    <div className="now-playing-compact">
      <img src={track.cover || track.albumArt || jloAlbum} alt="Album Art" className="album-art-small" />

      <div className="track-info">
        <h4 className="track-title">{track.title}</h4>
        <p className="track-artist">{track.artist}</p>
      </div>

      <div className="progress-bar">
        <span className="time current-time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
        />
        <span className="time total-time">{formatTime(duration)}</span>
      </div>

      <div className="controls">
        <button onClick={onPrev}>⏮️</button>
        <button onClick={onTogglePlay}>{isPlaying ? "⏸️" : "▶️"}</button>
        <button onClick={onNext}>⏭️</button>
        <button onClick={onExpand}>🔼</button>
        <button onClick={onZoom}>🔍</button>
      </div>

      <div className="extra-features">
        <button className={`lyrics-btn ${showLyrics ? 'active' : ''}`} onClick={handleLyricsToggle}>
          🎤 Lyrics
        </button>
        <div className="volume-control">
          <span>🔉</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            onChange={(e) => onVolumeChange(Number(e.target.value))} 
          />
        </div>
      </div>

      <button className="queue-btn" onClick={() => { setShowQueue(!showQueue); setShowLyrics(false); }}>
        Queue
      </button>

      {/* ✅ APPLE MUSIC STYLE LYRICS PANEL */}
      {showLyrics && (
        <div className="lyrics-panel">
          <button className="close-panel" onClick={() => setShowLyrics(false)}>✖</button>
          <div className="lyrics-container">
            {lyrics ? (
              lyrics.split('...').map((line, index) => (
                <p key={index} className="lyric-line">{line.trim()}</p>
              ))
            ) : (
              <p className="lyric-line">Loading lyrics...</p>
            )}
          </div>
        </div>
      )}

      {/* ✅ REAL LOOKING QUEUE PANEL */}
      {showQueue && (
        <div className="queue-panel">
          <button className="close-panel" onClick={() => setShowQueue(false)}>✖</button>
          <h4 className="queue-title">Up Next</h4>
          <div className="queue-list-container">
            {tracks.map((t) => (
              <div key={t.id} className={`queue-item ${t.id === track.id ? 'active-track' : ''}`}>
                <img src={t.cover || jloAlbum} className="queue-thumb" alt="cover" />
                <div className="queue-info">
                  <p className="queue-title">{t.title}</p>
                  <p className="queue-artist">{t.artist} • {t.album || 'Single'}</p>
                </div>
                <span className="queue-duration">{t.duration || '0:00'}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}