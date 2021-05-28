/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetails.css';
import axios from 'axios';

const origin = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';
// replace production with the deploy link later

export default function PostDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [comment, setComment] = useState('');

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
    console.log(comment);
  }, [comment]);

  function onSubmit() {
    // TODO: get the current user (app.currentUser), save in state variable
    // if no user don't allow them to submit (textarea attribute disabled={user ? false : true})
    // maybe change the placeholder if user isn't logged in too
    // onSubmit, post the comment to the listing document
    // as an object containg the comment and the user info
  }

  return (
    <div className="details-container">
      <div className="details-top">
        <div className="listing-info">
          <h1>{listing.address}</h1>
          <div className="posted-by" />
          <div className="price" />
          <div className="facts" />
        </div>
        <img alt="Listing" />
      </div>
      <div className="description">
        <p>{listing.description}</p>
      </div>
      <div className="comments">
        <h2>Comments</h2>
        <label htmlFor="comment">
          <span>Add comment:</span>
          <textarea id="comment" rows="4" cols="50" placeholder="Type your comment here" onChange={(e) => setComment(e.target.value)} />
        </label>
        {comment && <button type="submit">Post</button>}
      </div>
    </div>
  );
}
