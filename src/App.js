import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import './styles/App.css';
import Login from "./Components/Login";
import Register from "./Components/Register";
import EventList from "./Components/EventList";
import Profile from "./Components/Profile";
import WorkshopList from "./Components/WorkshopList";

const App = () => (
  <div className="App">
    <Router>
        <div>
            <Route exact path="/" render={() => (<Dashboard/>)}/>
            <Route exact path="/login" render={() => (<Login/>)}/>
            <Route exact path="/register" render={() => (<Register/>)}/>
            <Route exact path="/events" render={() => (<EventList/>)}/>
            <Route exact path="/workshops" render={() => (<WorkshopList/>)}/>
            <Route exact path="/profile" render={() => (<Profile/>)}/>
        </div>
    </Router>
  </div>
);

export default App;
