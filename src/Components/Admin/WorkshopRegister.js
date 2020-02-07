import * as React from 'react';
import {SERVER_BASE_URL} from "../../config/config";
import moment from "moment";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import {Button} from "react-bootstrap";
import collegeList from "../../utils/CollegeList";
import {Redirect} from "react-router-dom";

export default class WorkshopRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            fullname: "",
            email: "",
            isAdmin: true,
            workshops: [],
            selectedWorkshop: -1,
            registeredWorkshops: null,
            onlyPR: 'no',
            vortexId: "",
            payment: "-1"
        };
    }

    componentDidMount() {
        this.getAllWorkshops();
        this.getIsLoggedIn().then(() => {
            this.getUserRole();
        });
    }

    getIsLoggedIn = async () => {
        try {
            const response = await fetch(`${SERVER_BASE_URL}/api/user/isLoggedIn`, {
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            this.setState({
                isLoggedIn: data.isLoggedIn
            });
        } catch (err) {
            this.setState({
                isLoggedIn: false
            });
        }
    };

    getUserData = (vortexId) => {
        fetch(`${SERVER_BASE_URL}/api/user/getUserByVortexId/${vortexId}`, {
            method: 'GET',
            credentials: "include",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.success) {
                const user = data.user;
                this.setState({
                    fullname: user.fullname,
                    email: user.email
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    getUserRole = () => {
        fetch(`${SERVER_BASE_URL}/api/user/getUserData`, {
            method: 'GET',
            credentials: "include",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.success) {
                const user = data.user;
                this.setState({
                    isAdmin: (user.role === 'ADMIN'),
                });
            } else {
                alert(data.error);
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    getRegisteredWorkshops = async () => {
        try {
            this.setState({
                registeredWorkshops: null
            });

            const {workshops, vortexId} = this.state;
            let registeredWorkshopIds = [], registeredWorkshopNames = [];

            fetch(`${SERVER_BASE_URL}/api/workshops/getUserRegistrations`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    vortexId
                })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.success) {
                    if (data.workshopRegistrations) {
                        data.workshopRegistrations.forEach((registration) => {
                            registeredWorkshopIds.push(registration.workshopId);
                        });
                        workshops.forEach((workshop) => {
                            if (registeredWorkshopIds.includes(workshop.id)) {
                                registeredWorkshopNames.push(workshop.name);
                            }
                        });
                    }
                    this.setState({
                        registeredWorkshops: registeredWorkshopNames
                    });
                } else {
                    console.log(data);
                    alert(data.error);
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    getAllWorkshops = async () => {
        try {
            const response = await fetch(`${SERVER_BASE_URL}/api/workshops/getWorkshopNames`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (data.success) {
                let workshops = [];
                console.log(data.workshops);
                workshops.push({
                    id: -1,
                    name: "Choose a workshop"
                });
                workshops = workshops.concat(data.workshops);
                console.log(workshops);

                this.setState({
                    workshops
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    register = async () => {
        try {
            const {vortexId, payment, selectedWorkshop, onlyPR} = this.state;

            if (onlyPR === 'yes') {
                await this.registerOnlyPR(vortexId);
                return;
            }

            if (selectedWorkshop === -1) {
                alert("No Workshop is selected");
                return;
            }

            if (payment === "-1") {
                alert("No payment method is selected");
                return;
            }

            const response = await fetch(`${SERVER_BASE_URL}/api/workshops/register`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    vortexId,
                    workshopId: selectedWorkshop,
                    paymentMethod: payment
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Registered Successfully!");
                this.setState({
                    vortexId: "",
                    registeredWorkshops: null,
                    fullname: "",
                    email: ""
                });
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    registerOnlyPR = async (vortexId) => {
        try {
            const response = await fetch(`${SERVER_BASE_URL}/api/workshops/register_pr`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    vortexId,
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Registered Successfully!");
                this.setState({
                    vortexId: "",
                    registeredWorkshops: null,
                    fullname: "",
                    email: ""
                });
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    setWorkshop = (id) => {
        this.setState({
            selectedWorkshop: id
        });
    };

    setVortexId = (e) => {
        this.setState({
            vortexId: e.target.value
        });
    };

    setPayment = (payment) => {
        this.setState({
            payment
        });
    };

    setOnlyPR = (onlyPR) => {
        this.setState({
            onlyPR
        });
    };

    render() {
        const {onlyPR, workshops, vortexId, registeredWorkshops, isLoggedIn, isAdmin, fullname, email} = this.state;

        if (!isLoggedIn) {
            return <Redirect to={'/login'}/>
        }

        if (!isAdmin) {
            return <Redirect to={'/'}/>
        }

        const workshopOptions = workshops.map((workshop) => {
            return <option value={workshop.id}>{workshop.name}</option>
        });

        return (
            <div>
                <Navbar/>
                <section style={{minHeight: '100vh'}}>
                    <Row style={{width: '100%', margin: 0, paddingTop: 130}}>
                        <Col sm={1}/>
                        <Col sm={3}>Enter Vortex Id</Col>
                        <Col sm={3}>
                            <input type={'text'} value={vortexId} onChange={this.setVortexId}/>
                        </Col>
                        <Col sm={3}>
                            <Button className={'primary'} onClick={() => {
                                this.getRegisteredWorkshops();
                                this.getUserData(vortexId);
                            }}>Fetch User Details</Button>
                        </Col>
                        <Col sm={1}/>
                    </Row>
                    <Row style={{width: '100%', margin: 0, paddingTop: 40}}>
                        <Col sm={1}/>
                        <Col sm={3}>Only PR?</Col>
                        <Col sm={3}>
                            <select onChange={(e) => this.setOnlyPR(e.target.value)}>
                                <option value={'no'}>No</option>
                                <option value={'yes'}>Yes</option>
                            </select>
                        </Col>
                    </Row>
                    {(onlyPR === 'no') && <React.Fragment>
                        <Row style={{width: '100%', margin: 0, paddingTop: 40}}>
                            <Col sm={1}/>
                            <Col sm={3}>Choose Workshop</Col>
                            <Col sm={3}>
                                <select onChange={(e) => this.setWorkshop(e.target.value)}>
                                    {workshopOptions}
                                </select>
                            </Col>
                        </Row>
                        <Row style={{width: '100%', margin: 0, paddingTop: 40}}>
                            <Col sm={1}/>
                            <Col sm={3}>Payment Method</Col>
                            <Col sm={3}>
                                <select onChange={(e) => this.setPayment(e.target.value)}>
                                    <option value={'-1'}>Choose payment method</option>
                                    <option value={'online'}>Online</option>
                                    <option value={'offline'}>Offline</option>
                                </select>
                            </Col>
                        </Row>
                    </React.Fragment>}
                    {registeredWorkshops && <Row style={{width: '100%', margin: 0, paddingTop: 40}}>
                        <Col sm={1}/>
                        <Col sm={3}>Registered Workshops</Col>
                        <Col sm={6}>
                            <ul>
                                {registeredWorkshops.map((name) => {
                                    return <li>{name}</li>;
                                })}
                            </ul>
                        </Col>
                    </Row>}
                    {(fullname !== "") && <Row style={{width: '100%', margin: 0, paddingTop: 40}}>
                        <Col sm={1}/>
                        <Col sm={3}>Full Name of User</Col>
                        <Col sm={6}>
                            {fullname}
                        </Col>
                    </Row>}
                    {(email !== "") && <Row style={{width: '100%', margin: 0, paddingTop: 10}}>
                        <Col sm={1}/>
                        <Col sm={3}>Email of User</Col>
                        <Col sm={6}>
                            {email}
                        </Col>
                    </Row>}
                    <Row style={{width: '100%', margin: 0, paddingTop: 40}}>
                        <Col sm={1}/>
                        <Col sm={4}>
                            <Button variant="success" onClick={this.register}>Register User</Button>
                        </Col>
                    </Row>
                </section>
                <Footer/>
            </div>
        );
    }
}
