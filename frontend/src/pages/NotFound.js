import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Optional: for specific Not Found page styling

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="go-home-button">
        Go to Home Page
      </Link>
    </div>
  );
}

export default NotFound;
