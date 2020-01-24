import * as React from 'react';
import Footer from "./Footer";
import Navbar from "./Navbar";
import '../styles/ForgotPassword.css';
import {Col, Row} from "react-bootstrap";
import {SERVER_BASE_URL} from "../config/config";

export default function ResetPassword(props) {
    const {code} = props;
    const [password, changePassword] = React.useState("");
    const [successMessage, changeSuccess] = React.useState("");
    const [errorMessage, changeError] = React.useState("");

    const sendResetPassword = () => {
        fetch(`${SERVER_BASE_URL}/api/user/changePassword/${code}`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.success) {
                changeSuccess("Password reset successfully!");
            } else {
                changeError(data.error);
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <div>
            <Navbar/>
            <section className={'forgot-password-form'} style={{minHeight: '100vh'}}>
                <Row style={{width: '100%', margin: 0}}>
                    <Col md={1}/>
                    <Col md={8}>
                        <div className={'forgot-password-title'}>
                            <b>Reset Password</b>
                        </div>
                    </Col>
                </Row>
                <Row style={{width: '100%', paddingBottom: 60, margin: 0}}>
                    <Col md={1}/>
                    <Col md={4} className={'input-field-col'}>
                        <input className={'input-field'} placeholder={'New Password*'} value={password}
                               onChange={(e) => changePassword(e.target.value)} type="text"/>
                    </Col>
                </Row>
                <Row style={{width: '100%', paddingBottom: 30, margin: 0}}>
                    <Col md={1}/>
                    <Col md={4}>
                        <div className={'forgot-password-button'}>
                            <a onClick={sendResetPassword} className="sbtn sbtn-1 reset-link-btn">Change Password</a>
                        </div>
                    </Col>
                </Row>
                {successMessage !== "" ? <Row style={{ width: "100%", paddingBottom: 30, margin: 0 }}>
                    <Col md={1} />
                    <Col md={4}>
                        <p style={{ color: "#5ecd72", fontSize: "18px" }}>
                            {successMessage}
                        </p>
                    </Col>
                </Row> : null}
                {errorMessage !== ""  ? <Row style={{ width: "100%", paddingBottom: 30, margin: 0 }}>
                    <Col md={1} />
                    <Col md={4}>
                        <p style={{ color: "#ff0000", fontSize: "18px" }}>
                            *{errorMessage}
                        </p>
                    </Col>
                </Row> : null}
            </section>
            <Footer/>
        </div>
    );
}
