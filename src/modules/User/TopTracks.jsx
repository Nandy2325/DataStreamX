import React from 'react';

export default function TopTracks({ tracks = [], onTrackSelect, currentTrackId }) {
  return (
    <section className="section" style={{ marginTop: '20px', padding: '0 10px' }}>
      <h3 style={{
        color: '#a259ff',
        fontSize: '1.2rem',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        Top Tracks This Month
        <span style={{
          fontSize: '10px',
          color: '#888',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          • Only visible to you
        </span>
      </h3>

      <div className="track-list-container">
        {tracks.length > 0 ? (
          tracks.map((track) => {
            const isPlaying = currentTrackId === track.id;

            return (
              <div
                key={track.id}
                className="track-row"
                onClick={() => onTrackSelect(track)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 50px',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginBottom: '4px',
                  background: isPlaying ? 'rgba(162, 89, 255, 0.15)' : 'transparent',
                  border: isPlaying ? '1px solid #a259ff' : '1px solid transparent',
                  boxShadow: isPlaying ? '0 0 8px rgba(162, 89, 255, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isPlaying) e.currentTarget.style.backgroundColor = 'rgba(162, 89, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  if (!isPlaying) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {/* Album Art Thumbnail */}
                <img
                  src={track.cover || "https://via.placeholder.com/40"}
                  alt=""
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    objectFit: 'cover'
                  }}
                />

                {/* Song Info */}
                <div style={{ overflow: 'hidden' }}>
                  <div style={{
                    color: isPlaying ? '#a259ff' : '#fff',
                    fontWeight: '600',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {track.title}
                  </div>
                  <div style={{
                    color: '#b3b3b3',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {track.artist}
                  </div>
                </div>

                {/* Duration */}
                <div style={{
                  color: '#aaa',
                  fontSize: '12px',
                  textAlign: 'right',
                  fontFamily: 'monospace'
                }}>
                  {track.duration || "3:30"}
                </div>
              </div>
            );
          })
        ) : (
          <div style={{
            padding: '30px',
            textAlign: 'center',
            color: '#666',
            border: '1px dashed #333',
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            <p style={{ marginBottom: '8px' }}>⌛ Syncing with DataStreamX...</p>
            <p style={{ fontSize: '12px' }}>Check if your Spring Boot backend is active.</p>
          </div>
        )}
      </div>
    </section>
  );
}