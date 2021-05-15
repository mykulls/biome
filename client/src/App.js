/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const origin = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';
// replace production with the deploy link later

export default function App() {
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
    <div className="App">
      <header className="App-header" />
      <main>
        {listings.map((l) => (
          <div key={l._id}>{l.name}</div>
        ))}
      </main>
    </div>
  );
    }
}
