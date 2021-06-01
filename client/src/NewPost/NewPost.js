import React, { useState, useEffect } from 'react';
import './NewPost.css';
import axios from 'axios';
import { origin, app } from '../exports';

const user = app.currentUser;

export default function NewPost() {
  //  const [user, setUser] = useState(); // for linking the user's id to a listing in mongo
  const [newListing, setListing] = useState({
    state: 'CA',
    school: 'UCLA',
    people: 1,
    bedrooms: 1,
    bathrooms: 1,
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [userCred, setUser] = useState({});

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
  }, []);

  function handleSubmit(event) {
    if (!user) {
      alert('You must be signed in to post!');
      return;
    }
    event.preventDefault(); // prevents reloading after every submit

    if (!newListing.address || !newListing.city || !newListing.state
      || !newListing.zip || !newListing.distance || !newListing.school
      // || !newListing.kitchen || !newListing.laundry || !newListing.parking
      || !newListing.people || !newListing.bedrooms || !newListing.bathrooms
      || !newListing.description) {
      setError('Please fill in all required fields');
    } else if (newListing.zip && (newListing.zip.length !== 5 || !/^\d+$/.test(newListing.zip))) {
      setError('Please input a valid zip code!');
    } else if (newListing.rent && (!/^\d+$/.test(newListing.rent))) {
      setError('Please input a valid rent price!');
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
    newListing.user = (`${userCred.firstName} ${userCred.lastName}`);
    setError('');
    if (key === 'kitchen' || key === 'parking' || key === 'laundry') {
      if (document.getElementById(key).checked) {
        setListing({ ...newListing, [key]: true });
      } else {
        setListing({ ...newListing, [key]: false });
      }
    } else {
      setListing({ ...newListing, [key]: value });
    }
  }

  return (
    <div className="new-post">
      <form className="postmaker" onSubmit={handleSubmit}>
        <label htmlFor="address">
          Street Address:&nbsp;
          <input type="text" id="address" onChange={(e) => handleChange('address', e.target.value)} />
        </label>
        <label htmlFor="city">
          City:&nbsp;
          <input type="text" id="city" onChange={(e) => handleChange('city', e.target.value)} />
        </label>
        <label htmlFor="state">
          State:&nbsp;
          <select id="state" onChange={(e) => handleChange('state', e.target.value)}>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA" selected>California</option>
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
        <label htmlFor="zipcode">
          Zip Code:&nbsp;
          <input type="text" id="zipcode" onChange={(e) => handleChange('zip', e.target.value)} />
        </label>
        <label htmlFor="distance">
          Distance from campus: &nbsp;
          <input type="text" id="distance" onChange={(e) => handleChange('distance', e.target.value)} />
        </label>
        <label htmlFor="school">
          School:&nbsp;
          <select id="school" onChange={(e) => handleChange('school', e.target.value)}>
            <option value="UCLA">UCLA</option>
            <option value="USC">USC</option>
          </select>
        </label>
        <label htmlFor="kitchen">
          <input type="checkbox" id="kitchen" onChange={(e) => handleChange('kitchen', e.target.value)} />
          Kitchen
        </label>
        <label htmlFor="laundry">
          <input type="checkbox" id="laundry" onChange={(e) => handleChange('laundry', e.target.value)} />
          Laundry
        </label>
        <label htmlFor="parking">
          <input type="checkbox" id="parking" onChange={(e) => handleChange('parking', e.target.value)} />
          Parking
        </label>
        <label htmlFor="rent">
          Rent ($ per month): $&nbsp;
          <input type="text" id="rent" onChange={(e) => handleChange('rent', e.target.value)} />
        </label>
        <label htmlFor="details">
          People:&nbsp;
          <select id="people" onChange={(e) => handleChange('people', e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
          </select>
          &emsp;Bedrooms:&nbsp;
          <select id="bedrooms" onChange={(e) => handleChange('bedrooms', e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
          </select>
          &emsp;Bathrooms:&nbsp;
          <select id="bathrooms" name="bathrooms" onChange={(e) => handleChange('bathrooms', e.target.value)}>
            <option value={1}>1</option>
            <option value={1.5}>1.5</option>
            <option value={2}>2</option>
            <option value={2.5}>2.5</option>
            <option value={3}>3</option>
            <option value={3.5}>3.5</option>
            <option value={4}>4</option>
            <option value={4.5}>4.5</option>
            <option value={5}>5</option>
            <option value={5.5}>5.5</option>
            <option value={6}>6</option>
            <option value={6.5}>6.5</option>
            <option value={7}>7</option>
            <option value={7.5}>7.5</option>
            <option value={8}>8</option>
            <option value={8.5}>8.5</option>
            <option value={9}>9</option>
          </select>
        </label>
        <label htmlFor="description">
          Description:&nbsp;
          <textarea id="description" rows="4" cols="50" onChange={(e) => handleChange('description', e.target.value)} />
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
