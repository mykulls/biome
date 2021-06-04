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
          <img src="https://sahabatperubahan.com/wp-content/uploads/2021/03/placeholder-profile-sq.jpg" width="200" alt="" />
        </div>
        <div className="profile-nav-info">
          <h3 className="user-name">{`${user.firstName} ${user.lastName}`}</h3>
          <div className="address">
            <p className="state"> Los Angeles </p>
            <span className="city">California</span>
          </div>
        </div>
      </div>
      <div className="main-bd">
        <div className="left-side">
          <div className="profile-side">
            <h1> Personal Information </h1>
            <h2> Phone Number </h2>
            <p className="mobile-no">
              {user.phoneNumber}
            </p>
            <h2> Email </h2>
            <p className="user-mail">
              {user.email}
            </p>
          </div>
        </div>
        <div className="right-side">
          <div className="nav">
            <ul>
              <li className="user-post active">
                Posts
              </li>
              <li className="user-post active">
                {app.currentUser && app.currentUser.id === user._id && (<p>Saved Posts</p>)}
              </li>
            </ul>
          </div>
          <div className="profile-body">
            <div className="profile-body-left">
              {listings && listings.map((l) => (<Post key={`post${l._id}`} listing={l} />))}
            </div>
            <div className="profile-body-right">
              {app.currentUser && app.currentUser.id === user._id && savedListings
              && savedListings.map((l) => (<Post key={`saved${l._id}`} listing={l} />))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
