/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './PostDetails.css';
import axios from 'axios';
import { origin, app } from '../exports';

const user = app.currentUser;

export default function PostDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [comment, setComment] = useState('');
  const [userCred, setUser] = useState({});

  useEffect(() => {
    axios.get(`${origin}/listings/${id}`)
      .then((res) => {
        setListing(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [id]);

  useEffect(() => {
    if (user) {
      axios.get(`${origin}/users/${user.id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }, []);

  function onSubmit() {
    if (!user) {
      alert('You must be logged in to post a comment');
      return;
    }
    const name = `${userCred.firstName} ${userCred.lastName}`;
    // eslint-disable-next-line quote-props
    const commentObj = { $push: { comments: { comment, name } } };
    axios.patch(`${origin}/updateListing/${id}`, commentObj)
      .then((res) => {
        window.location.reload();
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  return (
    <div className="details-container">
      <div>
        <div>
          <h1>{listing.address}</h1>
          <h3>{`${listing.city}, ${listing.state}`}</h3>
        </div>
        <img className="photo" src="https://i.imgur.com/dVXUsOg.jpg" alt="listing" />
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
        </div>
      </div>
      <div className="description">
        <p>
          {`Description: ${listing.description}`}
        </p>
        <br />
      </div>
      <p>
        Posted by:
        {' '}
        {listing.user}
      </p>
      <div className="comments">
        <h2>Comments</h2>
        {listing.comments && listing.comments.map((c) => (
          <div>
            <div className="comment">{c.comment}</div>
            <div className="name">{c.name}</div>
            <br />
          </div>
        ))}
        <label htmlFor="comment">
          <span>Add comment:</span>
          <textarea id="comment" rows="4" cols="50" placeholder="Type your comment here" onChange={(e) => setComment(e.target.value)} disabled={!user} />
        </label>
        {comment && <button type="submit" onClick={() => { onSubmit(); }}>Post</button>}
      </div>
    </div>
  );
}
