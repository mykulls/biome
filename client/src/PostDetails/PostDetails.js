import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PostDetails.css';
import axios from 'axios';
import mongoose from 'mongoose';
import { origin, app } from '../exports';

export default function PostDetails() {
  const user = app.currentUser;
  const { id } = useParams();
  const [listing, setListing] = useState(null);
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
  }, [user]);

  function onSubmit() {
    if (!user) {
      alert('You must be logged in to post a comment');
      return;
    }
    const name = `${userCred.firstName} ${userCred.lastName}`;
    const userHash = app.currentUser.id;
    const commentObj = {
      $push: {
        comments: {
          id: new mongoose.Types.ObjectId(),
          userHash,
          comment,
          name,
          createdAt: new Date(),
        },
      },
    };

    axios.patch(`${origin}/updateListing/${id}`, commentObj)
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  if (!listing) return null;

  return (
    <div className="details-container">
      <div className="details-listing">
        <h1>{listing.address}</h1>
        <h3>{`${listing.city}, ${listing.state}`}</h3>
        <img className="details-photo" src={`${origin}/images/${listing.images[0].filename}`} alt="listing" />
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
        <p>
          <b>Description:&nbsp;</b>
          {`${listing.description}`}
        </p>
        <p className="details-rent">{`$${listing.rent} / month`}</p>
        <Link to={`/profile/${listing.userHash}`}>{`Posted by ${listing.user}`}</Link>
      </div>
      <div className="comments">
        <h2>Comments</h2>
        {listing.comments && listing.comments.map((c) => (
          <div key={c.id}>
            <div className="comment">
              <p className="name">
                <Link to={`/profile/${c.userHash}`}>{`${c.name}`}</Link>
                {` on ${new Date(c.createdAt).toLocaleDateString('en-us')} at 
            ${new Date(c.createdAt).toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })}:`}
              </p>
              <p>{c.comment}</p>
            </div>
          </div>
        ))}
        <label htmlFor="comment">
          <div className="name">Post comment:</div>
          <textarea
            id="comment"
            rows="4"
            cols="50"
            placeholder={user ? 'Type your comment here' : 'Login to comment'}
            onChange={(e) => setComment(e.target.value)}
            disabled={!user}
          />
        </label>
        {comment && <button type="submit" onClick={() => { onSubmit(); }}>Post</button>}
      </div>
    </div>
  );
}
