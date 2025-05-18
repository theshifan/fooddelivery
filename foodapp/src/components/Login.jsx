import React, { useState } from 'react'
import './css/login.css'
import {  useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] =useState('');
  const [password, setPassword]= useState('');
  const [error, setError] = useState('');

  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try{
      const response = await fetch('http://localhost:8000/token/',{
        method : 'POST',
        headers : {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        // Save the access token (and optionally the refresh token)
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        // console.log('Login successful:', data);
        navigate('/menu')
        // Redirect or update UI accordingly
      } else {
        const errData = await response.json();
        setError(errData.detail || 'Login failed');
      }
    }catch (err) {
      console.error('Error:', err);
      setError('An error occurred while logging in');
    }
  };
    return (
    <>
         <div className="login-container">
    <div className="login-box">
      <div className="form-section">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
          <p>Username</p>
          <input type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"  className="input-field"/>
        </label>
        <label>
          <p>Password</p>
          <input type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e)=> setPassword(e.target.value)} />
        </label>
        <div>
          <button className="login-btn" type="submit">Login</button>
        </div>
        </form>
         {/* Show error message if login fails */}
         {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="divider"></div>
        <div style={{ "textAlign": "center"}}>OR</div>

        <button className="google-btn">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google icon" />
          Login with Google
        </button>

        <a href="#" className="forgot-password">Forget password?</a>

        <p>If you don't have an account..</p>
        <button className="register-btn">Register</button>
      </div>

      <div className="image-section">
        <img src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Login visual" />
      </div>
    </div>
  </div>
    </>
  )
}

export default Login