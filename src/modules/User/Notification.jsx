import React, { useState, useEffect } from "react";

// --- Constant Alerts (outside the component, stable reference) ---
const autoSouthAlerts = [
  "🎶 Vidhyasagar announces Live Symphony in Chennai!",
  "🎤 Harris Jayaraj World Tour 2026 announced!",
  "🎵 Saindhavi performing Carnatic Night in December!",
  "🎹 Anirudh announces Global Concert!",
  "🎼 AR Rahman Live in Coimbatore next month!"
];

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("notifications")) || []
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentArtist, setCurrentArtist] = useState("");
  const [activeTab, setActiveTab] = useState("bio");

  /* ================= ARTIST DATA ================= */
  const artistData = {
    Vidhyasagar: {
      bio: "Vidya Sagar is a legendary South Indian composer known for soulful melodies.",
      concerts:
        "Chennai Music Fest 2025\nCoimbatore Live Symphony\nKerala Cultural Night",
      hits: "Oru Devathai\nMalare Mounama\nKanaa Kandenadi",
      photos: [
        "https://th.bing.com/th/id/OIP.q72KudzyoYsuHygEDxgyCQHaD2?w=316&h=180",
        "https://th.bing.com/th/id/OIP.J-IF4X-rMoTSw5AWjFHJ9QHaD4?w=324&h=180"
      ]
    },
    "Harris Jayaraj": {
      bio: "Harris Jayaraj is a famous Tamil music composer who debuted with Minnale.",
      concerts:
        "Live in Chennai 2025\nSingapore Musical Tour\nHyderabad EDM Night",
      hits: "Vaseegara\nUyirin Uyire\nMun Andhi",
      photos: [
        "https://th.bing.com/th/id/OIP.GaKjzIUQW_TnhmqcNwCWfgHaHa?w=183&h=183",
        "https://th.bing.com/th/id/OIP.jrVSw3xmUzm5M5TUoa8UmAHaEB?w=281&h=180"
      ]
    },
    Saidhavi: {
      bio: "Saindhavi is a Carnatic vocalist and playback singer from Chennai.",
      concerts:
        "Carnatic Night 2025\nChennai Margazhi Concert\nTemple Music Festival",
      hits: "Aaruyire\nYaar Indha Saalai Oram\nSarvam Thaala Mayam",
      photos: [
        "https://th.bing.com/th/id/OIP.hNYmvNjYYMhZBpjF2krqqgAAAA?w=154&h=180",
        "https://th.bing.com/th/id/OIP.lPTN38FfKQyF83nFA0u_SQHaJP?w=140&h=180"
      ]
    }
  };

  /* ================= NOTIFICATION SYSTEM ================= */
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (message) => {
    setNotifications((prev) => [message, ...prev]);
  };

  /* ================= AUTO ALERT SYSTEM ================= */
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
      const randomMessage =
        autoSouthAlerts[Math.floor(Math.random() * autoSouthAlerts.length)];

      addNotification(randomMessage);

      if (Notification.permission === "granted") {
        new Notification("South Music Update 🎵", {
          body: randomMessage
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []); // ✅ safe now

  /* ================= HANDLERS ================= */
  const openArtist = (name) => {
    setCurrentArtist(name);
    setModalOpen(true);
    setActiveTab("bio");
    addNotification(`You viewed ${name}`);
  };

  const bookShow = () => {
    alert(`Your booking request for ${currentArtist} concert is confirmed!`);
    addNotification(`Booked a concert for ${currentArtist}`);
  };

  const artist = artistData[currentArtist];

  /* ================= UI ================= */
  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff" }}>
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 40px",
          background: "#070707"
        }}
      >
        <h2 style={{ color: "#9b5de5" }}>DataStreamX</h2>

        <div style={{ position: "relative" }}>
          <span
            style={{ cursor: "pointer", fontSize: "22px" }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            🔔
          </span>
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-10px",
              background: "red",
              padding: "3px 6px",
              borderRadius: "50%",
              fontSize: "12px"
            }}
          >
            {notifications.length}
          </span>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "35px",
                width: "250px",
                background: "#111",
                border: "1px solid #222",
                borderRadius: "8px",
                maxHeight: "300px",
                overflowY: "auto"
              }}
            >
              {notifications.map((note, index) => (
                <div
                  key={index}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #222"
                  }}
                >
                  {note}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ARTIST SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
          padding: "40px"
        }}
      >
        {Object.keys(artistData).map((artistName) => (
          <div
            key={artistName}
            onClick={() => openArtist(artistName)}
            style={{
              background: "#111",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            {artistName}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              background: "#111",
              padding: "30px",
              width: "600px",
              borderRadius: "10px"
            }}
          >
            <button onClick={() => setModalOpen(false)}>✖</button>
            <h2>{currentArtist}</h2>

            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              {["bio", "concerts", "hits", "photos"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: activeTab === tab ? "#9b5de5" : "transparent",
                    color: "#fff",
                    border: "1px solid #222",
                    padding: "5px 10px"
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ marginTop: "20px" }}>
              {activeTab === "bio" && <p>{artist?.bio}</p>}

              {activeTab === "concerts" && (
                <>
                  <pre>{artist?.concerts}</pre>
                  <button
                    onClick={bookShow}
                    style={{
                      background: "#9b5de5",
                      border: "none",
                      padding: "8px 15px",
                      color: "#fff"
                    }}
                  >
                    Book Show
                  </button>
                </>
              )}

              {activeTab === "hits" && <pre>{artist?.hits}</pre>}

              {activeTab === "photos" &&
                artist?.photos.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    style={{
                      width: "100px",
                      marginRight: "10px",
                      borderRadius: "8px"
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;