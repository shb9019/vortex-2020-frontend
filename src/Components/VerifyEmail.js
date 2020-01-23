import * as React from 'react';
import Footer from "./Footer";
import Navbar from './Navbar';
import {Col, Row} from "react-bootstrap";
import '../styles/VerifyEmail.css';
import '../styles/Dashboard.css';
import {
    Redirect,
} from "react-router-dom";
import {SERVER_BASE_URL} from "../config/config";


export default class VerifyEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canRedirect: false,
            message: ""
        };
    }

    componentDidMount() {
        this.verifyEmail();
    }

    startRedirectCounter() {
        setTimeout(() => {
            this.setState({
                canRedirect: true
            });
        }, 5000);
    }

    verifyEmail = () => {
        const {code} = this.props;
        console.log(code);
        fetch(`${SERVER_BASE_URL}/api/user/verifyUser/${code}`, {
            method: 'GET',
            credentials: "include",
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if(data.message === 'Successfully verified') {
                this.setState({
                    message: "Your email is verified! You will be redirected in 5 seconds..."
                });
                this.startRedirectCounter();
            } else {
                this.setState({
                    message: "The verification code is invalid. You will be redirected in 5 seconds..."
                });
                this.startRedirectCounter();
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    render() {
        if (this.state.canRedirect) {
            return <Redirect to={'/login'}/>;
        }

        const {message} = this.state;

        return (
            <div>
                <Navbar/>
                <section className={'verify-email'} style={{minHeight: '100vh'}}>
                    <Row style={{width: '100%', margin: 0}}>
                        <Col md={1}/>
                        <Col md={8}>
                            <div className={'verify-email-title'}><b>{message}</b></div>
                        </Col>
                    </Row>
                </section>
                <Footer/>
            </div>
        );
    }
}
