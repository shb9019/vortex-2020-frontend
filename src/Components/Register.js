import * as React from 'react';
import Footer from "./Footer";
import Navbar from './Navbar';
import {Col, Row} from "react-bootstrap";
import '../styles/Register.css';

export default class Register extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <section className={'register-form'} style={{ minHeight: '100vh' }}>
                    <Row style={{ width: '100%', margin: 0}}>
                        <Col md={1}/>
                        <Col md={8}>
                            <div className={'register-title'}><b>Register</b></div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%', paddingBottom: 20, margin: 0 }}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-col'}>
                            <input className={'input-field'} placeholder={'Email Id*'} type="text"/>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%', paddingBottom: 20, margin: 0 }}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-col'}>
                            <input className={'input-field'} placeholder={'Username *'} type="text"/>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%', paddingBottom: 20, margin: 0}}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-col'}>
                            <input className={'input-field'} placeholder={'Password*'} type="text"/>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%' }}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-col'}>
                            <button className="sbtn sbtn-3 sbtn-3e icon-arrow-right">Create Account</button>
                        </Col>
                    </Row>
                    <Row style={{width: '100%'}}>
                        <Col md={1}/>
                        <Col md={6} className={'forgot-password'}>
                            <p>Already registered? <a href={'/login'}><u>Log in</u></a></p>
                        </Col>
                    </Row>
                </section>
                <Footer/>
            </div>
        );
    }
}
