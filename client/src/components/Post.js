import React from 'react';
import './Post.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { app, origin } from '../exports';

export default function Post({ listing, saved, setSaved }) {
  function setSave() {
    let newSavedPost;
    if (saved) {
      newSavedPost = { $pull: { savedPosts: listing._id } };
    } else {
      newSavedPost = { $push: { savedPosts: listing._id } };
    }
    axios.patch(`${origin}/updateUser/${app.currentUser.id}`, newSavedPost)
      .then((res) => {
        setSaved(res.data.savedPosts);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  return (
    <div className="card">
      <img className="photo" src="https://i.imgur.com/dVXUsOg.jpg" alt="Post" />
      <div className="text">
        <div className="top">
          <div className="location">
            <h3>{listing.address}</h3>
            <h4>{`${listing.city}, ${listing.state}`}</h4>
          </div>
          {app.currentUser && setSaved && (
          <button
            type="button"
            className={saved ? 'fav saved' : 'fav'}
            onClick={() => { setSave(); }}
          >
            ★
          </button>
          )}
        </div>
        <ul>
          <li>{`${listing.people} people`}</li>
          <li>
            {listing.bedrooms === 1 ? '1 bedroom, ' : `${listing.bedrooms} bedroom, `}
            {listing.bathrooms === 1 ? '1 bathroom' : `${listing.bathrooms} bathrooms`}
          </li>
          {(listing.kitchen || listing.laundry || listing.parking) && (
          <li>
            {listing.kitchen && 'kitchen'}
            {listing.kitchen && (listing.laundry || listing.parking) && ', '}
            {listing.laundry && 'laundry'}
            {listing.laundry && listing.parking && ', '}
            {listing.parking && 'onsite parking'}
          </li>
          )}
          <li>{listing.distance > 0 ? `${listing.distance} mi from ${listing.school}` : `less than 1 mi from ${listing.school}`}</li>
        </ul>
        <div className="bottom">
          <p>{`$${listing.rent} / month`}</p>
          <button type="button">
            <Link to={`/post/${listing._id}`}>Details</Link>
          </button>
          {/* <div className="date">
                        <p>Posted May 15</p>
                    </div> */}
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  listing: PropTypes.object.isRequired,
  saved: PropTypes.bool,
  setSaved: PropTypes.func,
};

Post.defaultProps = {
  saved: false,
  setSaved: null,
};
