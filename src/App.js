import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import './styles/App.css';
import Login from "./Components/Login";
import Register from "./Components/Register";
import EventList from "./Components/EventList";
import Profile from "./Components/Profile";
import WorkshopList from "./Components/WorkshopList";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }

    changeIsLoggedIn = (isLoggedIn) => {
        this.setState({
            isLoggedIn
        });
    };

    render() {
        const {isLoggedIn} = this.state;

        return (
            <div className="App">
                <Router>
                    <div>
                        <Route exact path="/" render={() => (<Dashboard isLoggedIn={isLoggedIn}/>)}/>
                        <Route exact path="/login" render={() => (<Login isLoggedIn={isLoggedIn} login={() => {
                            this.changeIsLoggedIn(true);
                        }}/>)}/>
                        <Route exact path="/register" render={() => (<Register isLoggedIn={isLoggedIn}/>)}/>
                        <Route exact path="/events" render={() => (<EventList isLoggedIn={isLoggedIn}/>)}/>
                        <Route exact path="/workshops" render={() => (<WorkshopList isLoggedIn={isLoggedIn}/>)}/>
                        <Route exact path="/profile" render={() => (<Profile isLoggedIn={isLoggedIn}/>)}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
