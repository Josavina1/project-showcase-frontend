import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming your CSS is saved here

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === 'admin123') {
      setUser({ role: 'admin', email });
      navigate('/admin-dashboard');
    } else if (email === 'user@example.com' && password === 'user123') {
      setUser({ role: 'user', email });
      navigate('/user-dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="center-container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
