import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

function Navig() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refresh');

    if (!refreshToken) {
      alert("No refresh token found. You may already be logged out.");
      return;
    }

    try {
      // Make the POST request to the Django backend
      await axios.post('http://localhost:8000/logout/', {
        refresh_token: refreshToken,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Remove tokens from localStorage
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');

      // Show a success message
      alert("Logged out successfully");

      // Navigate to login page using useNavigate
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
      alert("Error logging out");
    }
  };

  return (
    <div className="container-fluid fixed-top px-0 wow fadeIn" data-wow-delay="0.1s">
      <nav className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
        <a href="/" className="navbar-brand ms-4 ms-lg-0">
          <h1 className="fw-bold text-primary m-0">
            F<span className="text-secondary">oo</span>dy
          </h1>
        </a>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <a href="/Home" className="nav-item nav-link active">Home</a>
            <a href="/Menu" className="nav-item nav-link">Menu</a>
            <a href="/About" className="nav-item nav-link">About Us</a>
            <a href="/Book Table" className="nav-item nav-link">Book table</a>
            <a href="/Trackorder" className="nav-item nav-link">Track order</a>
            <a href="/contact" className="nav-item nav-link">Contact Us</a>
          </div>

          <div className="d-none d-lg-flex ms-2 align-items-center">
            <a className="btn-sm-square bg-white rounded-circle ms-3" href="#">
              <small className="fa fa-search text-body"></small>
            </a>
            <a className="btn-sm-square bg-white rounded-circle ms-3" href="#">
              <small className="fa fa-user text-body"></small>
            </a>
            <a className="btn-sm-square bg-white rounded-circle ms-3" href="/cart">
              <small className="fa fa-shopping-bag text-body"></small>
            </a>

            <button
              onClick={handleLogout}
              className="ms-3"
              style={{
                padding: '8px 16px',
                backgroundColor: '#e63946',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navig;
