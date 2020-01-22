import * as React from 'react';
import Footer from "./Footer";
import Navbar from './Navbar';
import {Col, Row} from "react-bootstrap";
import '../styles/EventList.css';
import EventCard from "./EventCard";
import PopUp from "./PopUp";
export default class EventList extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className={'event-list-wrapper'}>
                    <section>
                        <Row style={{width: '100%', paddingTop: 60}}>
                            <Col sm={12}>
                                <div className={'event-list-title'}><b><PopUp text="Events"/></b></div>
                            </Col>
                        </Row>
                        <Row style={{width: '100%'}}><br/><br/><br/></Row>
                        <Row style={{width: '100%', paddingLeft: 20, paddingRight: 20, margin: 0}}>
                            <Col md={4} style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 20 }}>
                                <EventCard/>
                            </Col>
                            <Col md={4} style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 20 }}>
                                <EventCard/>
                            </Col>
                            <Col md={4} style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 20 }}>
                                <EventCard/>
                            </Col>
                        </Row>
                    </section>
                </div>
                <Footer/>
            </div>
        );
    }
}
