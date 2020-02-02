import * as React from 'react';
import Footer from "./Footer";
import Navbar from './Navbar';
import {Col, Row} from "react-bootstrap";
import '../styles/EventList.css';
import EventCard from "./EventCard";
import PopUp from "./PopUp";
import {SERVER_BASE_URL} from '../config/config';

export default class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        this.fetchEventDetails();
    }

    fetchEventDetails = () => {
        fetch(`${SERVER_BASE_URL}/api/events/getAll`, {
            method: 'GET',
            credentials: "include",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.success) {
                this.setState({
                    events: data.events
                });
            } else {
                console.log(data.error);
            }
        })
    };

    render() {
        const {events} = this.state;

        let rows = [];

        let index = 0;
        while (index < events.length) {
            rows.push(<Row className={'event-list-row'}>
                <Col md={4} className={'event-list-card'}>
                    <EventCard isWorkshop={false} details={events[index]}/>
                </Col>
                {(index + 1 < events.length) ? <Col md={4} className={'event-list-card'}>
                    <EventCard isWorkshop={false} details={events[index+1]}/>
                </Col> : null}
                {(index + 2 < events.length) ? <Col md={4} className={'event-list-card'}>
                    <EventCard isWorkshop={false} details={events[index+2]}/>
                </Col> : null}
            </Row>);
            index += 3;
        }

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
                        {rows}
                    </section>
                </div>
                <Footer/>
            </div>
        );
    }
}
