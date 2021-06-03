import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetails.css';
import axios from 'axios';
import mongoose from 'mongoose';
import { origin, app } from '../exports';

export default function PostDetails() {
  const user = app.currentUser;
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
  }, [user]);

  function onSubmit() {
    if (!user) {
      alert('You must be logged in to post a comment');
      return;
    }
    const name = `${userCred.firstName} ${userCred.lastName}`;

    const commentObj = {
      $push: {
        comments: {
          id: new mongoose.Types.ObjectId(),
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

  return (
    <div className="details-container">
      <div className="details-listing">
        <h1>{listing.address}</h1>
        <h3>{`${listing.city}, ${listing.state}`}</h3>
        <img className="details-photo" src="https://i.imgur.com/dVXUsOg.jpg" alt="listing" />
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
        <p className="details-op">{`Posted by ${listing.user}`}</p>
      </div>
      <div className="comments">
        <h2>Comments</h2>
        {listing.comments && listing.comments.map((c) => (
          <div key={c.id}>
            <div className="comment">
              <p className="name">
                {`${c.name} on 
            ${new Date(c.createdAt).toLocaleDateString('en-us')} at 
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
