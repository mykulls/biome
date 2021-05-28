import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './Home/Home';
import NewPost from './NewPost/NewPost';
import Profile from './ProfilePage/Profile';

export default function App() {
  return (
    <Router>
      {/* header goes here */}
      {/* header links should look something like this:
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul> */}
      <NavBar />
      <div className="route-container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/new-post">
            <NewPost />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
