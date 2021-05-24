/* eslint-disable */
import './Login.css';
import React, { Component } from 'react';
import axios from 'axios';
const origin = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';
export class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {Username:'', Password:'', newUsername:'', newPassword:''};
    this.enterAccount = this.enterAccount.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }
  enterAccount (event) {
    this.setState({[event.target.name]:event.target.value});
  }
  createAccount (event) {
    this.setState({[event.target.name]:event.target.value});
  }

  login(event) {
      if(false)
      {
       alert("Your username or password is incorrect.");
       }
      else
      {
       alert("Try to login");
      }
  }
  signUp(event){
    if(this.state.newUsername==0|| this.state.newPassword==0)
      {
        alert("You must have atleast 1 character in your username and password.");
      }
      else if(false)
      {
        alert("Your username is taken");
      }
      else
      {
        newUser = {username: this.state.newUsername, password: this.state.newPassword};
        axios.post2(`${origin}/users`, newUser)
        .then(() => {
        })
        .catch((e) => {
          console.log(e.message);
        });
      }
  }

  render() {
    return(
      <div className="Login">
        {/* <div className="rectangle3">
          <text>CS35L Project Login Page</text>
        </div> */}
        <div className="rectangle">
          <form onSubmit={this.login}>
           <h2>Login:</h2>
            <label>
             Username:
             <input type="text" name="Username" onChange={this.enterAccount} />
            </label>
            <br></br>
            <label>
          Password:          
          <input type="text" name="Password" onChange={this.enterAccount} />
        </label>
        <br></br>
        <input type="submit" value="Login"/>
        </form>
      </div>
      <br></br>
      <div className="rectangle2">
        <h2>Don't have an account? Sign up:</h2>
        <form onSubmit={this.signUp}>
        <label>
          Username:
          <input type="text" name="newUsername" onChange={this.createAccount} />
        </label>
        <br></br>
        <label>
          Password:
          <input type="text" name="newPassword" onChange={this.createAccount} />
        </label>
        <br></br>
        <input type="submit" value="Sign up"/>
        </form>
    </div>
      </div>
    );
  }
}

export default Login;
