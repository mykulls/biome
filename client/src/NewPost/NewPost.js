import React, { useState, useEffect } from 'react';
import './NewPost.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { origin, app } from '../exports';

export default function NewPost() {
  document.title = 'Biome | New Post';
  const user = app.currentUser;

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
  const [imgAmount, setImgAmount] = useState(false);
  const [images, setImages] = useState([]);
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
  }, [user]);

  const history = useHistory();
  function handleSubmit(event) {
    event.preventDefault(); // prevents reloading after every submit

    if (!user) {
      setError('You must be signed in to post!');
      return;
    }

    if (!newListing.address || !newListing.city || !newListing.state
      || !newListing.zip || !newListing.distance || !newListing.school
      // || !newListing.kitchen || !newListing.laundry || !newListing.parking
      || !newListing.people || !newListing.bedrooms || !newListing.bathrooms
      || !newListing.description) {
      setError('Please fill in all required fields');
      console.log(newListing);
    } else if (newListing.zip && (newListing.zip.length !== 5 || !/^\d+$/.test(newListing.zip))) {
      setError('Please input a valid zip code!');
    } else if (newListing.distance && (!/^\d+$/.test(newListing.distance))) {
      setError('Please input a valid distance!');
    } else if (newListing.rent && (!/^\d+$/.test(newListing.rent))) {
      setError('Please input a valid rent price!');
    } else if (!imgAmount) {
      setError('Please upload up to a maximum of eight pictures!');
    } else {
      setError('');
      setSubmitting(true);

      axios.post(`${origin}/listings`, newListing)
        .then((res) => {
          const formData = new FormData();
          images.forEach((img) => {
            formData.append('files', img);
          });

          axios.patch(`${origin}/listingPhoto/${res.data._id}`, formData)
            .then(() => {
              const postObj = { $push: { posts: res.data._id } };
              axios.patch(`${origin}/updateUser/${user.id}`, postObj)
                .then(() => {
                  setSubmitting(false);
                  history.push(`/post/${res.data._id}`);
                });
            })
            .catch((e) => {
              console.log(e.message);
            });
        })
        .catch((e) => {
          setSubmitting(false);
          setError(e.response.data.error);
        });
    }
  }

  function handleChange(e) {
    newListing.user = (`${userCred.firstName} ${userCred.lastName}`);
    newListing.userHash = (`${app.currentUser.id}`);
    setError('');
    if (e.target.name === 'kitchen' || e.target.name === 'parking' || e.target.name === 'laundry') {
      if (document.getElementById(e.target.name).checked) {
        setListing({ ...newListing, [e.target.name]: true });
      } else {
        setListing({ ...newListing, [e.target.name]: false });
      }
    } else if (e.target.name === 'images') {
      if (e.target.files.length > 8) {
        setImgAmount(false);
      } else {
        setImages([]);
        setImgAmount(true);
        for (let x = 0; x < e.target.files.length; x += 1) {
          setImages((i) => [...i, e.target.files[x]]);
        }
      }
    } else {
      setListing({ ...newListing, [e.target.name]: e.target.value });
    }
  }

  return (
    <div className="new-post">
      <form className="postmaker" onSubmit={handleSubmit}>
        <h1>New Post</h1>
        <div className="row">
          <div className="column">
            <label htmlFor="address">
              <span>Street Address: &nbsp;</span>
              <input type="text" id="address" name="address" onChange={handleChange} />
            </label>
            <label htmlFor="city">
              <span>City: &nbsp;</span>
              <input type="text" id="city" name="city" onChange={handleChange} />
            </label>
            <label htmlFor="state">
              <span>State: &nbsp;</span>
              <select id="state" name="state" defaultValue="CA" onChange={handleChange}>
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
            <label htmlFor="zip">
              <span>Zip Code: &nbsp;</span>
              <input type="text" name="zip" id="zip" onChange={handleChange} />
            </label>
            <label htmlFor="school">
              <span>School: &nbsp;</span>
              <select id="school" name="school" onChange={handleChange}>
                <option value="UCLA">UCLA</option>
                <option value="USC">USC</option>
              </select>
            </label>
            <div>
              <span>Upload pictures: &nbsp;</span>
              <input type="file" name="images" id="images" accept="image/*" onChange={handleChange} multiple />
            </div>
            <label htmlFor="details">
              <span>People: &nbsp;</span>
              <select id="people" name="people" onChange={handleChange}>
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
              <span>&emsp;Bedrooms: &nbsp;</span>
              <select id="bedrooms" name="bedrooms" onChange={handleChange}>
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
              <span>&emsp;Bathrooms: &nbsp;</span>
              <select id="bathrooms" name="bathrooms" onChange={handleChange}>
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
            <label htmlFor="distance">
              <span>Distance from campus: &nbsp;</span>
              <input type="text" id="distance" name="distance" onChange={handleChange} />
              <span>&nbsp; miles</span>
            </label>
            <label htmlFor="rent">
              <span>Price: &nbsp;$&nbsp;</span>
              <input type="text" id="rent" name="rent" onChange={handleChange} />
              <span>&nbsp;/ month</span>
            </label>
          </div>
          <div className="column">
            <div className="checkboxes">
              <label htmlFor="kitchen">
                <input type="checkbox" id="kitchen" name="kitchen" onChange={handleChange} />
                <span>&nbsp;Kitchen</span>
              </label>
              <label htmlFor="laundry">
                <input type="checkbox" id="laundry" name="laundry" onChange={handleChange} />
                <span>&nbsp;Laundry</span>
              </label>
              <label htmlFor="parking">
                <input type="checkbox" id="parking" name="parking" onChange={handleChange} />
                <span>&nbsp;Parking</span>
              </label>
            </div>
            <label htmlFor="description">
              <p>Description:</p>
              <textarea id="description" name="description" rows="8" cols="50" onChange={handleChange} />
            </label>
            <div>
              <button className="newpost-submit" type="submit">
                {submitting ? <span>Submitting...</span> : <span>Submit</span>}
              </button>
              {error && <span>{error}</span>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
