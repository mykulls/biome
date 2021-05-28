/* eslint-disable react/destructuring-assignment */
import './Login.css';
import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { app, Realm } from '../Realm';

const origin = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      signUp: false,
    };
    this.enterAccount = this.enterAccount.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
    this.history = this.props.history;
  }

  enterAccount(event) {
    this.setState((state) => ({
      user: {
        ...state.user,
        [event.target.name]: event.target.value,
      },
    }));
  }

  toggleSignUp() {
    this.setState((state) => ({ signUp: !state.signUp }));
  }

  login(event) {
    event.preventDefault();
    const { user } = this.state;
    const credentials = Realm.Credentials.emailPassword(user.email, user.password);
    app.logIn(credentials)
      .then((res) => {
        this.props.setUser(res);
        this.history.push('/');
      })
      .catch((e) => {
        alert("Couldn't sign in!");
        console.log(e.message);
      });
  }

  signUp(event) {
    event.preventDefault();
    const { user } = this.state;
    if (!user.email.length || !user.password.length
       || !user.firstName.length || !user.lastName.length) {
      alert('You must have at least 1 character in your first name, last name, email, and password.');
    } else {
      // registers user
      app.emailPasswordAuth.registerUser(user.email, user.password)
        .then(() => {
          const credentials = Realm.Credentials.emailPassword(user.email, user.password);
          // signs in user automatically and posts data to the users collection
          app.logIn(credentials)
            .then((res) => {
              this.props.setUser(res);
              const currUser = {
                _id: res.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
              };
              axios.post(`${origin}/users`, currUser)
                .then(() => {
                  this.history.push('/');
                })
                .catch((e) => {
                  console.log(e.message);
                });
            })
            .catch((e) => {
              alert("Couldn't sign up!");
              console.log(e.message);
            });
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }

  render() {
    if (app.currentUser) {
      this.history.push('/');
      return null;
    }

    return (
      <div className="Login">
        {/* <div className="rectangle3">
          <text>CS35L Project Login Page</text>
        </div> */}
        {!this.state.signUp
          ? (
            <div className="rectangle">
              <form onSubmit={this.login}>
                <h2>Login:</h2>
                <br />
                <label htmlFor="email">
                  <span>Email:</span>
                  <input type="text" name="email" id="email" onChange={this.enterAccount} />
                </label>
                <br />
                <label htmlFor="password">
                  <span>Password:</span>
                  <input type="password" name="password" id="password" onChange={this.enterAccount} />
                </label>
                <br />
                <br />
                <input type="submit" value="Login" />
              </form>
              <span>Don&apos;t have an account? Sign up:</span>
              <button type="button" onClick={this.toggleSignUp}>Sign Up</button>
            </div>
          )
          : (
            <div className="rectangle2">
              <form onSubmit={this.signUp}>
                <h2>Sign Up:</h2>
                <br />
                <label htmlFor="email">
                  <span>Email:</span>
                  <input type="text" name="email" id="email" onChange={this.enterAccount} />
                </label>
                <br />
                <label htmlFor="firstName">
                  <span>First Name:</span>
                  <input type="text" name="firstName" id="firstName" onChange={this.enterAccount} />
                </label>
                <br />
                <label htmlFor="lastName">
                  <span>Last Name:</span>
                  <input type="text" name="lastName" id="lastName" onChange={this.enterAccount} />
                </label>
                <br />
                <label htmlFor="password">
                  <span>Password:</span>
                  <input type="password" name="password" id="password" onChange={this.enterAccount} />
                </label>
                <br />
                <br />
                <input type="submit" value="Sign Up" />
              </form>
              <span>Have an account? Log in:</span>
              <button type="button" onClick={this.toggleSignUp}>Login</button>
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default withRouter(Login);
