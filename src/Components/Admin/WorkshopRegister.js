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
            isAdmin: true,
            workshops: [],
            selectedWorkshop: -1,
            registeredWorkshops: null,
            vortexId: ""
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

    getUserRole = () => {
        fetch(`${SERVER_BASE_URL}/api/user/getUserData`, {
            method: 'GET',
            credentials: "include",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.success) {
                const user = data.user;
                console.log(data.user);
                console.log(user.role === 'ADMIN');
                this.setState({
                    isAdmin: (user.role === 'ADMIN')
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
                        console.log(data);
                        if (data.workshopRegistrations) {
                            console.log(data.workshopRegistrations);
                            data.workshopRegistrations.forEach((registration) => {
                                registeredWorkshopIds.push(registration.workshopId);
                            });
                            console.log(registeredWorkshopIds);
                            workshops.forEach((workshop) => {
                                if (registeredWorkshopIds.includes(workshop.id)) {
                                    registeredWorkshopNames.push(workshop.name);
                                }
                            });
                        }
                        console.log(registeredWorkshopNames);
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
            const {vortexId, selectedWorkshop} = this.state;

            if (selectedWorkshop === -1) {
                alert("No Workshop is selected");
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
                    workshopId: selectedWorkshop
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Registered Successfully!");
                this.setState({
                    vortexId: "",
                    registeredWorkshops: null
                });
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    setWorkshop = (id) => {
        console.log(id);
        this.setState({
            selectedWorkshop: id
        });
    };

    setVortexId = (e) => {
        this.setState({
            vortexId: e.target.value
        });
    };

    render() {
        const {workshops, vortexId, registeredWorkshops, isLoggedIn, isAdmin} = this.state;

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
                            <Button className={'primary'} onClick={this.getRegisteredWorkshops}>Fetch Registered Workshops</Button>
                        </Col>
                        <Col sm={1}/>
                    </Row>
                    <Row style={{width: '100%', margin: 0, paddingTop: 40}}>
                        <Col sm={1}/>
                        <Col sm={3}>Choose Workshop</Col>
                        <Col sm={3}>
                            <select onChange={(e) => this.setWorkshop(e.target.value)}>
                                {workshopOptions}
                            </select>
                        </Col>
                    </Row>
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
                    <Row  style={{width: '100%', margin: 0, paddingTop: 40}}>
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
