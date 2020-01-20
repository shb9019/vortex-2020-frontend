import * as React from 'react';
import {Col, Row} from "react-bootstrap";

export default class ContactUs extends React.Component {
    render() {
        return (
            <div className={'contact-us'}>
                <div className={'contact-us-title'}><h1><b>Contact</b> Us</h1></div>
                <Row className={'contact-row'}>
                    <Col md={4} className={'text-center'}>
                        <p className={'contact-name'}>Madhu Naik Kethavath</p>
                        <p className={'contact-designation'}>Overall Coordinator</p>
                        <p className={'contact-number'}>+91 84287 47686</p>
                    </Col>
                    <Col md={4} className={'text-center'}>
                        <p className={'contact-name'}>Kailash Singravelu</p>
                        <p className={'contact-designation'}>Treasurer</p>
                        <p className={'contact-number'}>+91 84287 47686</p>
                    </Col>
                    <Col md={4} className={'text-center'}>
                        <p className={'contact-name'}>Vinoth Gulapala</p>
                        <p className={'contact-designation'}>Chairman</p>
                        <p className={'contact-number'}>+91 84287 47686</p>
                    </Col>
                </Row>
            </div>
        );
    }
}