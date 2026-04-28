import React from 'react';

export default function TopTracks({ tracks = [], onTrackSelect }) {
  // Check if tracks exists, otherwise default to empty array
  const safeTracks = tracks || [];

  return (
    <div className="top-tracks-section">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: 'white', margin: 0, fontSize: '20px' }}>Top Tracks of the Month</h3>
        <span style={{ color: '#a259ff', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>
          Show all
        </span>
      </div>

      <div className="tracks-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
        gap: '20px' 
      }}>
        {/* WE USE .slice(0, 5) DIRECTLY HERE TO FORCE THE LIMIT */}
        {safeTracks.slice(0, 5).map((track) => (
          <div 
            key={track.id} 
            className="track-card" 
            onClick={() => onTrackSelect(track)}
            style={{
              backgroundColor: '#181818',
              padding: '15px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: '0.3s ease',
              border: '1px solid rgba(255,255,255,0.05)',
              textAlign: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#282828';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#181818';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <img 
              src={track.img} 
              alt={track.title} 
              style={{ 
                width: '100%', 
                aspectRatio: '1/1', 
                objectFit: 'cover', 
                borderRadius: '8px', 
                marginBottom: '12px'
              }} 
            />
            
            <p style={{ 
              color: 'white', 
              margin: '0 0 5px 0', 
              fontWeight: 'bold', 
              fontSize: '14px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {track.title}
            </p>
            <span style={{ color: '#b3b3b3', fontSize: '12px' }}>
              {track.artist}
            </span>
          </div>
        ))}

        {safeTracks.length === 0 && (
          <p style={{ color: '#b3b3b3' }}>No tracks found.</p>
        )}
      </div>
    </div>
  );
}