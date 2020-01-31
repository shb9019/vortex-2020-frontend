import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Question from './Question/Question';
import Comment from './Question/Comment';
import ThankYou from './ThankYou';

class Clueless extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            authStatus: this.props.authStatus,
            clplayer: null,
            question: null
        };
    }

    componentDidMount() {
        const { urlClue } = this.props.match.params;
        const { user } = this.state;

        if(user && urlClue) {
            this.getQuestion(user, urlClue);
        }
        else if(user && user.isClplayer){
            this.getCurrentClplayer();
        }
        else if(user && !user.isClplayer) {
            //Ask user to register
            alert("You have not registered for Clueless, Please register in the events page");
            this.props.history.push('/events/5');
        }
    }

    getQuestion = async (user, urlClue) => {
        const res = await (axios.get('/api/question/getByUrl/' + user.id + '/' + urlClue));

        if(res.data.success) {
            this.setState(Object.assign({}, this.state, {question: res.data.question}));
            document.title = res.data.question.title;
        }
        else {
            this.props.history.push('/clueless');
        }
    }

    getCurrentClplayer = async () => {
        const res = await (axios.get('/api/clplayer/getClplayerByUserId/' + this.state.user.id));

        if(res.data.success) {
            const clplayer = res.data.clplayer;

            this.props.history.push('/clueless/' + clplayer.levelUrl);
        }
        else {
            this.props.history.push('/login');
        }
    }

    checkAnswer = async (qId, answer) => {
        let data = {
            qId: qId,
            answer: answer
        };

        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await (axios.post('/api/clplayer/checkAnswer', data, config));

        if(res.data.success) {
            if(res.data.isCorrect) {
                alert("Good job !");
                this.props.history.push('/clueless/' + res.data.nextQuestion.url);
            }
            else {
                this.props.history.push('/clueless/wrong_answer');
            }
        }
    }

    render() {
        const { user, authStatus, question } = this.state;

        if(user && authStatus === 'A' && question) {
            return (
                <ThankYou />
            );
        }
        else if(authStatus === 'LOADING') {
            return (
                <div>
                    Loading...
                </div>
            );
        }
        else if(authStatus === 'A' && !question) {
            return (
                <div>
                    Loading...
                </div>
            );
        }
        else {
            return (<Redirect to='/login' />);
        }
    }
}

export default Clueless;
