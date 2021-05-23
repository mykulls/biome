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
          Street Address:&nbsp;
          <input type="text" id="fname" onChange={(e) => handleChange('address', e.target.value)} />
        </label>
        <label htmlFor="lname">
          City:&nbsp;
          <input type="text" id="lname" onChange={(e) => handleChange('city', e.target.value)} />
        </label>
        <label htmlFor="state">
          State:&nbsp;
          <select id="state" name="state" onChange={(e) => handleChange('state', e.target.value)}>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </label>
        <label htmlFor="lname">
          Zip Code:&nbsp;
          <input type="text" id="lname" onChange={(e) => handleChange('zip', e.target.value)} />
        </label>
        <label htmlFor="description">
          Description:&nbsp;
          <textarea id="description" name="description" rows="4" cols="50" onChange={(e) => handleChange('description', e.target.value)} />
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
