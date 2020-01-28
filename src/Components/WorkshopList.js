import * as React from 'react';
import Footer from "./Footer";
import Navbar from './Navbar';
import {Col, Row} from "react-bootstrap";
import '../styles/EventList.css';
import EventCard from "./EventCard";
import PopUp from "./PopUp";
import {SERVER_BASE_URL} from '../config/config';

export default class WorkshopList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workshops: []
        };
    }

    componentDidMount() {
        this.fetchWorkshopDetails();
    }

    fetchWorkshopDetails = () => {
        fetch(`${SERVER_BASE_URL}/api/workshops/getAll`, {
            method: 'GET',
            credentials: "include",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.success) {
                this.setState({
                    workshops: data.workshops
                });
            } else {
                console.log(data.error);
            }
        })
    };

    render() {
        const {workshops} = this.state;

        let rows = [];

        let index = 0;
        while (index < workshops.length) {
            rows.push(<Row className={'event-list-row'}>
                <Col md={4} className={'event-list-card'}>
                    <EventCard isWorkshop={true} details={workshops[index]}/>
                </Col>
                {(index + 1 < workshops.length) ? <Col md={4} className={'event-list-card'}>
                    <EventCard isWorkshop={true} details={workshops[index+1]}/>
                </Col> : null}
                {(index + 2 < workshops.length) ? <Col md={4} className={'event-list-card'}>
                    <EventCard isWorkshop={true} details={workshops[index+2]}/>
                </Col> : null}
            </Row>);
            index += 3;
        }

        return (
            <div>
                <Navbar/>
                <div className={'event-list-wrapper'}>
                    <section>
                        <Row style={{width: '100%', paddingTop: 60, margin: 0, minHeight: 300}}>
                            <Col sm={12}>
                                <div className={'event-list-title'}><b><PopUp text="Workshops"/></b></div>
                            </Col>
                        </Row>
                        {rows}
                    </section>
                </div>
                <Footer/>
            </div>
        );
    }
}
