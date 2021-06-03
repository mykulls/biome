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
        <Link to="/">
          <div className="navbar-logo">
            <img src="../logo.svg" alt="logo" className="logo" />
            <h2>biome</h2>
          </div>
        </Link>
        <div className="navbar-buttons">
          <button type="button">
            <Link to="/new-post">New Post</Link>
          </button>
          {user ? (
            <button type="button">
              <Link to={`/profile/${user.id}`}>Account</Link>
            </button>
          ) : null}
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
  user: PropTypes.object,
  // setUser: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  user: null,
};

export default Navbar;
