import * as React from 'react';
import {Navbar, Button, Form, FormControl, Nav, NavDropdown} from "react-bootstrap";
import '../styles/Navbar.css';
import NavbarMenu from "./NavbarMenu";
import {SERVER_BASE_URL} from "../config/config";

export default class VortexNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavbarOpen: false,
            isLoggedIn: true
        };
    }

    componentDidMount() {
        this.getIsLoggedIn();
    }

    toggleNavbar = () => {
        this.setState({
            isNavbarOpen: !(this.state.isNavbarOpen)
        });
    };

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

    logout = () => {
        fetch(`${SERVER_BASE_URL}/api/user/logout`, {
            method: 'GET',
            credentials: "include",
        }).then((response) => {
            return response.json();
        }).then(() => {
            this.setState({
                isLoggedIn: false
            });
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        });
    };

    render() {
        const {isNavbarOpen, isLoggedIn} = this.state;

        return (
            <div>
                <Navbar className={'vortex-navbar'} fixed="top">
                    <Button
                        className={`hamburger hamburger--spin ${isNavbarOpen ? 'is-active' : ''}`}
                        type="button"
                        onClick={this.toggleNavbar}
                    >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"/>
                    </span>
                    </Button>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end navbar-logo">
                        <a className={'custom-navbar-link'} href={'/'}>HOME</a>
                        {isLoggedIn && <a className={'custom-navbar-link'} onClick={this.logout}>LOGOUT</a>}
                    </Navbar.Collapse>
                </Navbar>
                <NavbarMenu isOpen={isNavbarOpen}/>
            </div>
        );
    }
};
