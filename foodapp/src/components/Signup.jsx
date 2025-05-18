import React, { useState } from 'react';
import './css/signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constans';
import api from '../api';

function Signup() {
  const [username, setUsername] = useState('');
  // const [firstname, setFirstname] = useState('');
  // const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [conditionsAgreed, setConditionsAgreed] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (!conditionsAgreed) {
      alert('Please agree to the Terms & Conditions.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/api/register/', {
        username,
        // first_name: firstname,
        // last_name: lastname,
        email,
        password,
      });

      // Auto login after registration (optional)
      if (res.data.access && res.data.refresh) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate('/login');
      } else {
        alert('Account created successfully. Please log in.');
        navigate('/login');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="container-1">
        <div className="left">
          <div className="overlay-text">
            <h2>Capturing Moments,</h2>
            <h2>Creating Memories</h2>
          </div>
        </div>
        <div className="right">
          <div className="form-container">
            <h1>Create an account</h1>
            <p>
              Already have an account? <a href="/login">Log in</a>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="name-fields">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
                {/* <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="First name"
                  required
                />
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Last name"
                  required
                /> */}
              </div>
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
                placeholder="Enter your password"
                required
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={conditionsAgreed}
                  onChange={() => setConditionsAgreed(!conditionsAgreed)}
                />
                I agree to the <a href="#">Terms & Conditions</a>
              </label>
              <button type="submit" disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </form>
            <div className="divider">
              <span>Or register with</span>
            </div>
            <div className="social-buttons">
              <button className="google">G Google</button>
              <button className="apple"> Apple</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
