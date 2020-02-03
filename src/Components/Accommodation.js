import * as React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import 'bootstrap-daterangepicker/daterangepicker.css';
import '../styles/Accommodation.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Button from "react-bootstrap/Button";
import moment from 'moment';
import {SERVER_BASE_URL} from "../config/config";

export default class Accommodation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            accoNeeded: false,
            startDate: "02/06/2020",
            endDate: "02/10/2020"
        };
    }

    componentDidMount() {
        this.getAccoDetails();
    }

    getAccoDetails = async () => {
        try {
            const response = await fetch(`${SERVER_BASE_URL}/api/acco/checkRegistered`, {
                credentials: "include"
            });

            const data = await response.json();

            if (data.success) {
                if (data.accommodation) {
                    this.setState({
                        accoNeeded: true,
                        startDate: data.accommodation.checkInDate,
                        endDate: data.accommodation.checkOutDate
                    });
                }
                console.log(data.accommodation);
            } else {
                this.setState({
                    isLoggedIn: false
                });
            }
        } catch (error) {
            this.setState({
                isLoggedIn: false
            });
        }
    };

    createAcco = async () => {
        try {
            const {startDate, endDate} = this.state;

            if (moment(endDate).diff(startDate, 'days') < 0) {
                alert('Check-Out Date should be after Check-In Date');
                return;
            }

            const response = await fetch(`${SERVER_BASE_URL}/api/acco/createAcco`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    checkInDate: moment(startDate).format('MM/DD/YYYY'),
                    checkOutDate: moment(endDate).format('MM/DD/YYYY')
                })
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
            this.setState({
                isLoggedIn: false
            });
        }
    };

    changeAccoNeeded = () => {
        const {accoNeeded} = this.state;
        this.setState({
            accoNeeded: !accoNeeded
        });
    };

    handleStartDate = (event, picker) => {
        this.setState({
            startDate: moment(picker.startDate).format('MM/DD/YYYY').toString()
        });
    };

    handleEndDate = (event, picker) => {
        this.setState({
            endDate: moment(picker.startDate).format('MM/DD/YYYY').toString()
        });
    };

    getEstimatedCost = () => {
        let startDate = moment(moment(this.state.startDate).format('MM/DD/YYYY'));
        let endDate = moment(moment(this.state.endDate).format('MM/DD/YYYY'));

        console.log(startDate, endDate, startDate.diff(endDate, 'days'));
        return endDate.diff(startDate, 'days') * 150;
    };

    render() {
        const {isLoggedIn, accoNeeded, startDate, endDate} = this.state;

        if (!isLoggedIn) {
            return (
                <div>
                    <Navbar/>
                    <section style={{minHeight: '100vh'}}>
                        <div className={'contact-us-title acco-title'}><h1>Book <b>Accommodation</b></h1></div>
                        <Row className={'acco-login-row'}>
                            <Col sm={12}>
                                <div className={'acco-login-btn'}>
                                    <a
                                        href={'/login'}
                                        className="sbtn sbtn-3 sbtn-3e icon-arrow-right login-btn"
                                    >
                                        Login to continue
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </section>
                    <Footer/>
                </div>
            );
        }

        return (
            <div>
                <Navbar/>
                <section style={{minHeight: '100vh'}}>
                    <div className={'contact-us-title acco-title'}><h1>Pre-Book &nbsp;<b>Accommodation</b></h1></div>
                    <Row style={{width: '100%', margin: 0}}>
                        <Col sm={6}>
                            <p className={'acco-label'}>Do you need accommodation during Vortex?</p>
                        </Col>
                        <Col sm={6} className={'toggle-btn'}>
                            <input className="tgl tgl-light" checked={accoNeeded} id="cb1" type="checkbox" onChange={this.changeAccoNeeded}/>
                            <label className="tgl-btn" htmlFor="cb1"/>
                        </Col>
                    </Row>
                    <Row style={{width: '100%', margin: 0}}><br/><br/></Row>
                    {accoNeeded && <Row style={{width: '100%', margin: 0, paddingTop: 30}}>
                        <Col sm={6}>
                            <p className={'acco-label'}>Select Check-In Date</p>
                        </Col>
                        <Col sm={2} className={'toggle-btn'}>
                            <DateRangePicker singleDatePicker minDate="06/02/2020" maxDate="10/02/2020" onEvent={this.handleStartDate} locale={{format: 'DD/MM/YYYY' }}>
                                <Button variant="primary">Select Date</Button>
                            </DateRangePicker>
                        </Col>
                        <Col sm={4}>
                            <p className={'acco-label acco-date'} style={{ fontSize: 18 }}>{moment(startDate).format('DD/MM/YYYY')}</p>
                        </Col>
                    </Row>}
                    {accoNeeded && <Row style={{width: '100%', margin: 0, paddingTop: 30}}>
                        <Col sm={6}>
                            <p className={'acco-label'}>Select Check-Out Date</p>
                        </Col>
                        <Col sm={2} className={'toggle-btn'}>
                            <DateRangePicker singleDatePicker minDate="06/02/2020" maxDate="10/02/2020" onEvent={this.handleEndDate} locale={{format: 'DD/MM/YYYY' }}>
                                <Button variant="primary">Select Date</Button>
                            </DateRangePicker>
                        </Col>
                        <Col sm={4}>
                            <p className={'acco-label acco-date'} style={{ fontSize: 18 }}>{moment(endDate).format('DD/MM/YYYY')}</p>
                        </Col>
                    </Row>}
                    {accoNeeded && <Row style={{width: '100%', margin: 0, paddingTop: 30}}>
                        <Col sm={6}>
                            <p className={'acco-label'}>Estimated Cost</p>
                        </Col>
                        <Col sm={4} className={'toggle-btn'}>
                            <p className={'acco-label'} style={{ fontSize: 18 }}>₹{this.getEstimatedCost()}</p>
                        </Col>
                    </Row>}
                    {accoNeeded ? <Row className={'acco-login-row'}>
                        <Col sm={12}>
                            <div className={'acco-login-btn'}>
                                <button
                                    onClick={this.createAcco}
                                    className="sbtn sbtn-3 sbtn-3e login-btn save-changes-btn"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </Col>
                    </Row> : null}
                </section>
                <Footer/>
            </div>
        );
    }
}