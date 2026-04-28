export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>About</li>
            <li>Jobs</li>
            <li>For the Record</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Community</h4>
          <ul>
            <li>For Artists</li>
            <li>Developers</li>
            <li>Advertising</li>
            <li>Investors</li>
            <li>Vendors</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Useful Links</h4>
          <ul>
            <li>Support</li>
            <li>Free Mobile App</li>
            <li>Popular by Country</li>
            <li>Import Your Music</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Plans</h4>
          <ul>
            <li>Premium Lite</li>
            <li>Premium Standard</li>
            <li>Premium Platinum</li>
            <li>Premium Student</li>
            <li>Free Plan</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 DataStreamX</p>
        <div className="footer-socials">
          <span>📸</span>
          <span>🐦</span>
          <span>📘</span>
        </div>
      </div>
    </footer>
  );
}