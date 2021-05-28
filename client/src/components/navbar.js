import React from 'react';
import './navbar.css';
import {
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ user /* setUser */ }) {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/"><h1>35L Project</h1></Link>
        <div>
          <button type="button">
            <Link to="/new-post">New Post</Link>
          </button>
          {user ? (
            <button
              type="button"
              onClick={() => {
                user.logOut();
                window.location.reload();
                // setUser(null);
              }}
            >
              Sign Out
            </button>
          ) : (
            <button type="button">
              <Link to="/login">Login</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  // setUser: PropTypes.func.isRequired,
};

export default Navbar;
