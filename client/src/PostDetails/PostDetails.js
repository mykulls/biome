import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetails.css';
import axios from 'axios';

const origin = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';
// replace production with the deploy link later

export default function PostDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState({});

  useEffect(() => {
    axios.get(`${origin}/listing/${id}`)
      .then((res) => {
        setListing(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [id]);

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
      <div className="comments" />
    </div>
  );
}
