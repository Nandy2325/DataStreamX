import React from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import Sidebar from "./Sidebar";

import nani from "../../assets/nani.jpeg";
import vd from "../../assets/vd.jpeg";
import eg from "../../assets/eg.jpeg";
import spb from "../../assets/spb.jpeg";

export default function Home() {
  const navigate = useNavigate(); // Hook for back button logic

  return (
    <>
      <style>{`
body{
  margin:0;
  font-family:"Poppins",sans-serif;
  background:linear-gradient(135deg,#0a0015,#14002a);
  color:#f5e6ff;
}

/* ===== PAGE LAYOUT ===== */
.page-layout{
  display:flex;
  min-height:100vh;
}

/* ===== MAIN CONTENT ===== */
.main-content{
  flex:1;
  padding:40px;
  padding-bottom:100px;
  position: relative; /* Crucial for absolute arrow positioning */
}

/* ===== BACK ARROW ===== */
.back-arrow {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(155, 93, 229, 0.2);
  border: 1px solid #9b5de5;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  z-index: 1000;
  transition: 0.3s;
}

.back-arrow:hover {
  background: #9b5de5;
  box-shadow: 0 0 15px #9b5de5;
  transform: scale(1.1);
}

/* ===== PLAYLIST HEADER ===== */
.playlist-header{
  display:flex;
  align-items:center;
  gap:40px;
  margin-bottom:60px;
  margin-top: 20px; /* Space for the arrow */
}

.cover-art{
  width:220px;
  height:220px;
  border-radius:15px;
  object-fit:cover;
  box-shadow:
  0 0 20px #9b5de5,
  0 0 40px rgba(255,0,255,0.6);
}

.details{
  display:flex;
  flex-direction:column;
  gap:8px;
}

.details .type{
  color:#9b5de5;
  font-size:14px;
  letter-spacing:1px;
}

.details h1{
  font-size:46px;
  margin:0;
  color:#fff;
}

/* ===== PLAY BUTTON ===== */
.play-btn{
  width:160px;
  margin-top:12px;
  padding:12px 20px;
  border:none;
  border-radius:25px;
  background:linear-gradient(90deg,#9b5de5,#ff00ff);
  color:white;
  font-weight:600;
  cursor:pointer;
  transition:0.25s;
  box-shadow:0 0 18px #9b5de5;
}

.play-btn:hover{
  transform:scale(1.05);
  box-shadow:0 0 30px #ff00ff;
}

/* ===== SECTION TITLE ===== */
.grid-section h2{
  margin-bottom:25px;
  color:#9b5de5;
  font-size:22px;
  letter-spacing:1px;
}

/* ===== GRID ===== */
.grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
  gap:25px;
}

/* ===== CARD ===== */
.card{
  background:rgba(30,0,50,0.85);
  padding:15px;
  border-radius:12px;
  transition:0.25s;
  cursor:pointer;
  box-shadow:0 0 10px rgba(155,93,229,0.6);
}

.card:hover{
  transform:translateY(-6px);
  background:rgba(60,0,90,0.9);
  box-shadow:
  0 0 20px #9b5de5,
  0 0 35px rgba(255,0,255,0.5);
}

.card img{
  width:100%;
  height:160px;
  object-fit:cover;
  border-radius:8px;
  margin-bottom:10px;
}

.card h3{
  margin:6px 0;
  font-size:16px;
  color:#fff;
}

.card p{
  font-size:13px;
  color:#aaa;
}

/* ===== FOOTER ===== */
footer{
  position:fixed;
  bottom:0;
  left:0;
  width:100%;
  background:#000;
  padding:18px 0;
  text-align:center;
  color:#aaa;
  font-size:13px;
  border-top:1px solid #222;
  z-index:10;
}

/* ===== MOBILE ===== */
@media(max-width:768px){
  .back-arrow {
    top: 10px;
    left: 10px;
  }

  .main-content{
    padding:20px;
    padding-bottom:110px;
  }

  .playlist-header{
    flex-direction:column;
    text-align:center;
    gap:18px;
    margin-top: 40px;
  }

  .cover-art{
    width:150px;
    height:150px;
  }

  .details h1{
    font-size:26px;
  }

  .play-btn{
    width:130px;
    padding:8px 14px;
    font-size:14px;
  }

  .grid{
    grid-template-columns:repeat(2,1fr);
    gap:12px;
  }

  .card{
    padding:10px;
    border-radius:10px;
  }

  .card img{
    height:100px;
  }

  .card h3{
    font-size:14px;
  }

  .card p{
    font-size:11px;
  }
}
      `}</style>

      <div className="page-layout">
        <Sidebar />

        <main className="main-content">
          {/* Functional Back Arrow */}
          <button className="back-arrow" onClick={() => navigate(-1)}>
            ←
          </button>

          <header className="playlist-header">
            <img src={nani} alt="Playlist" className="cover-art" />

            <div className="details">
              <p className="type">Most Played 🎧</p>
              <h1>by DataStreamX</h1>
              <button className="play-btn">PLAY</button>
            </div>
          </header>

          <section className="grid-section">
            <h2>Recently Played</h2>

            <div className="grid">
              <div className="card">
                <img src={vd} alt="album" />
                <h3>CHARMING VD 😍</h3>
                <p>by DataStreamX</p>
              </div>

              <div className="card">
                <img src={eg} alt="album" />
                <h3>EVERGREEN DUO 💕</h3>
                <p>by DataStreamX</p>
              </div>

              <div className="card">
                <img src={spb} alt="album" />
                <h3>SPB HITS 🎤</h3>
                <p>by DataStreamX</p>
              </div>
            </div>
          </section>

          <footer>© 2026 DataStreamX</footer>
        </main>
      </div>
    </>
  );
}