import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './Home.css';
import axios from 'axios';
import Filter from '../components/filter';
import Post from './Post';
import { origin } from '../exports';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState({
    people: '',
    bedrooms: '',
    bathrooms: '',
    distance: '',
    price: '',
    school: '',
  });

  useEffect(() => {
    axios.get(`${origin}/listings`)
      .then((res) => {
        setListings(res.data.sort((a, b) => {
          // sort alphabetically by school, A-Z
          if (a.school < b.school) {
            return -1;
          }
          if (a.school > b.school) {
            return 1;
          }

          // names must be equal
          return 0;
        }));
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <div className="home">
      <Filter setFilter={setFilter} />
      <div className="container">
        {listings.filter((listing) => (filter.people === '' || listing.people === filter.people)
                                   && (filter.bedrooms === '' || listing.bedrooms === filter.bedrooms)
                                   && (filter.bathrooms === '' || listing.bathrooms === filter.bathrooms)
                                   && (filter.distance === '' || listing.distance <= filter.distance)
                                   && (filter.price === '' || listing.rent <= filter.price)
                                   && (filter.school === '' || listing.school === filter.school)).map((l) => (
                                     <Post key={l._id} listing={l} />
        ))}
      </div>
    </div>
  );
}
