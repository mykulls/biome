import React from 'react';
import './App.css';
import Login from "./Login/Login";
import {
  Link
} from "react-router-dom";
class App extends React.Component{
  constructor(props)
  {
      super(props);
  }
  render() {
    return (
      <div className="App">
            <h1>Main</h1>
            <Link to="/Login"><button>
              Login
            </button>
            </Link>
    </div>
  );
    }
}

export default App;
