/* eslint-disable class-methods-use-this */
import React from 'react';
import './Post.css';
import PropTypes from 'prop-types';

export default function Post({ listing }) {
  return (
    <div className="card">
      <img className="photo" src="https://i.imgur.com/dVXUsOg.jpg" alt="Post" />
      <div className="text">
        <div className="top">
          <h3>{listing.address}</h3>
          <button type="button" className="fav">★</button>
        </div>
        {/* replace this with real details later */}
        <ul>
          <li>2 people</li>
          <li>1 bedroom, 1 bathroom</li>
          <li>kitchen, laundry, onsite parking</li>
          <li>less than 1 mi from campus</li>
        </ul>
        <div className="bottom">
          <p>$1250 / month</p>
          <button type="button">Details</button>
          {/* <div className="date">
                        <p>Posted May 15</p>
                    </div> */}
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  listing: PropTypes.object.isRequired,
};
