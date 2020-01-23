import * as React from 'react';
import Navbar from "./Navbar";
import '../styles/Dashboard.css';
import '../styles/styled-buttons.css';
import {Col, Container, Row} from "react-bootstrap";
import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import Sponsor from "./Sponsor";

export default class Dashboard extends React.Component {
    render() {
        const {isLoggedIn} = this.props;

        return (
            <div>
                <Navbar/>
                <section>
                    <div className={'dashboard-title'}>
                        <Row className={'vortex-title'} style={{width: '100%'}}>
                            <Col sm={1}/>
                            <Col sm={5}>
                                <img className={'dashboard-name'} src={'images/dashboard-name.png'}/>
                            </Col>
                            <Col sm={6}/>
                        </Row>
                        <Row style={{width: '100%'}} className={'vortex-description'}>
                            <Col sm={1}/>
                            <Col sm={5} style={{textAlign: 'center'}}>
                                7th - 9th February, 2020
                            </Col>
                            <Col sm={6}/>
                        </Row>
                    </div>
                    <div className={'dashboard-title-background'}>
                        <img src={'images/dashboard-logo.png'} style={{float: 'right'}} alt={'logo'} height={'100%'}
                             width={950}/>
                    </div>
                    {!isLoggedIn ?
                        <Row className={'dashboard-buttons'}>
                            <Col sm={6} className={'dashboard-buttons-col'}>
                                <div className={'dashboard-login-button'}>
                                    <a href={'/login'} className="sbtn sbtn-4 sbtn-4c icon-arrow-right">Login</a>
                                </div>
                            </Col>
                            <Col sm={6} className={'dashboard-buttons-col'}>
                                <div className={'dashboard-register-button'}>
                                    <a href={'/register'} className="sbtn sbtn-4 sbtn-4c icon-arrow-right">Register</a>
                                </div>
                            </Col>
                        </Row>
                        : <Row className={'dashboard-buttons'}>
                            <Col sm={12} className={'dashboard-buttons-col-2'}>
                                <div className={'dashboard-profile-button'}>
                                    <a href={'/profile'} className="sbtn sbtn-4 sbtn-4c icon-arrow-right">Profile</a>
                                </div>
                            </Col>
                        </Row>}
                        <Row className={'dashboard-scroll'}>
                            <Col md={4}/>
                            <Col md={4}>
                                <div id="mouse-scroll">
                                    <div className="mouse">
                                        <div className="mouse-in"/>
                                    </div>
                                    <div>
                                        <span className="down-arrow-1"/>
                                        <span className="down-arrow-2"/>
                                        <span className="down-arrow-3"/>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}/>
                        </Row>
                </section>
                <section>
                    <AboutUs/>
                </section>
                {/*<section>*/}
                {/*    <Sponsor/>*/}
                {/*</section>*/}
                <Footer/>
            </div>
        );
    }
}
