import React from 'react';
import ReactDOM from 'react-dom';
import './navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-container">
                <h1>35L Project</h1>
                <div>
                    <button>New Post</button>
                    <button>Account</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
