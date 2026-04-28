import { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ 1. Hardcoded Admin Access (Master Override)
    if (email === "admin@datastreamx.com" && password === "admin123") {
      localStorage.setItem('dsx_token', 'admin-session-active');
      localStorage.setItem('user_role', 'admin');
      navigate('/admin'); 
      return; 
    }

    try {
      // ✅ 2. Standard User Authentication via Spring Boot
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const message = await response.text();

      if (message === "Login successful!") {
        localStorage.setItem('dsx_token', 'session_active');
        localStorage.setItem('user_role', 'user');
        navigate('/dashboard');
      } else {
        alert("ACCESS_DENIED: " + message);
      }
    } catch (error) {
      console.error("UPLINK_ERROR:", error);
      alert("CRITICAL_SYSTEM_OFFLINE: Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <img src={logo} alt="Logo" className="logo" />
      <h2 className="title">DataStream<span className="brand-purple">X</span></h2>
      {/* <p className="subtitle">SYSTEM_AUTHENTICATION_V1</p> */}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="email">Identity Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="identity@datastreamx.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Access Key</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "VALIDATING..." : "AUTHORIZE_ACCESS"}
        </button>
        
        <p className="signup-link">
          New node? <Link to="/SignUp" className="brand-purple">Register Identity</Link>
        </p>
      </form>
    </div>
  );
}