import { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function SignUp() {
  const navigate = useNavigate();
  
  // 1. State for form inputs (Added 'name')
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Client-side validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // 3. POST request including the 'name' field
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email, 
          password 
        }),
      });

      const message = await response.text();

      if (response.ok && message === "User registered successfully!") {
        // 4. Success handling
        alert("Welcome to DataStreamX, " + name + "!");
        
        // Set session token for dashboard access
        localStorage.setItem('dsx_token', 'session_active');
        localStorage.setItem('dsx_user_name', name);
        
        navigate('/Dashboard'); 
      } else {
        // Handle backend-specific errors (e.g., "Email already exists")
        alert(message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("CRITICAL_UPLINK_FAILURE: Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <img src={logo} alt="Logo" className="logo" />
      <h2 className="title">Create Identity</h2>
      {/* <p className="subtitle">JOIN_THE_STREAM_V1</p> */}

      <form onSubmit={handleSubmit} className="form">
        {/* IDENTITY_NAME FIELD */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* EMAIL FIELD */}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="identity@datastreamx.com"
            required
          />
        </div>

        {/* PASSWORD FIELD */}
        <div className="form-group">
          <label htmlFor="password">Access Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        {/* CONFIRM PASSWORD FIELD */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Verify Password</label>
          <input
            className="input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "INITIALIZING..." : "AUTHORIZE_REGISTRATION"}
        </button>

        <p className="signup-link">
          Already verified? <Link to="/login" className="brand-purple">Login</Link>
        </p>
      </form>
    </div>
  );
}