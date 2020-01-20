import * as React from 'react';
import {Navbar, Button, Form, FormControl, Nav, NavDropdown} from "react-bootstrap";
import '../styles/Navbar.css';
import NavbarMenu from "./NavbarMenu";

export default class VortexNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavbarOpen: false
        };
    }

    toggleNavbar = () => {
        this.setState({
            isNavbarOpen: !(this.state.isNavbarOpen)
        });
    };

    render() {
        const {isNavbarOpen} = this.state;

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
                        <Navbar.Brand href={'/'}>
                            <img
                                alt="Vortex 2020"
                                src="images/dashboard-vortex-logo.png"
                                width="40"
                                height="40"
                                className="d-inline-block align-top"
                            />
                        </Navbar.Brand>
                    </Navbar.Collapse>
                </Navbar>
                <NavbarMenu isOpen={isNavbarOpen}/>
            </div>
        );
    }
};
