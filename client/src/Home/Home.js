import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import Filter from '../components/filter';
import Post from '../components/Post';
import { origin, app } from '../exports';

export default function Home() {
  document.title = 'Biome';

  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState({
    people: '',
    bedrooms: '',
    bathrooms: '',
    distance: '',
    price: '',
    school: '',
  });
  const [savedPosts, setSaved] = useState([]);

  useEffect(() => {
    axios.get(`${origin}/listings`)
      .then((res) => {
        setListings(res.data.sort((a, b) => {
          // sort by date posted, newest first
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }

          // dates must be equal
          return 0;
        }));
      })
      .catch((e) => {
        console.log(e.message);
      });
    if (app.currentUser) {
      axios.get(`${origin}/users/${app.currentUser.id}`)
        .then((res) => {
          setSaved(res.data.savedPosts);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }, []);

  return (
    <div className="home">
      <Filter setFilter={setFilter} />
      <div className="container">
        {listings.filter((listing) => (filter.people === '' || listing.people == filter.people)
                                   && (filter.bedrooms === '' || listing.bedrooms == filter.bedrooms)
                                   && (filter.bathrooms === '' || listing.bathrooms == filter.bathrooms)
                                   && (filter.distance === '' || listing.distance <= filter.distance)
                                   && (filter.price === '' || listing.rent <= filter.price)
                                   && (filter.school === '' || listing.school === filter.school)).map((l) => (
                                     <Post key={l._id} listing={l} saved={savedPosts.includes(l._id)} setSaved={setSaved} />
        ))}
      </div>
    </div>
  );
}
