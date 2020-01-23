import * as React from 'react';
import '../styles/Footer.css';
import {Col, Row} from "react-bootstrap";

export default class Footer extends React.Component {
    render() {
        return (
            <div className={'footer-div'}>
                <Row className={'footer-row'}>
                    <Col className={'text-center footer-name'}>
                        <p>Vinoth Gulapala</p>
                        <p>+91 89256 59887</p>
                    </Col>
                    <Col className={'text-center footer-name'}>
                        <p>Madhu Naik</p>
                        <p>+91 74483 30222</p>
                    </Col>
                    <Col className={'text-center footer-name'}>
                        <p>Kailash Singaravelu</p>
                        <p>+91 99529 42209</p>
                    </Col>
                    <Col className={'text-center'}>
                        <Row className={'footer-row'} style={{ padding: 0 }}>
                            <a href={'https://www.instagram.com/vortex_nitt/'} target={'_blank'}><i className="fa fa-instagram social-icon"/></a>
                            <a href={'https://www.facebook.com/vortex.nitt/'} target={'_blank'}><i className="fa fa-facebook social-icon"/></a>
                            <a href={' https://wa.me/918925659887'} target={'_blank'}><i className="fa fa-whatsapp social-icon"/></a>
                        </Row>
                        <Row className={'footer-row'} style={{ padding: 0, paddingTop: '6px' }}>
                            <a href={'mailto:cseanitt@gmail.com'} target={'_blank'} className={'email'}><p>cseanitt@gmail.com</p></a>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}