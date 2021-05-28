import React from 'react';
import './navbar.css';
import {
  Link,
} from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/"><h1>35L Project</h1></Link>
        <div>
          <button type="button">
            <Link to="/new-post">New Post</Link>
          </button>
          <button type="button">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
