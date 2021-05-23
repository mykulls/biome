import React, { useState } from 'react';
import './NewPost.css';
import axios from 'axios';

const origin = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';
// replace production with the deploy link later

export default function Home() {
  //  const [user, setUser] = useState(); // for linking the user's id to a listing in mongo
  const [newListing, setListing] = useState({});
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault(); // prevents reloading after every submit
    if (!newListing.address || !newListing.city || !newListing.zip) {
      setError('Please fill in all required fields');
    } else if (newListing.zip && (newListing.zip.length !== 5 || !/^\d+$/.test(newListing.zip))) {
      setError('Please input a valid zip code!');
    } else {
      setError('');
      setSubmitting(true);
      axios.post(`${origin}/listings`, newListing)
        .then(() => {
          setSubmitting(false);

          // route this to the post details page later
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }

  function handleChange(key, value) {
    setError('');
    setListing({ ...newListing, [key]: value });
  }

  return (
    <div className="new-post">
      <form className="postmaker" onSubmit={handleSubmit}>
        <label htmlFor="fname">
          Street Address:
          <input type="text" id="fname" onChange={(e) => handleChange('address', e.target.value)} />
        </label>
        <label htmlFor="lname">
          City:
          <input type="text" id="lname" onChange={(e) => handleChange('city', e.target.value)} />
        </label>
        <label htmlFor="lname">
          Zip Code:
          <input type="text" id="lname" onChange={(e) => handleChange('zip', e.target.value)} />
        </label>
        {/* <label htmlFor="lname">
          Choose Pictures:
          <input type="file" id="myFile" name="filename" />
        </label> */}
        {/* for images later:
        https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/ */}
        <button type="submit">
          {/* possibly don't need this because it submits so fast anyways  */}
          {submitting ? <span>Submitting...</span> : <span>Submit</span>}
        </button>
        {error && <span>{error}</span>}
      </form>
    </div>
  );
}
