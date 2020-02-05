import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

import Question from './Question/Question';
import {SERVER_BASE_URL} from "../../config/config";
import ThankYou from "./ThankYou";

class Clueless extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: true,
            user: null,
            question: null,
            redirectUrl: null
        };
    }


    componentDidMount() {
        this.reload();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.reload();
        this.setState({
            redirectUrl: null
        });
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

    createCluelessUser = async (user) => {
        try {
            const response = await fetch(`${SERVER_BASE_URL}/api/clplayer/register`, {
                credentials: "include",
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id
                })
            });
            const data = await response.json();
        } catch (err) {
            console.log(err);
            this.setState({
                isLoggedIn: false
            });
        }
    };

    getUser = async () => {
        try {
            const response = await fetch(`${SERVER_BASE_URL}/api/user/getUserData`, {
                method: 'GET',
                credentials: "include",
            });
            const data = await response.json();
            this.setState({
                user: data.user
            });
            return data.user;
        } catch (err) {
            this.setState({
                isLoggedIn: false
            });
        }
    };

    reload = async (refresh = false) => {
        this.getIsLoggedIn();
        const user = await this.getUser();
        await this.createCluelessUser(user);

        let {urlClue} = this.props;

        if (user && urlClue) {
            await this.getQuestion(user, urlClue);
        } else if (user) {
            await this.getCurrentPlayer(user);
        } else {
            this.setState({
                isLoggedIn: false
            });
        }
    };

    getQuestion = async (user, urlClue) => {
        try {
            const res = await fetch(SERVER_BASE_URL + '/api/question/getByUrl/' + user.id + '/' + urlClue, {
                method: "GET",
                credentials: "include"
            });

            const data = await res.json();

            if (data.success) {
                this.setState({
                    question: data.question
                });
                document.title = data.question.title;
            } else {
                this.setState({
                    redirectUrl: '/clueless'
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    getCurrentPlayer = async (user) => {
        try {
            const res = await fetch(SERVER_BASE_URL + '/api/clplayer/getClplayerByUserId/' + user.id, {
                method: 'GET',
                credentials: "include"
            });

            const data = await res.json();

            if (data.success) {
                const player = data.clplayer;
                this.setState({
                    redirectUrl: '/clueless/' + player.levelUrl
                });
            } else {
                this.setState({
                    isLoggedIn: false
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    checkAnswer = async (qId, answer) => {
        const response = await fetch(SERVER_BASE_URL + '/api/clplayer/checkAnswer', {
            credentials: "include",
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                qId,
                answer
            })
        });

        const data = await response.json();

        if (data.success) {
            if (data.completed) {
                alert("Congrats! You have completed Clueless!");
                this.setState({
                    redirectUrl: "/clueless/leaderboard/1"
                });
            } else if (data.isCorrect) {
                alert("Correct Answer!");
                this.setState({
                    redirectUrl: "/clueless/" + data.nextQuestion.url
                });
            } else {
                this.setState({
                    redirectUrl: "/clueless/wrong-answer"
                });
            }
        }
    };

    render() {
        const {question, isLoggedIn, redirectUrl} = this.state;

        if (!isLoggedIn) {
            return <Redirect to={'/login'}/>;
        }

        if (redirectUrl) {
            return <Redirect to={redirectUrl}/>;
        }

        if (question) {
            return (
                <ThankYou/>
            );
        } else {
            return (
                <p>Loading...</p>
            );
        }
    }
}

export default Clueless;
