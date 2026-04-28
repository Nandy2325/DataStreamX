import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf'; 
import html2canvas from 'html2canvas';

// --- 💿 STABLE TAMIL CONCERT DATA ---
const INITIAL_DATA = [
  { 
    id: 1, 
    name: "A.R. Rahman", 
    price: 5500, 
    status: "95% FULL",
    venue: "Nehru Stadium, Chennai",
    profile: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/A._R._Rahman_at_the_launch_of_his_biography_Notes_of_a_Dream.jpg/440px-A._R._Rahman_at_the_launch_of_his_biography_Notes_of_a_Dream.jpg", 
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200",
    desc: "The 'Wonderment Tour 2026'—A symphonic celebration of 30 years of musical genius." 
  },
  { 
    id: 2, 
    name: "Anirudh", 
    price: 4500, 
    status: "SELLING FAST",
    venue: "Island Grounds, Chennai",
    profile: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Anirudh_Ravichander_at_the_66th_Filmfare_Awards_South.jpg/440px-Anirudh_Ravichander_at_the_66th_Filmfare_Awards_South.jpg", 
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200", 
    desc: "The Rockstar returns! Witness the high-octane energy of the 'Hukum' world tour live." 
  },
  { 
    id: 3, 
    name: "Yuvan Shankar Raja", 
    price: 3800, 
    status: "LIMITED SEATS",
    venue: "YMCA Grounds, Nandanam",
    profile: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Yuvan_Shankar_Raja_at_the_66th_Filmfare_Awards_South.jpg/440px-Yuvan_Shankar_Raja_at_the_66th_Filmfare_Awards_South.jpg", 
    img: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200", 
    desc: "U1 Live in Concert. Relive the cult classics and the BGM king's greatest hits." 
  },
  { 
    id: 4, 
    name: "Santhosh Narayanan", 
    price: 3200, 
    status: "NEWLY ADDED",
    venue: "Codissia, Coimbatore",
    profile: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Santhosh_Narayanan_at_the_63rd_Filmfare_Awards_South.jpg/440px-Santhosh_Narayanan_at_the_63rd_Filmfare_Awards_South.jpg", 
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200", 
    desc: "Experience the raw power of 'Neeye Oli' and folk fusion live with SaNa and his band." 
  },
];

const BookingSystem = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState(INITIAL_DATA);
  const [activeHero, setActiveHero] = useState(INITIAL_DATA[0]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const ticketRef = useRef(null);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = INITIAL_DATA.filter(a => 
      a.name.toLowerCase().includes(term) || a.venue.toLowerCase().includes(term)
    );
    setArtists(filtered);
    if(filtered.length > 0) setActiveHero(filtered[0]);
  };

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800";
  };

  const handlePurchase = async () => {
    if (!formData.name || formData.phone.length < 10) return alert("Please fill valid details");
    if (selectedSeats.length === 0) return alert("Please select at least one seat");
    
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2500)); 

    const canvas = await html2canvas(ticketRef.current);
    const pdf = new jsPDF('l', 'mm', [150, 100]);
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 150, 100);
    pdf.save(`DataStreamX_Ticket_${formData.name}.pdf`);
    
    setIsProcessing(false);
    setIsDrawerOpen(false);
    alert("Booking Confirmed! Check your downloads.");
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.bgGlow1}></div>
      <div style={styles.bgGlow2}></div>

      {isProcessing && (
        <div style={styles.loaderOverlay}>
          <div style={styles.spinner}></div>
          <h2 style={styles.loaderText}>ENCRYPTING TICKET DATA...</h2>
        </div>
      )}

      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>←</button>
            <div style={styles.logo}>DATASTREAM<span style={{color: '#00f5d4'}}>X</span></div>
          </div>
          
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>🔍</span>
            <input 
              type="text" 
              placeholder="Query Stream (Artists/Venues)..." 
              style={styles.searchInput} 
              onChange={handleSearch}
            />
          </div>

          <div style={styles.locationTag}>STREAM: CHENNAI_NODE</div>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.heroSection}>
          <img src={activeHero.img} style={styles.heroImg} onError={handleImageError} alt="Hero" />
          <div style={styles.heroOverlay}>
            <div style={styles.statusPill}>{activeHero.status}</div>
            <h1 style={styles.heroTitle}>{activeHero.name}</h1>
            <p style={styles.heroSub}>{activeHero.venue}</p>
            <p style={styles.heroDesc}>{activeHero.desc}</p>
            <button style={styles.mainBtn} onClick={() => { setSelectedArtist(activeHero); setIsDrawerOpen(true); }}>
              INITIALIZE BOOKING • ₹{activeHero.price}
            </button>
          </div>
        </div>

        <h2 style={styles.sectionTitle}>ACTIVE_STREAMS</h2>
        <div style={styles.artistRail}>
          {artists.map(artist => (
            <div 
              key={artist.id} 
              style={{
                ...styles.artistCard, 
                border: activeHero.id === artist.id ? '2px solid #00f5d4' : '1px solid #9b5de533',
                background: activeHero.id === artist.id ? 'rgba(155, 93, 229, 0.1)' : '#0a0a0a'
              }}
              onClick={() => setActiveHero(artist)}
            >
              <img src={artist.profile} style={styles.cardCircle} onError={handleImageError} alt={artist.name} />
              <h4 style={{margin: '10px 0 5px 0', fontSize: '15px', color: '#fff'}}>{artist.name}</h4>
              <p style={{fontSize: '10px', color: '#00f5d4', letterSpacing: '1px'}}>{artist.venue.split(',')[0].toUpperCase()}</p>
            </div>
          ))}
        </div>
      </main>

      {isDrawerOpen && (
        <div style={styles.drawerWrapper}>
          <div style={styles.drawerOverlay} onClick={() => setIsDrawerOpen(false)}></div>
          <div style={styles.drawerCard}>
            <div style={styles.drawerHeader}>
              <h3 style={{margin: 0, color: '#00f5d4'}}>NODE_RESERVATION</h3>
              <button onClick={() => setIsDrawerOpen(false)} style={styles.closeBtn}>✕</button>
            </div>
            
            <div style={styles.seatMap}>
              {Array.from({length: 32}).map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedSeats(prev => prev.includes(i+1) ? prev.filter(s => s !== i+1) : [...prev, i+1])}
                  style={{
                    ...styles.seat,
                    backgroundColor: selectedSeats.includes(i+1) ? '#00f5d4' : 'transparent',
                    border: selectedSeats.includes(i+1) ? '1px solid #00f5d4' : '1px solid #9b5de544',
                    boxShadow: selectedSeats.includes(i+1) ? '0 0 15px rgba(0, 245, 212, 0.4)' : 'none',
                    color: selectedSeats.includes(i+1) ? '#000' : '#9b5de5'
                  }}
                >{i+1}</div>
              ))}
            </div>

            <div style={styles.formSection}>
              <input type="text" placeholder="IDENTITY_NAME" style={styles.input} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="tel" placeholder="UPLINK_MOBILE" style={styles.input} onChange={e => setFormData({...formData, phone: e.target.value})} />
              <div style={styles.summaryRow}>
                <span style={{color: '#9b5de5'}}>DATA_VALUE</span>
                <span style={{fontSize: '22px', color: '#00f5d4', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,245,212,0.3)'}}>₹{(selectedSeats.length * (selectedArtist?.price || 0)).toLocaleString()}</span>
              </div>
              <button style={styles.purchaseBtn} onClick={handlePurchase}>EXECUTE_PURCHASE</button>
            </div>
          </div>
        </div>
      )}

      <div ref={ticketRef} style={styles.pdfHidden}>
        <div style={{background: '#050505', padding: '40px', color: '#fff', border: '8px solid #00f5d4', borderRadius: '10px', width: '500px', fontFamily: 'monospace'}}>
           <h1 style={{letterSpacing: '8px', color: '#00f5d4', borderBottom: '2px solid #9b5de5', paddingBottom: '10px'}}>DATASTREAMX_AUTH</h1>
           <h2 style={{fontSize: '24px', color: '#9b5de5'}}>{selectedArtist?.name.toUpperCase()}</h2>
           <p>NODE_LOC: {selectedArtist?.venue}</p>
           <p>USER_ID: {formData.name}</p>
           <p>SEAT_BLOCKS: {selectedSeats.join(', ')}</p>
           <div style={{marginTop: '40px', fontSize: '10px', color: '#00f5d4'}}>SECURE_STREAM_TOKEN_2026_GENERIC</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  appContainer: { backgroundColor: '#050505', color: '#fff', minHeight: '100vh', position: 'relative', overflowX: 'hidden', fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" },
  bgGlow1: { position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(155, 93, 229, 0.15) 0%, transparent 70%)', zIndex: 0 },
  bgGlow2: { position: 'absolute', bottom: '10%', left: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(0, 245, 212, 0.1) 0%, transparent 70%)', zIndex: 0 },
  nav: { padding: '15px 40px', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(20px)', borderBottom: '1px solid #9b5de533', background: 'rgba(5, 5, 5, 0.7)' },
  navInner: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' },
  searchWrapper: { position: 'relative', width: '30%' },
  searchIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#00f5d4' },
  searchInput: { width: '100%', padding: '12px 12px 12px 45px', background: '#000', border: '1px solid #9b5de555', borderRadius: '4px', color: '#00f5d4', outline: 'none', fontSize: '13px' },
  backBtn: { background: 'transparent', border: '1px solid #9b5de5', color: '#9b5de5', width: '35px', height: '35px', borderRadius: '4px', cursor: 'pointer' },
  logo: { fontSize: '22px', fontWeight: '800', letterSpacing: '4px', color: '#9b5de5' },
  locationTag: { fontSize: '10px', border: '1px solid #00f5d4', padding: '4px 10px', borderRadius: '2px', color: '#00f5d4', fontWeight: 'bold' },
  main: { maxWidth: '1400px', margin: '0 auto', padding: '30px', position: 'relative', zIndex: 1 },
  heroSection: { height: '520px', borderRadius: '10px', overflow: 'hidden', position: 'relative', marginBottom: '50px', border: '1px solid #9b5de533' },
  heroImg: { width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 },
  heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to right, #050505 30%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px' },
  statusPill: { border: '1px solid #9b5de5', color: '#9b5de5', padding: '3px 10px', borderRadius: '2px', fontSize: '11px', fontWeight: 'bold', width: 'fit-content', marginBottom: '20px', background: 'rgba(155, 93, 229, 0.1)' },
  heroTitle: { fontSize: '4.5rem', margin: '0 0 10px 0', fontWeight: '900', letterSpacing: '-3px' },
  heroSub: { color: '#00f5d4', fontSize: '18px', marginBottom: '15px', fontWeight: 'bold' },
  heroDesc: { color: '#888', maxWidth: '500px', marginBottom: '35px', lineHeight: '1.6', fontSize: '15px' },
  mainBtn: { background: '#9b5de5', color: '#fff', border: 'none', padding: '18px 40px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s', boxShadow: '0 5px 15px rgba(155, 93, 229, 0.4)' },
  sectionTitle: { fontSize: '12px', marginBottom: '25px', color: '#9b5de5', letterSpacing: '4px', borderLeft: '3px solid #00f5d4', paddingLeft: '15px' },
  artistRail: { display: 'flex', gap: '25px', paddingBottom: '20px', overflowX: 'auto' },
  artistCard: { minWidth: '190px', padding: '25px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', transition: '0.3s' },
  cardCircle: { width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '15px', border: '2px solid #9b5de5' },
  drawerWrapper: { position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  drawerOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' },
  drawerCard: { position: 'relative', width: '420px', background: '#050505', border: '1px solid #9b5de5', borderRadius: '4px', padding: '40px', boxShadow: '0 0 40px rgba(155,93,229,0.2)' },
  drawerHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '35px', alignItems: 'center' },
  closeBtn: { background: 'none', border: 'none', color: '#9b5de5', fontSize: '24px', cursor: 'pointer' },
  seatMap: { display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '10px', margin: '25px 0' },
  seat: { height: '35px', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', cursor: 'pointer', transition: '0.2s' },
  input: { width: '100%', padding: '15px', background: '#000', border: '1px solid #9b5de555', color: '#fff', marginBottom: '15px', outline: 'none', borderRadius: '2px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px' },
  purchaseBtn: { width: '100%', marginTop: '25px', background: '#00f5d4', color: '#000', border: 'none', padding: '18px', borderRadius: '4px', fontWeight: '900', cursor: 'pointer' },
  loaderOverlay: { position: 'fixed', inset: 0, zIndex: 2000, background: '#050505', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  loaderText: { marginTop: '20px', letterSpacing: '5px', fontSize: '12px', color: '#00f5d4', fontWeight: 'bold' },
  spinner: { width: '50px', height: '50px', border: '2px solid #111', borderTopColor: '#00f5d4', borderRadius: '50%', animation: 'spin 1s linear infinite' },
  pdfHidden: { position: 'absolute', left: '-9999px' }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin { to { transform: rotate(360deg); } }
  ::-webkit-scrollbar { height: 4px; }
  ::-webkit-scrollbar-thumb { background: #9b5de5; border-radius: 10px; }
`;
document.head.appendChild(styleSheet);

export default BookingSystem;