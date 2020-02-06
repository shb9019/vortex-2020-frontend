import * as React from 'react';
import {SERVER_BASE_URL} from "../../config/config";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../Footer";
import Navbar from "../Navbar";
import {Redirect} from "react-router-dom";

export default class WorkshopStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            isAdmin: true,
            workshops: [],
        };
    }

    componentDidMount() {
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
                if (user.role === 'ADMIN') {
                    this.getWorkshopStats();
                }
            } else {
                alert(data.error);
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    getWorkshopStats = async () => {
        try {
            let workshops = [];

            fetch(`${SERVER_BASE_URL}/api/admin/getWorkshopStats`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((response) => {
                return response.json();
            }).then((data) => {
                data.workshopStats.forEach((workshopStat) => {
                    workshops.push({
                        name: workshopStat.name,
                        regs: workshopStat.regs
                    });
                });
                this.setState({
                    workshops
                });
                console.log(data.workshopStats);
            });
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        const {workshops, isLoggedIn, isAdmin} = this.state;

        if (!isLoggedIn) {
            return <Redirect to={'/login'}/>
        }

        if (!isAdmin) {
            return <Redirect to={'/'}/>
        }

        return (
            <div>
                <Navbar/>
                <section style={{minHeight: '100vh'}}>
                    <Row style={{ paddingTop: 100, margin: 0, width: '100%' }}>
                        <Col sm={1}/>
                        <Col sm={10}>
                            <h2>Registration Counts</h2>
                            <br/>
                            <ul>
                                {workshops.map((workshop) => {
                                    return <li>{workshop.name} - {workshop.regs}</li>
                                })}
                            </ul>
                        </Col>
                    </Row>
                </section>
                <Footer/>
            </div>
        );
    }
}
