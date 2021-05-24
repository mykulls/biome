import React from 'react';
import './navbar.css';
import {
  Link,
} from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-link"><h1>35L Project</h1></Link>
        <div>
          <button type="button"><Link to="/new-post" className="nav-link">New Post</Link></button>
          <button type="button"><Link to="/login" className="nav-link">Login</Link></button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
