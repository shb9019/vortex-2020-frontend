import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import './styles/App.css';
import Login from "./Components/Login";
import Register from "./Components/Register";
import EventList from "./Components/EventList";
import Profile from "./Components/Profile";
import WorkshopList from "./Components/WorkshopList";
import VerifyEmail from "./Components/VerifyEmail";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }

    componentDidMount() {
        this.getIsLoggedIn();
    }

    changeIsLoggedIn = (isLoggedIn) => {
        this.setState({
            isLoggedIn
        });
    };

    getIsLoggedIn = async () => {
        const response = await fetch("http://localhost:8000/api/user/isLoggedIn", {
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        this.setState({
            isLoggedIn: data.isLoggedIn
        });
        console.log(data);
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
                        <Route exact path="/profile" render={() => (<Profile logout={() => {
                            this.changeIsLoggedIn(false);
                        }}/>)}/>
                        <Route path="/verifyuser/:code" render={({match}) => (<VerifyEmail code={match.params.code}/>)}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
