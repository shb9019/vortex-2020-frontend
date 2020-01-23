import * as React from 'react';
import {Col, Row} from "react-bootstrap";
import Footer from "./Footer";
import Navbar from "./Navbar";
import '../styles/Dashboard.css';

export default class ContactUs extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className={'contact-us'}>
                    <div className={'contact-us-title'}><h1><b>Contact</b> Us</h1></div>
                    <Row className={'contact-row'}>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Vinoth Gulapala</p>
                            <p className={'contact-designation'}>Chairman</p>
                            <p className={'contact-number'}>+91 78459 44793</p>
                        </Col>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Madhu Naik Kethavath</p>
                            <p className={'contact-designation'}>Overall Coordinator</p>
                            <p className={'contact-number'}>+91 74483 30222</p>
                        </Col>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Kailash Singaravelu</p>
                            <p className={'contact-designation'}>Treasurer</p>
                            <p className={'contact-number'}>+91 99529 42209</p>
                        </Col>
                    </Row>
                    <Row className={'contact-row'}>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Vignesh Vishwanathan</p>
                            <p className={'contact-designation'}>Organising Committee</p>
                            <p className={'contact-number'}>org.vortex@gmail.com</p>
                            <p className={'contact-number'}>+91 98451 47872</p>
                        </Col>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Nithish Kumar A</p>
                            <p className={'contact-designation'}>Marketing Team</p>
                            <p className={'contact-number'}>vortex.marketing2020@gmail.com</p>
                            <p className={'contact-number'}>+91 84660 84032</p>
                        </Col>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Sandip</p>
                            <p className={'contact-designation'}>Content</p>
                            <p className={'contact-number'}>content.csea@gmail.com</p>
                            <p className={'contact-number'}>+91 98204 11725</p>
                        </Col>
                    </Row>
                    <Row className={'contact-row'}>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Vyshnavi Rongali</p>
                            <p className={'contact-designation'}>Publicity</p>
                            <p className={'contact-number'}>vortex.publi@gmail.com</p>
                            <p className={'contact-number'}>+91 96268 84205</p>
                        </Col>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Ranga Vamsi</p>
                            <p className={'contact-designation'}>PR & Hospitality</p>
                            <p className={'contact-number'}>vortex.prandhospi@gmail.com</p>
                            <p className={'contact-number'}>+91 79811 95665</p>
                        </Col>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Benedict Florence</p>
                            <p className={'contact-designation'}>Guest Lectures</p>
                            <p className={'contact-number'}>vortex.guestlectures@gmail.com</p>
                            <p className={'contact-number'}>+91 99945 91883</p>
                        </Col>
                    </Row>
                    <Row className={'contact-row'}>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Prakhar Gangwar</p>
                            <p className={'contact-designation'}>Events</p>
                            <p className={'contact-number'}>theevents.vortex@gmail.com</p>
                            <p className={'contact-number'}>+91 97879 55539</p>
                        </Col>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Ashwin Shankar</p>
                            <p className={'contact-designation'}>Design and Media</p>
                            <p className={'contact-number'}>vortex.dandm@gmail.com</p>
                            <p className={'contact-number'}>+91 96005 82834</p>
                        </Col>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Aishwarya Sarangu</p>
                            <p className={'contact-designation'}>Workshops</p>
                            <p className={'contact-number'}>workshops.vortex@gmail.com</p>
                            <p className={'contact-number'}>+91 95000 33252</p>
                        </Col>
                    </Row>
                    <Row className={'contact-row'}>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Tarun Kumar Janamaddi</p>
                            <p className={'contact-designation'}>Technical Secretary</p>
                            <p className={'contact-number'}>+91 94874 89037</p>
                        </Col>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Navaneshwar Reddy</p>
                            <p className={'contact-designation'}>Quality Assurance</p>
                            <p className={'contact-number'}>+91 99445 84859</p>
                        </Col>
                        <Col md={4} className={'text-center'}>
                            <p className={'contact-name'}>Sai Hemanth B</p>
                            <p className={'contact-designation'}>Web Ops</p>
                            <p className={'contact-number'}>+91 84287 47686</p>
                        </Col>
                    </Row>
                </div>
                <Footer/>
            </div>
        );
    }
}