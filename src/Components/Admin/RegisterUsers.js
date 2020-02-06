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
            console.log(emailId);
            return;
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
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    getAllUserIds = () => {
        ethical.S1[0].forEach((user) => {
            this.getUserByEmail(user[1]);
        });
    };

    render() {
        const {isLoggedIn, isAdmin} = this.state;
        console.log(isLoggedIn, isAdmin);

        return null;
    }
}
