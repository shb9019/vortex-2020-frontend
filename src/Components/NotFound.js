import * as React from 'react';
import Footer from "./Footer";
import Navbar from './Navbar';
import {Col, Row} from "react-bootstrap";
import '../styles/NotFound.css'

export default class NotFound extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <section className={'not-found-section'}>
                    <Row className={'not-found-row'}>
                        <Col lg={6} className={'text-center'}>
                            <p className={'not-found-404'}>404</p>
                        </Col>
                        <Col lg={6} className={'text-center'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p className={'not-found-text'}>Page not found</p>
                        </Col>
                    </Row>
                </section>
                <Footer/>
            </div>
        );
    }
}