import * as React from 'react';
import {SERVER_BASE_URL} from "../../config/config";
import {Redirect} from "react-router-dom";
import { ethical } from './workshopRegs/ethical';

export default class RegisterUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            isAdmin: true,
        };
    }

    componentDidMount() {
        this.getIsLoggedIn().then(() => {
            this.getUserRole();
            this.getAllUserIds();
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

    getUserByEmail = async (emailId) => {
        try {
            const response = await fetch(`${SERVER_BASE_URL}/api/user/getUserByEmail`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailId
                })
            });
            const data = await response.json();
            if (data.success) {
                this.register(data.user.vId, 6);
            }
        } catch (err) {
            console.log(err);
        }
    };

    register = async (vortexId, workshopId) => {
        try {
            console.log(vortexId, workshopId);
            const response = await fetch(`${SERVER_BASE_URL}/api/workshops/register`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    vortexId,
                    workshopId
                })
            });

            const data = await response.json();

            if (data.success) {
                console.log("Registered: ", vortexId);
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    getAllUserIds = async () => {
        // for (let i = 0; i < ethical.S1.length; i++) {
        //     this.getUserByEmail(ethical.S1[i][1]);
        //     await new Promise(r => setTimeout(r, 200));
        // }
    };

    render() {
        const {isLoggedIn, isAdmin} = this.state;
        console.log(isLoggedIn, isAdmin);

        if (!isLoggedIn) {
            return <Redirect to={'/login'}/>
        }

        if (!isAdmin)  {
            return <Redirect to={'/'}/>
        }

        return null;
    }
}
