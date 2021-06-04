import React, { useState } from 'react';
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
import Login from './Login/Login';
import PostDetails from './PostDetails/PostDetails';
import { app } from './exports';

export default function App() {
  const [user, setUser] = useState(app.currentUser);

  return (
    <Router>
      <NavBar user={user} />
      <div className="route-container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new-post">
            <NewPost />
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/post/:id">
            <PostDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
