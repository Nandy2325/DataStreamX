function SongPlayer({ song, viewMode }) {
  if (!song) return null;

  const baseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#1a1a1a",
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    color: "white"
  };

  if (viewMode === "compact") {
    return (
      <div style={{ ...baseStyle, flexDirection: "row", width: "250px" }}>
        <img src={song.albumArt} alt={song.title} style={{ width: "50px", borderRadius: "5px" }} />
        <div style={{ marginLeft: "10px" }}>
          <p>{song.title}</p>
          <audio controls src={song.url} style={{ width: "150px" }} />
        </div>
      </div>
    );
  }

  if (viewMode === "expanded") {
    return (
      <div style={{ ...baseStyle, flexDirection: "column", width: "400px" }}>
        <img src={song.albumArt} alt={song.title} style={{ width: "200px", borderRadius: "10px" }} />
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
        <audio controls src={song.url} style={{ width: "100%" }} />
      </div>
    );
  }

  if (viewMode === "zoom") {
    return (
      <div style={{ ...baseStyle, flexDirection: "column", width: "600px" }}>
        <img src={song.albumArt} alt={song.title} style={{ width: "300px", borderRadius: "15px" }} />
        <h2 style={{ fontSize: "1.5rem" }}>{song.title}</h2>
        <p style={{ fontSize: "1.2rem" }}>{song.artist}</p>
        <audio controls src={song.url} style={{ width: "100%" }} />
      </div>
    );
  }
}