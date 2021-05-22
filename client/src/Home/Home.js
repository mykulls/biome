/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './Home.css';
import axios from 'axios';
import NewPost from '../NewPost/NewPost';

const origin = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';
// replace production with the deploy link later

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get(`${origin}/listings`)
      .then((res) => {
        setListings(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <div className="home">
      {listings.map((l) => (
        <div className="post" key={l._id}>{l.address}</div>
      ))}
      <NewPost />
    </div>
  );
}
