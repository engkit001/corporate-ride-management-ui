import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  let username = null;
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.sub || decoded.username;
      role = decoded.role;
    } catch (e) {
      console.error("Invalid token", e);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  // Hide header on login page
  if (location.pathname === "/login") {
    return null;
  }

  return (
    <header className="bg-dark text-white">
      {/* Top Row - Centered Brand */}
      <div className="text-center py-2">
        <h4 className="m-0">Corporate Ride Management System</h4>
      </div>

      {/* Bottom Row - Links & User Info */}
      <nav className="navbar navbar-dark bg-dark px-3 d-flex">
        <div className="d-flex align-items-center">
          {token && (
            <div className="d-flex align-items-center me-4">
              <Link to="/rides" 
                    className="nav-link text-white"
                    onClick={() => window.dispatchEvent(new Event('refreshRides'))}
              >
                Rides
              </Link>
            </div>
          )}
          {token && role === "ADMIN" && (
            <div className="d-flex align-items-center me-4">
              <Link to="/drivers" 
                    className="nav-link text-white"
                    onClick={() => window.dispatchEvent(new Event('refreshDrivers'))}
              >
                Drivers
              </Link>
            </div>
          )}
          {token && role === "ADMIN" && (
            <div className="d-flex align-items-center me-4">
              <Link to="/users" 
                    className="nav-link text-white"
                    onClick={() => window.dispatchEvent(new Event('refreshUsers'))}
              >
                Users
              </Link>
            </div>
          )}
        </div>
        
        {/* Right-aligned Logout */}
        {token && (
          <div className="d-flex align-items-center ms-auto">
            <span className="me-3">Logged in as: {username}</span>
            <button onClick={handleLogout} className="btn btn-danger btn-sm">
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;