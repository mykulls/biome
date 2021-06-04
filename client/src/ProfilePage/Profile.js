/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { app, origin } from '../exports';
import Post from '../components/Post';

function Profile() {
  document.title = 'Biome | Profile';

  const [listings, setListings] = useState([]);
  const [user, setUser] = useState(null);
  const [savedListings, setSaved] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${origin}/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {
        setError(
          <div className="error">
            <h1>{e.response.data.error}</h1>
          </div>,
        );
      });
  }, [id]);

  useEffect(() => {
    if (user) {
      user.posts.forEach((p) => {
        axios.get(`${origin}/listings/${p}`)
          .then((res) => {
            if (res.data) {
              setListings((old) => [...old, res.data]);
            }
          })
          .catch((e) => {
            console.log(e.message);
          });
      });

      if (app.currentUser && app.currentUser.id === user._id && user.savedPosts.length) {
        user.savedPosts.forEach((p) => {
          axios.get(`${origin}/listings/${p}`)
            .then((res) => {
              setSaved((old) => [...old, res.data]);
            })
            .catch((e) => {
              console.log(e.message);
            });
        });
      }
    }
  }, [user]);

  if (error) {
    return error;
  }

  // if user hasn't been fetched yet, don't load this page
  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-img">
          <img src="https://i.imgur.com/uGGqlru.png" width="200" alt="pfp" />
        </div>
        <div className="profile-nav-info">
          <h1 className="user-name">{`${user.firstName} ${user.lastName}`}</h1>
          <div className="box-container">
            <p>Phone Number: &nbsp;</p>
            <div className="info-box">{user.phoneNumber}</div>
          </div>
          <div className="box-container">
            <p>Email: &nbsp;</p>
            <div className="info-box">{user.email}</div>
          </div>
        </div>
      </div>
      <h2>{`${user.firstName}'s Posts`}</h2>
      <div className="post-container">
        {listings && listings.map((l) => (<Post key={`post${l._id}`} listing={l} />))}
      </div>

      {app.currentUser && app.currentUser.id === user._id && (
      <div>
        <h2>Saved Posts</h2>
        <div className="post-container">
          {savedListings.map((l) => (<Post key={`saved${l._id}`} listing={l} />))}
        </div>
      </div>
      )}
    </div>
  );
}
export default Profile;
