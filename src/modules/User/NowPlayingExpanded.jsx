import React, { useState } from "react";

export default function NowPlayingExpanded({
  track,
  isPlaying,
  currentTime,
  duration,
  onSeek,
  onTogglePlay,
  onClose,
  isFullscreen,
  queue = []
}) {
  const [showQueue, setShowQueue] = useState(false);

  if (!track) return null;

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={isFullscreen ? "fullscreen-player" : "now-playing-expanded"}>
      {/* Background blur */}
      <div
        className="background-blur"
        style={{ backgroundImage: `url(${track.cover || track.albumArt})` }}
      />

      {/* Close button */}
      <button className="close-fullscreen" onClick={onClose}>✖</button>

      <div className="expanded-content">
        {/* Album Art + Info */}
        <img src={track.cover || track.albumArt} alt="Album Art" className="album-art-large" />
        <h2 className="track-title">{track.title}</h2>
        <p className="track-artist">{track.artist}</p>

        {/* Playback Controls */}
        <div className="controls">
          <button>⏮️</button>
          <button onClick={onTogglePlay}>{isPlaying ? "⏸️" : "▶️"}</button>
          <button>⏭️</button>
        </div>

        {/* Progress Bar */}
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

        {/* About Section */}
        <div className="about-section">
          <h3>About the Artist</h3>
          {track.artistImage && (
            <img src={track.artistImage} alt={track.artist} className="artist-photo" />
          )}
          <p>
            You are listening to <strong>{track.artist}</strong>.  
            Fetching real-time artist biography from DataStreamX...
          </p>
          <p className="listeners">Verified Artist on DataStreamX</p>
        </div>

        {/* Credits Section */}
        <div className="credits-section">
          <h3>Credits</h3>
          <ul>
            <li><strong>Main Artist:</strong> {track.artist}</li>
            <li><strong>Featured Artist:</strong> TBD</li>
            <li><strong>Producer:</strong> TBD</li>
            <li><strong>Composer:</strong> TBD</li>
            <li><strong>Lyricist:</strong> TBD</li>
          </ul>
        </div>

        {/* Queue Section */}
        <div className="queue-section">
          <h3>Next in Queue</h3>
          {showQueue && (
            <ul>
              {queue.map((qTrack) => (
                <li key={qTrack.id}>
                  {qTrack.id === track.id ? "▶ " : ""}{qTrack.title} – {qTrack.artist}
                </li>
              ))}
            </ul>
          )}
          <button
            className="open-queue-btn"
            onClick={() => setShowQueue(!showQueue)}
          >
            {showQueue ? "Hide Queue" : "Show Queue"}
          </button>
        </div>
      </div>
    </div>
  );
}