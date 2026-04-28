import React, { useState, useEffect } from 'react';
import ranjithame from '../../assets/ranjithame.jpg';
import kavalaya from '../../assets/kavalaya.jpg';
import vaseegra from '../../assets/vaseegra.jpg';
import munbevaa from '../../assets/munbe vaa.jpg';
import newyork from '../../assets/newyork.jpg';
import kolaveri from '../../assets/kolaveri.jpg';
import ennasolla from '../../assets/enna solla.jpg';
import unakul from '../../assets/unakul.jpg';
import okk from '../../assets/okk.jpg';

const DataStreamX = () => {
  // --- 🎵 State Management ---
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState("DataStreamX Voice Active");
  const [matchedTitle, setMatchedTitle] = useState("");
  const [isListening, setIsListening] = useState(false);

  // --- 📚 Song Library ---
  const songLibrary = [
  { title: "Ranjithame", artist: "Vijay", img: ranjithame },
  { title: "Kaavaalaa", artist: "Shilpa Rao", img: kavalaya },
  { title: "Vaseegara", artist: "Bombay Jayashri", img: vaseegra },
  { title: "Munbe Vaa", artist: "Shreya Ghoshal", img: munbevaa },
  { title: "New York Nagaram", artist: "A.R. Rahman", img: newyork },
  { title: "Why This Kolaveri Di", artist: "Dhanush", img: kolaveri },
  { title: "Enna Solla", artist: "Anirudh", img: ennasolla },
  { title: "Unakkul Naane", artist: "Madhushree", img: unakul },
  { title: "Mental Manadhil", artist: "A.R. Rahman", img: okk },
];

  // --- 🎙️ Speech Recognition Logic ---
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("Chrome Browser Required");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      setStatus("Listening for Tamil Song Names...");
      setIsListening(true);
    };

    recognition.onresult = (e) => {
      let voice = e.results[0][0].transcript.toLowerCase();
      setTranscript(voice);

      // Clean the voice input
      const fillers = ["play", "find", "search", "song", "please", "the", "put"];
      let cleanVoice = voice;
      fillers.forEach(word => {
        cleanVoice = cleanVoice.replace(word, "").trim();
      });

      // Smart Matching
      const found = songLibrary.find(s => {
        const title = s.title.toLowerCase();
        return voice.includes(title) || title.includes(cleanVoice);
      });

      if (found) {
        setMatchedTitle(found.title);
        setStatus(`Match Found: ${found.title}`);
        // Scroll logic handled via effect
      } else {
        setStatus(`No match for: ${voice}`);
        setMatchedTitle("");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // --- 📜 Auto-Scroll Effect ---
  useEffect(() => {
    if (matchedTitle) {
      const matchCard = document.querySelector('.match');
      if (matchCard) matchCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [matchedTitle]);

  return (
    <div style={styles.body}>
      <div style={styles.dashboard}>
        <div id="status" style={{ ...styles.status, color: matchedTitle ? '#9b5de5' : '#a259ff' }}>
          {status}
        </div>

        <div className={`search-container ${isListening ? 'active' : ''}`} style={styles.searchContainer}>
          <input
            type="text"
            value={transcript}
            className="search-input"
            style={styles.searchInput}
            placeholder="Say 'Search Arabic Kuthu'..."
            readOnly
          />
          <button className="mic-btn" style={styles.micBtn} onClick={handleVoiceSearch}>
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </button>
        </div>

        <div style={styles.gridTitle}>Tamil Library Suggestions</div>
        
        <div style={styles.suggestionsGrid}>
          {songLibrary.map((song, index) => (
            <div
              key={index}
              className={`song-card ${matchedTitle.toLowerCase() === song.title.toLowerCase() ? 'match' : ''}`}
              style={{
                ...styles.songCard,
                ...(matchedTitle.toLowerCase() === song.title.toLowerCase() ? styles.matchActive : {})
              }}
            >
              <img src={song.img} className="cover-art" alt="cover" style={styles.coverArt} />
              <span style={styles.songName}>{song.title}</span>
              <span style={styles.artistName}>{song.artist}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 🎨 Inline Styles (Converted from CSS) ---
const styles = {
  body: { backgroundColor: '#000000', color: '#ffffff', fontFamily: "'Segoe UI', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', minHeight: '100vh' },
  dashboard: { width: '100%', maxWidth: '1000px', textAlign: 'center' },
  status: { fontWeight: 'bold', marginBottom: '10px', minHeight: '20px', fontSize: '14px' },
  searchContainer: { display: 'flex', alignItems: 'center', background: '#121212', border: '1px solid #2c2c2c', borderRadius: '50px', padding: '10px 25px', marginBottom: '30px', position: 'sticky', top: '20px', zIndex: 100 },
  searchInput: { background: 'transparent', border: 'none', color: 'white', flexGrow: 1, fontSize: '18px', outline: 'none' },
  micBtn: { background: '#9b5de5', border: 'none', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  gridTitle: { textAlign: 'left', color: '#888', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' },
  suggestionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px', width: '100%' },
  songCard: { background: '#121212', border: '1px solid #2c2c2c', padding: '12px', borderRadius: '12px', textAlign: 'left', transition: '0.3s' },
  matchActive: { borderColor: '#a259ff', background: '#1a1225', boxShadow: '0 0 15px rgba(162, 89, 255, 0.3)' },
  coverArt: { width: '100%', aspectRatio: '1', background: '#2c2c2c', borderRadius: '8px', marginBottom: '10px', objectFit: 'cover' },
  songName: { display: 'block', fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  artistName: { color: '#888', fontSize: '12px' },
};

export default DataStreamX;