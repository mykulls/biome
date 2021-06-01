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
  useEffect(() => {
    if (user) {
      axios.get(`${origin}/listings/${id}`)
        .then((res) => {
          setListing(res.data);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }, [id]);
  const [userCred, setUser] = useState({});
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
  useEffect(() => {
    console.log(comment);
  }, [comment]);
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
          <br />
          <div className="posted-by" />
          <p>
            Posted by:
            {' '}
            {listing.user}
          </p>
          <br />
          <div className="price" />
          <div className="facts" />
        </div>
        <img alt="Listing" />
      </div>
      <div className="description">
        <p>
          Description:
          {' '}
          {listing.description}
        </p>
        <br />
      </div>
      <div className="comments">
        <h2>Comments</h2>
        {listing.comments && listing.comments.map((c) => (
          <p>
            {c.comment}
            {' '}
            commented by
            {' '}
            {c.name}
          </p>
        ))}
        <label htmlFor="comment">
          <span>Add comment:</span>
          <textarea id="comment" rows="4" cols="50" placeholder="Type your comment here" onChange={(e) => setComment(e.target.value)} />
        </label>
        {comment && <button type="submit" onClick={() => { onSubmit(); }}>Post</button>}
      </div>
    </div>
  );
}
