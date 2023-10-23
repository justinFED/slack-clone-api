import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from '../../services/authService';
import './Login.css'
import logo from '../../assets/logo.png'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await authService.login(email, password);

      if (response.status === 200) {
        navigate('/home');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred while logging in');
    }
  }

  return (
    <div className="login">
    <div className="log-container">
      <img src={logo} alt="" />
      <h2 className="log-header">Login</h2>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>
      <div className="form-group">
      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      <button className="log-button" onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/">Register</Link>
      </p>
    </div>
    </div>
  );
}

export default Login;
