import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css"; // Simple CSS for styling

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Note App
        </Link>
        <nav>
          {currentUser ? (
            <>
              <span>Welcome, {currentUser.username || currentUser.email}!</span>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
