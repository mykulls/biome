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
      <div className="details-top">
        <div className="listing-info">
          <h1>{listing.address}</h1>
          <br />
          <div className="posted-by" />
          <p>
            {`Posted by: ${listing.user}`}
          </p>
          <br />
          <div className="price" />
          <div className="facts" />
        </div>
        <img alt="Listing" />
      </div>
      <div className="description">
        <p>
          {`Description: ${listing.description}`}
        </p>
        <br />
      </div>
      <div className="comments">
        <h2>Comments</h2>
        <label htmlFor="comment">
          <span>Add comment:</span>
          <textarea
            id="comment"
            rows="4"
            cols="50"
            placeholder={user ? 'Type your comment here' : 'Sign in to post a comment!'}
            onChange={(e) => setComment(e.target.value)}
            disabled={!user}
          />
        </label>
        {comment && <button type="submit" onClick={() => { onSubmit(); }}>Post</button>}
        {listing.comments && listing.comments.map((c) => (
          <p key={c.id}>
            {`${c.comment} commented by ${c.name} on 
            ${new Date(c.createdAt).toLocaleDateString('en-us')} at 
            ${new Date(c.createdAt).toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })}`}
          </p>
        ))}
      </div>
    </div>
  );
}
