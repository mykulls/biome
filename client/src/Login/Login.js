import './Login.css';
import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import mongoose from 'mongoose';
import { app, Realm, origin } from '../exports';

function validatePN(phoneNumber) {
  const PN = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (phoneNumber.match(PN)) {
    return true;
  }

  return false;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
      },
      signUp: false,
      error: '',
    };
    this.enterAccount = this.enterAccount.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
    this.history = this.props.history;
    document.title = 'Biome | Login';
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
    if (this.state.signUp) {
      document.title = 'Biome | Log In';
    } else {
      document.title = 'Biome | Sign Up';
    }
    this.setState((state) => ({
      signUp: !state.signUp,
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
      },
      error: '',
    }));
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
        this.setState({ error: `Error logging in: ${e.error}` });
      });
  }

  signUp(event) {
    event.preventDefault();
    const { user } = this.state;
    if (!user.email.length || !user.password.length
       || !user.firstName.length || !user.lastName.length || !user.phoneNumber.length) {
      this.setState({ error: 'You must have at least 1 character in your first name, last name, email, password, and phone number.' });
    } else if (!validatePN(user.phoneNumber)) {
      this.setState({ error: 'You must have a valid phone number.' });
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
                _id: new mongoose.Types.ObjectId(res.id),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
              };
              axios.post(`${origin}/users`, currUser)
                .then(() => {
                  this.history.push('/');
                })
                .catch((e) => {
                  this.setState({ error: e.response.data.error });
                });
            })
            .catch((e) => {
              this.setState({ error: `Error signing up: ${e.error}` });
            });
        })
        .catch((e) => {
          this.setState({ error: `Error signing up: ${e.error}` });
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
        {!this.state.signUp
          ? (
            <div className="login-container">
              <h1>Login</h1>
              <form className="login-form" onSubmit={this.login}>
                <label htmlFor="email">
                  <span>Email: &nbsp;</span>
                  <input type="text" name="email" id="email" onChange={this.enterAccount} value={this.state.user.email} />
                </label>
                <br />
                <label htmlFor="password">
                  <span>Password: &nbsp;</span>
                  <input type="password" name="password" id="password" onChange={this.enterAccount} value={this.state.user.password} />
                </label>
                <br />
                <input type="submit" value="Login" />
              </form>
              {this.state.error && <div className="error">{this.state.error}</div>}
              <span>Don&apos;t have an account? &nbsp;</span>
              <button type="button" onClick={this.toggleSignUp}>Sign Up</button>
            </div>
          )
          : (
            <div className="login-container">
              <h1>Sign Up</h1>
              <form className="login-form" onSubmit={this.signUp}>
                <label htmlFor="email">
                  <span>Email: &nbsp;</span>
                  <input type="text" name="email" id="email" onChange={this.enterAccount} value={this.state.user.email} />
                </label>
                <br />
                <label htmlFor="firstName">
                  <span>First Name: &nbsp;</span>
                  <input type="text" name="firstName" id="firstName" onChange={this.enterAccount} value={this.state.user.firstName} />
                </label>
                <br />
                <label htmlFor="lastName">
                  <span>Last Name: &nbsp;</span>
                  <input type="text" name="lastName" id="lastName" onChange={this.enterAccount} value={this.state.user.lastName} />
                </label>
                <br />
                <label htmlFor="password">
                  <span>Password: &nbsp;</span>
                  <input type="password" name="password" id="password" onChange={this.enterAccount} value={this.state.user.password} />
                </label>
                <br />
                <label htmlFor="phoneNumber">
                  <span>Phone Number: &nbsp;</span>
                  <input type="phoneNumber" name="phoneNumber" id="phoneNumber" onChange={this.enterAccount} value={this.state.user.phoneNumber} />
                </label>
                <br />
                <input type="submit" value="Sign Up" />
              </form>
              {this.state.error && <div className="error">{this.state.error}</div>}
              <span>Have an account? &nbsp;</span>
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
