import * as React from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
import '../styles/ComingSoon.css';
import {Redirect} from "react-router-dom";
import {SERVER_BASE_URL} from "../config/config";

export default class CluelessComingSoon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectNow: false,
            isLoggedIn: true
        };
    }

    getIsLoggedIn = async () => {
        try {
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
        } catch (err) {
            this.setState({
                isLoggedIn: false
            });
        }
    };

    timer;
    componentDidMount() {
        this.getIsLoggedIn();
        this.timer = setInterval(() => {
            let countDownDate = new Date("Feb 1, 2020 20:00:00").getTime();

            // Get today's date and time
            let now = new Date().getTime();

            // Find the distance between now and the count down date
            let distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(this.timer);
                this.setState({
                    redirectNow: true
                });
            }
        }, 1000);
    }

    render() {
        if (this.state.redirectNow) {
            return <Redirect to={'/clueless'}/>
        }

        if (!this.state.isLoggedIn) {
            return <Redirect to={'/login'}/>
        }

        return (
            <div>
                <Navbar/>
                <section style={{minHeight: '100vh'}} className={'coming-soon-section'}>
                    <h1 id={'timer'}/>
                </section>
                <Footer/>
            </div>
        );
    }
}