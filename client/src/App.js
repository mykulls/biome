import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import Home from './Home/Home';
import NavBar from './components/navbar';
import Posts from './Home/posts';

export default function App() {
  return (
    <div className="App">
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
        <Switch>
          <Route exact path="/">
            <Posts />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
