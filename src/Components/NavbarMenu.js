import * as React from 'react';
import '../styles/NavbarMenu.css';
import {Col, Container, Row} from "react-bootstrap";
import {SERVER_BASE_URL} from "../config/config";

export default class NavbarMenu extends React.Component {
    getIsLoggedIn = () => {
        fetch(`${SERVER_BASE_URL}/api/user/isLoggedIn`, {
            method: 'GET',
            credentials: "include",
        }).then((response) => {
            return response.json()
        }).then((data) => {
            return data.isLoggedIn;
        }).catch((err) => {
            console.log(err);
        });
    };

    render() {
        const {isOpen} = this.props;

        return (
            <div className={'navbar-menu'} style={{top: (isOpen ? 0 : '-100%')}}>
                <div style={{height: '100%'}}>
                    <Container style={{ flexDirection: 'column' }}>
                        <Row className={'navbar-menu-row'}>
                            <Col lg={4} className={'navbar-link'} style={{
                                top: (isOpen ? 0 : 80),
                                opacity: (isOpen ? 1 : 0),
                                transitionDelay: '0.5s'
                            }}><a className="size" href={'/events'}>Events</a></Col>
                            <Col lg={4} className={'navbar-link'} style={{
                                top: (isOpen ? 0 : 80),
                                opacity: (isOpen ? 1 : 0),
                                transitionDelay: '0.6s'
                            }}><a className="size" href={'/workshops'}>Workshops</a></Col>
                            <Col lg={4} className={'navbar-link'} style={{
                                top: (isOpen ? 0 : 80),
                                opacity: (isOpen ? 1 : 0),
                                transitionDelay: '0.7s'
                            }}><a className="size" href={'/accommodation'}>Accommodation</a></Col>
                        </Row>
                        <Row className={'navbar-menu-row'}>
                            <Col lg={6} className={'navbar-link'} style={{
                                top: (isOpen ? 0 : 80),
                                opacity: (isOpen ? 1 : 0),
                                transitionDelay: '0.8s'
                            }}><a className="size" href={'/guest-lectures'}>Guest Lectures</a></Col>
                            <Col lg={6} className={'navbar-link'} style={{
                                top: (isOpen ? 0 : 80),
                                opacity: (isOpen ? 1 : 0),
                                transitionDelay: '0.9s'
                            }}><a className="size" href={'/contacts'}>Contact Us</a></Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}
