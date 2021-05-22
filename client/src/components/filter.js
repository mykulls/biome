/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './filter.css';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: null,
      bedrooms: null,
      bathrooms: null,
      distance: null,
      price: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert(`Filter by\nPeople: ${this.state.people}\nBedrooms: ${this.state.bedrooms}\nBathrooms: ${this.state.bathrooms}\nDistance: ${this.state.distance}\nPrice: ${this.state.price}`);
    event.preventDefault();
  }

  render() {
    return (
      <form className="filter-form" onSubmit={this.handleSubmit}>
        <p>Filter by</p>
        <label htmlFor="people">
          People:&nbsp;
          <input
            name="people"
            type="number"
            value={this.state.people}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="bedrooms">
          Bedrooms:&nbsp;
          <input
            name="bedrooms"
            type="number"
            value={this.state.bedrooms}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="bathrooms">
          Bathrooms:&nbsp;
          <input
            name="bathrooms"
            type="number"
            value={this.state.bathrooms}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="distance">
          Distance:&nbsp;
          <input
            name="distance"
            type="number"
            value={this.state.distance}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="price">
          Price:&nbsp;
          <input
            name="price"
            type="number"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Apply" />
      </form>
    );
  }
}

export default Filter;
