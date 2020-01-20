import * as React from 'react';
import Footer from "./Footer";
import Navbar from './Navbar';
import {Col, Row} from "react-bootstrap";
import '../styles/Login.css';

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <section className={'login-form'} style={{ minHeight: '100vh' }}>
                    <Row style={{ width: '100%', margin: 0}}>
                        <Col md={1}/>
                        <Col md={8}>
                            <div className={'login-title'}><b>Login</b></div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%', paddingBottom: 30, margin: 0 }}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-col'}>
                            <input className={'input-field'} placeholder={'Email Id / Username *'} type="text"/>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%', paddingBottom: 30, margin: 0}}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-col'}>
                            <input className={'input-field'} placeholder={'Password*'} type="text"/>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%', paddingBottom: 20 }}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-col'}>
                            <button className="sbtn sbtn-3 sbtn-3e icon-arrow-right">Enter</button>
                        </Col>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <Col md={1}/>
                        <Col md={6} className={'links'}>
                            <p>New here? <a href={'/register'}><u>Register</u></a></p>
                        </Col>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <Col md={1}/>
                        <Col md={6} className={'links'}>
                            <p>Forgot Password? <a><u>Reset here</u></a></p>
                        </Col>
                    </Row>
                </section>
                <Footer/>
            </div>
        );
    }
}
