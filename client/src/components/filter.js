/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './filter.css';
import PropTypes from 'prop-types';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: '',
      bedrooms: '',
      bathrooms: '',
      distance: '',
      price: '',
      school: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setFilter = this.props.setFilter;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.setFilter(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form className="filter-form" onSubmit={this.handleSubmit}>
        <label htmlFor="school">
          <b>Filter by</b>
&emsp;School:&ensp;
          <select
            id="school"
            name="school"
            value={this.state.school}
            onChange={this.handleChange}
          >
            <option value=""> </option>
            <option value="UCLA">UCLA</option>
            <option value="USC">USC</option>
          </select>
        </label>
        <label htmlFor="people">
          People:&ensp;
          <input
            name="people"
            type="number"
            value={this.state.people}
            onChange={this.handleChange}
            className="input-s"
            min="1"
          />
        </label>
        <label htmlFor="bedrooms">
          Bedrooms:&ensp;
          <input
            name="bedrooms"
            type="number"
            value={this.state.bedrooms}
            onChange={this.handleChange}
            className="input-s"
            min="1"
          />
        </label>
        <label htmlFor="bathrooms">
          Bathrooms:&ensp;
          <input
            name="bathrooms"
            type="number"
            value={this.state.bathrooms}
            onChange={this.handleChange}
            className="input-s"
            min="1"
          />
        </label>
        <label htmlFor="distance">
          Max Distance (Miles):&ensp;
          <input
            name="distance"
            type="number"
            value={this.state.distance}
            onChange={this.handleChange}
            className="input-m"
            min="1"
          />
        </label>
        <label htmlFor="price">
          Max Price ($):&ensp;
          <input
            name="price"
            type="number"
            value={this.state.price}
            onChange={this.handleChange}
            className="input-l"
            min="1"
          />
        </label>
        <div className="submit">
          <input type="submit" value="Apply" />
        </div>
      </form>
    );
  }
}

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default Filter;
