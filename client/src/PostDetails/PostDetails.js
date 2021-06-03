import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetails.css';
import axios from 'axios';
import mongoose from 'mongoose';
import { origin, app } from '../exports';

export default function PostDetails() {
  document.title = 'Biome | Post Details';

  const user = app.currentUser;
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [comment, setComment] = useState('');
  const [userCred, setUser] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`${origin}/listings/${id}`)
      .then((res) => {
        setListing(res.data);
        res.data.images.forEach((i, index) => {
          setImages((old) => [...old, (
            <div key={i.filename} className={index ? 'mySlides' : 'mySlides show'}>
              <img className="details-photo" src={`${origin}/images/${i.filename}`} alt="listing-img" />
            </div>
          )]);
        });
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

  useEffect(() => {
    if (listing && listing.images.length === images.length) {
      let slideIndex = 1;
      const interval = setInterval(() => {
        const slides = document.getElementsByClassName('mySlides');
        if (slides.length > 1) {
          slides[slideIndex].classList.add('fade', 'show');
          if (slideIndex === 0) {
            slides[slides.length - 1].remove('show');
          } else {
            slides[slideIndex - 1].classList.remove('show');
          }
          if (slideIndex === slides.length - 1) {
            slideIndex = 0;
          } else {
            slideIndex += 1;
          }
        }
      }, 5000);
      return () => clearInterval(interval);
    }

    return null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing, images]);

  if (!listing || (listing && listing.images.length !== images.length)) return null;

  return (
    <div className="details-container">
      <div className="details-listing">
        <h1>{listing.address}</h1>
        <h3>{`${listing.city}, ${listing.state}`}</h3>
        <div className="slideshow-container">
          {images}
        </div>
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
        <p className="details-op">
          Posted by&nbsp;
          <b>{listing.user}</b>
        </p>
      </div>
      <div className="comments">
        <h2>Comments</h2>
        {listing.comments && listing.comments.map((c) => (
          <div key={c.id}>
            <div className="comment">
              <p className="name">
                <b>{c.name}</b>
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
