import './Login.css';
import React, { Component } from 'react';
export class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {Username:'', Password:'', newUsername:'', newPassword:''};
  }
  enterAccount = (event) => {
    let type = event.target.name;
    let value = event.target.value;
    this.setState({[type]:value});
  }
  createAccount = (event) => {
    let type = event.target.name;
    let value = event.target.value;
    this.setState({[type]:value});
  }

  login(event) {
    if(event.target.value=="login")
    {
      if(false)
      {
       alert("Your username or password is incorrect.");
       }
      else
      {
       alert("Username: " +  " Password: " + this.state.Password);
      }
    }
    else
    {
      if(this.state.newUsername.length==0 || this.state.newPassword.length==0)
      {
        alert("You must have atleast 1 character in your username and password.");
      }
      else if(false)
      {
        alert("Your username is taken");
      }
      else
      {}
    }
  }

  render() {
    return(
      <div className="Login">
        <div className="rectangle3">
          <text>CS35L Project Login Page</text>
        </div>
        <div className="rectangle">
          <form onSubmit={this.login}>
           <h2>Login:</h2>
            <label>
             Username:
             <input type="text" name="Username" onChange={this.enterAccount} />
            </label>
            <br></br>
            <label>
          Password:          <input type="text" name="Password" onChange={this.enterAccount} />
        </label>
        <br></br>
        <input type="submit" value="Login"/>
        </form>
      </div>
      <div className="rectangle2">
        <h2>Don't have an account? Sign up:</h2>
        <form onSubmit={this.login}>
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
