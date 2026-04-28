import React from 'react';

// ✅ Import your local images from src/assets
import Anirudh from '../../assets/Anirudh.jpg';
import ShreyaGhoshal from '../../assets/ShreyaGhoshal.jpg';
import BTS from '../../assets/BTS.jpg';
import BP from '../../assets/BP.jpg';
import Billie from '../../assets/billie.jpg';
import Weeknd from '../../assets/weeknd.png';
import Taylor from '../../assets/Taylor.png';
import Dua from '../../assets/dua.png';

// ✅ Map artist names to images
const imageMap = {
  "Anirudh": Anirudh,
  "Shreya Ghoshal": ShreyaGhoshal,
  "BTS": BTS,
  "BLACKPINK": BP,
  "Billie Eilish": Billie,
  "The Weeknd": Weeknd,
  "Taylor Swift": Taylor,
  "Dua Lipa": Dua
};

export default function FollowingArtists({ artists = [], onFollow }) {
  
  const handleQuickFollow = () => {
    const possibleArtists = [
      { name: "The Weeknd", image: "The Weeknd" },
      { name: "Taylor Swift", image: "Taylor Swift" },
      { name: "Dua Lipa", image: "Dua Lipa" }
    ];
    
    const randomArtist = possibleArtists[Math.floor(Math.random() * possibleArtists.length)];
    onFollow(randomArtist.name, randomArtist.image);
  };

  const handleImgError = (e) => {
    e.target.style.opacity = '0';
    e.target.parentElement.style.background = '#a259ff';
  };

  return (
    <section className="section" style={{ marginTop: '30px', padding: '0 10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: '#a259ff', margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>
          Following Artists
        </h3>
        <button 
          onClick={handleQuickFollow}
          style={{
            background: 'transparent', 
            color: '#a259ff', 
            border: '1px solid #a259ff',
            borderRadius: '20px', 
            padding: '6px 15px', 
            fontSize: '12px', 
            cursor: 'pointer', 
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#a259ff';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#a259ff';
          }}
        >
          + Follow New
        </button>
      </div>
      
      <div className="artist-grid" style={{ 
        display: 'flex', 
        gap: '20px', 
        overflowX: 'auto', 
        paddingBottom: '15px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {artists.length > 0 ? (
          artists.map((artist, index) => (
            <div className="artist-item" key={index} style={{ textAlign: 'center', minWidth: '90px' }}>
              
              <div className="artist-img-circle" style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 10px',
                border: '2px solid #a259ff',
                boxShadow: '0 0 15px rgba(162, 89, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#1a1a1a',
                position: 'relative',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {/* Initials fallback */}
                <div style={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    fontSize: '20px',
                    position: 'absolute',
                    zIndex: 1
                }}>
                  {artist.name ? artist.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : '??'}
                </div>

                {/* Local image */}
                {artist.image && (
                  <img 
                    src={imageMap[artist.image] || imageMap[artist.name]} 
                    alt={artist.name} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 2,
                      transition: 'opacity 0.3s ease'
                    }}
                    onError={handleImgError}
                  />
                )}
              </div>

              <p style={{ color: 'white', fontSize: '13px', fontWeight: '500', margin: 0 }}>
                {artist.name}
              </p>
            </div>
          ))
        ) : (
          <p style={{ color: '#666', padding: '10px', fontSize: '14px' }}>
            No artists followed yet.
          </p>
        )}
      </div>
    </section>
  );
}