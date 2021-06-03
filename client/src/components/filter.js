/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './filter.css';
import PropTypes from 'prop-types';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.setFilter = this.props.setFilter;
  }

  handleChange(event) {
    this.setFilter((old) => ({ ...old, [event.target.name]: event.target.value }));
  }

  render() {
    return (
      <div className="filter-container">
        <label htmlFor="address">
          <span>Search by Address:&ensp;</span>
          <input
            name="address"
            type="text"
            value={this.props.filter.address}
            onChange={this.handleChange}
            className="input-s"
          />
        </label>
        <form className="filter-form" onSubmit={this.handleSubmit}>
          <label htmlFor="school">
            <span>
              <b>Filter by</b>
            &emsp;School:&ensp;
            </span>
            <select
              id="school"
              name="school"
              value={this.props.filter.school}
              onChange={this.handleChange}
            >
              <option value=""> </option>
              <option value="UCLA">UCLA</option>
              <option value="USC">USC</option>
            </select>
          </label>
          <label htmlFor="people">
            <span>People:&ensp;</span>
            <input
              name="people"
              type="number"
              value={this.props.filter.people}
              onChange={this.handleChange}
              className="input-s"
              min="1"
            />
          </label>
          <label htmlFor="bedrooms">
            <span>Bedrooms:&ensp;</span>
            <input
              name="bedrooms"
              type="number"
              value={this.props.filter.bedrooms}
              onChange={this.handleChange}
              className="input-s"
              min="1"
            />
          </label>
          <label htmlFor="bathrooms">
            <span>Bathrooms:&ensp;</span>
            <input
              name="bathrooms"
              type="number"
              value={this.props.filter.bathrooms}
              onChange={this.handleChange}
              className="input-s"
              min="1"
            />
          </label>
          <label htmlFor="distance">
            <span>Max Distance (Miles):&ensp;</span>
            <input
              name="distance"
              type="number"
              value={this.props.filter.distance}
              onChange={this.handleChange}
              className="input-m"
              min="1"
            />
          </label>
          <label htmlFor="price">
            <span>Max Price ($):&ensp;</span>
            <input
              name="price"
              type="number"
              value={this.props.filter.price}
              onChange={this.handleChange}
              className="input-l"
              min="1"
            />
          </label>
        </form>
      </div>
    );
  }
}

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
};

export default Filter;
