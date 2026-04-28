import { useState, useRef, useEffect } from "react";
import weekndImg from "../../assets/weeknd.png";
import sheeranImg from "../../assets/sheeran.png";
import duaImg from "../../assets/dua.png";
import bieberImg from "../../assets/bieber.png";

const mockSongs = [
{ title: "Blinding Lights", artist: "The Weeknd", albumArt: weekndImg },
{ title: "Shape of You", artist: "Ed Sheeran", albumArt: sheeranImg },
{ title: "Levitating", artist: "Dua Lipa", albumArt: duaImg },
{ title: "Peaches", artist: "Justin Bieber", albumArt: bieberImg },
];

export default function SearchModule() {
const [query, setQuery] = useState("");
const [results, setResults] = useState([]);
const [showResults, setShowResults] = useState(false);
const wrapperRef = useRef(null);

// Filter as you type
useEffect(() => {
  if (query.trim() === "") {
    setResults([]);
    setShowResults(false);
    return;
  }
  const filtered = mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
  );
  setResults(filtered);
  setShowResults(true);
}, [query]);

// Close results when clicking outside
useEffect(() => {
  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowResults(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

return (
  <div className="search-module" ref={wrapperRef}>
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search songs, albums, artists..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">🔍</button>
    </form>

    {showResults && results.length > 0 && (
      <div className="search-results">
        {results.map((item, index) => (
          <div key={index} className="result-card">
            <img src={item.albumArt} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>{item.artist}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}