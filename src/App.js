import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import "./styles/App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import EventList from "./Components/EventList";
import Details from "./Components/Details";
import Profile from "./Components/Profile";
import WorkshopList from "./Components/WorkshopList";
import VerifyEmail from "./Components/VerifyEmail";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import ComingSoon from "./Components/ComingSoon";
import ContactUs from "./Components/ContactUs";
import NotFound from "./Components/NotFound";
import GuestLectures from "./Components/GuestLectures";
import Clueless from "./Components/Clueless";
import {SERVER_BASE_URL} from "./config/config";
import Leaderboard from "./Components/Clueless/Leaderboard";
import WrongAnswer from "./Components/Clueless/WrongAnswer";
import CluelessComingSoon from "./Components/CluelessComingSoon";
import Accommodation from "./Components/Accommodation";

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

    changeIsLoggedIn = isLoggedIn => {
        this.setState({
            isLoggedIn
        });
    };

    getIsLoggedIn = async () => {
        const response = await fetch(`${SERVER_BASE_URL}/api/user/isLoggedIn`, {
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
    };

    render() {
        const {isLoggedIn} = this.state;
        return (
            <div className="App">
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/" render={() => (<Dashboard isLoggedIn={isLoggedIn}/>)}/>
                            <Route exact path="/login" render={() => (<Login isLoggedIn={isLoggedIn} login={() => {
                                this.changeIsLoggedIn(true);
                            }}/>)}/>
                            <Route exact path="/register" render={() => (<Register isLoggedIn={isLoggedIn}/>)}/>
                            <Route exact path="/events/clueless" render={() => (<CluelessComingSoon/>)}/>
                           
                            <Route exact path="/events" render={() => (<EventList isLoggedIn={isLoggedIn}/>)}/>
                            <Route exact path="/event/:id"
                                   render={({match}) => (<Details isWorkshop={false} id={match.params.id}/>)}/>

                            <Route exact path="/workshops" render={() => (<WorkshopList isLoggedIn={isLoggedIn}/>)}/>
                            <Route exact path="/workshop/:id"
                                   render={({match}) => (<Details isWorkshop={true} id={match.params.id}/>)}/>
                            <Route exact path="/profile" render={() => (
                                <Profile logout={() => {
                                    this.changeIsLoggedIn(false);
                                }}/>
                            )}/>
                            <Route exact path="/contacts" render={() => (<ContactUs/>)}/>
                            <Route path="/verifyuser/:code"
                                   render={({match}) => (<VerifyEmail code={match.params.code}/>)}/>
                            <Route path="/forgotpassword" render={() => (<ForgotPassword/>)}/>
                            <Route path="/changepassword/:code"
                                   render={({match}) => (<ResetPassword code={match.params.code}/>)}/>
                            <Route path="/accommodation" render={() => (<Accommodation/>)}/>
                            <Route path="/guest-lectures" render={() => (<GuestLectures/>)}/>
                            <Route path="/clueless" exact render={() => (<Clueless/>)}/>
                            <Route path="/clueless/leaderboard/:pageNo" exact
                                   render={({match}) => (<Leaderboard pageNo={match.params.pageNo}/>)}/>
                            <Route path="/clueless/wrong-answer" render={() => (<WrongAnswer/>)}/>
                            <Route path="/clueless/:urlClue"
                                   render={({match}) => (<Clueless urlClue={match.params.urlClue}/>)}/>
                            <Route path="*" exact render={() => (<NotFound/>)}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
