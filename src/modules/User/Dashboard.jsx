import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import NowPlayingCompact from './NowPlayingCompact';
import TopTracks from './TopTracks';
import FollowingArtists from './FollowingArtists';
import NowPlayingExpanded from './NowPlayingExpanded';
import Avatar from './Avatar';
import Footer from './Footer';
import jloAlbum from '../../assets/JenniferLopez.jpg';
import jloPhoto from '../../assets/jn.jpg';
import UnifiedSearch from "./UnifiedSearch";
import { Link } from 'react-router-dom';
import { useGamification } from "../../context/Gamification"; 
import './dashboard.css';

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default function Dashboard() {
  const { trackSongPlay } = useGamification(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  
  // DYNAMIC NAME STATE
  const [userName, setUserName] = useState("Nanthini");

  const [tracks, setTracks] = useState([]); 
  const [artists, setArtists] = useState([]); 
  const [currentTrack, setCurrentTrack] = useState(null); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lyrics, setLyrics] = useState("");
  const [volume, setVolume] = useState(0.5); 

  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchTracks = fetch("http://localhost:8080/api/songs").then(res => res.json());
    const fetchArtists = fetch("http://localhost:8080/api/artists").then(res => res.json());

    Promise.all([fetchTracks, fetchArtists])
      .then(([trackData, artistData]) => {
        setTracks(trackData);
        setArtists(artistData);
        if (trackData.length > 0) {
          setCurrentTrack(trackData[0]);
          audioRef.current.src = trackData[0].url;
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });

    // LOAD SAVED AVATAR & NAME
    const savedAvatar = localStorage.getItem("selectedAvatar");
    if (savedAvatar) setSelectedAvatar(savedAvatar);
    
    const savedName = localStorage.getItem("userName");
    if (savedName) setUserName(savedName);

    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (!isNaN(audio.duration)) setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const filteredTracks = tracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const playTrack = (track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        trackSongPlay();
      }
    } else {
      setCurrentTrack(track);
      setLyrics(""); 
      audioRef.current.src = track.url;
      audioRef.current.load(); 
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          trackSongPlay();
        })
        .catch(err => console.error("Playback failed:", err));
    }
  };

  const handleSeek = (newTime) => {
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (val) => {
    const newVol = val / 100;
    audioRef.current.volume = newVol;
    setVolume(newVol);
  };

  const fetchLyrics = (trackId) => {
    fetch(`http://localhost:8080/api/lyrics/${trackId}`)
      .then(res => res.text())
      .then(data => setLyrics(data))
      .catch(err => console.error("Lyrics fetch error:", err));
  };

  const playNextTrack = () => {
    if (!currentTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    playTrack(tracks[nextIndex]);
  };

  const playPrevTrack = () => {
    if (!currentTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(tracks[prevIndex]);
  };

  const handleFollowArtist = (name, imageUrl) => {
    fetch("http://localhost:8080/api/artists/follow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, image: imageUrl })
    })
    .then(res => res.json())
    .then(updatedArtists => {
      setArtists(updatedArtists);
    })
    .catch(err => console.error("Follow error:", err));
  };

  if (loading) {
    return (
      <div className="loading-screen" style={{ background: '#000', color: '#a259ff', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Syncing with DataStreamX...</h2>
      </div>
    );
  }

  return (
    <div className={`dashboard-layout ${isFullscreen ? 'fullscreen-active' : ''}`}>
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <div className="top-bar">
            <div className="search-container">
              <UnifiedSearch 
                compact={true} 
                onSearchChange={(val) => setSearchQuery(val)} 
                onTrackSelect={playTrack}   
              />
            </div>

            <div className="profile-container">
              {/* DYNAMIC NAME DISPLAY */}
              <span className="profile-name">{userName}</span>
              <div className="profile-icon" onClick={() => setShowAvatar(true)} style={{ cursor: "pointer" }}>
                {selectedAvatar ? <img src={selectedAvatar} alt="Avatar" className="avatar-thumb" /> : "👤"}
              </div>
            </div>
          </div>

          <h2 className="welcome">Welcome Back</h2>

          {showAvatar && (
            <div className="avatar-page-wrapper">
              <Avatar 
                onClose={() => setShowAvatar(false)} 
                onSelect={(src) => setSelectedAvatar(src)}
                currentName={userName}
                onNameChange={(newName) => {
                    setUserName(newName);
                    localStorage.setItem("userName", newName);
                }}
              />
            </div>
          )}

          <TopTracks 
            tracks={filteredTracks} 
            onTrackSelect={playTrack} 
            currentTrackId={currentTrack?.id} 
            isPlaying={isPlaying} 
          />
          
          <FollowingArtists artists={artists} onFollow={handleFollowArtist} />

          <Link to="/studymode" className="study-link">
            🎧 Open Study Mode <span className="study-timer">⏱ 25:00</span>
          </Link>
        </main>
      </div>

      {currentTrack && (
        <NowPlayingCompact
          key={`compact-${currentTrack.id}`}
          track={currentTrack}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          formattedTime={formatTime(currentTime)}
          formattedDuration={formatTime(duration)}
          onSeek={handleSeek}
          onTogglePlay={() => playTrack(currentTrack)}
          onNext={playNextTrack}
          onPrev={playPrevTrack}
          onExpand={() => setIsExpanded(true)}
          onZoom={() => setIsFullscreen(true)}
          tracks={tracks}
          onVolumeChange={handleVolumeChange}
          onLyrics={() => fetchLyrics(currentTrack.id)}
          lyrics={lyrics}
          onTrackSelect={playTrack} 
        />
      )}

      {(isExpanded || isFullscreen) && currentTrack && (
        <div className={isFullscreen ? "fullscreen-overlay" : "expanded-dock"}>
          <NowPlayingExpanded
            key={`expanded-${currentTrack.id}`}
            track={currentTrack}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            formattedTime={formatTime(currentTime)}
            formattedDuration={formatTime(duration)}
            onSeek={handleSeek}
            onTogglePlay={() => playTrack(currentTrack)}
            onNext={playNextTrack}
            onPrev={playPrevTrack}
            onClose={() => { setIsExpanded(false); setIsFullscreen(false); }}
            isFullscreen={isFullscreen}
            albumArt={currentTrack.cover || jloAlbum}
            artistPhoto={currentTrack.cover || jloPhoto}
            queue={tracks}
            onVolumeChange={handleVolumeChange}
            onLyrics={() => fetchLyrics(currentTrack.id)}
            lyrics={lyrics}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}