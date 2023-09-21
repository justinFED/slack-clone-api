import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Register.css'
import logo from '../../assets/logo.png'


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await authService.register(email, password, confirmPassword);
  
      if (response.status === 200) {
        navigate('/login');
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration');
    }
  }

  return (
    <div className="register">
    <div className="auth-container">
    <img src={logo} alt="logo" />
      <h2 className="signup-header">Register</h2>

      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label className="register-label">Email</label>
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
      <div className="form-group">
      <label>Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      </div>
      <button className="register-button" onClick={handleRegister}>Register</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
   
    </div>
   
  );
}

export default Register;
