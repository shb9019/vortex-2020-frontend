import * as React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Col, Row } from "react-bootstrap";
import "../styles/Register.css";
import { Redirect } from "react-router-dom";
import {SERVER_BASE_URL} from "../config/config";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      username: "",
      password: "",
      isRegistered: false,
      errorMessage: "",
      successMessage: ""
    };
  }

  changeFullName = e => {
    this.setState({
      fullName: e.target.value
    });
  };

  changeEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  changeUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  changePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  changeErrorMessage = msg => {
    this.setState({
      errorMessage: msg
    });
  };

  register = () => {
    const { fullName, email, password, username } = this.state;

    fetch(`${SERVER_BASE_URL}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullname: fullName,
        email,
        password,
        username
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.success) {
          this.setState({
            successMessage: "Registered Successfully"
          });
        } else {
          this.setState({
            errorMessage: data.error
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {
      fullName,
      email,
      username,
      password,
      isRegistered,
      errorMessage,
      successMessage
    } = this.state;
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect to={"/"} />;
    }

    if (isRegistered) {
      return <Redirect to={"/login"} />;
    }

    return (
      <div>
        <Navbar />
        <section className={"register-form"} style={{ minHeight: "100vh" }}>
          <Row className={'register-row'} style={{ width: "100%" }}>
            <Col md={1} />
            <Col md={8}>
              <div className={"register-title"}>
                <b>Register</b>
              </div>
            </Col>
          </Row>
          <Row className={'register-row'} style={{ width: "100%", paddingBottom: 20 }}>
            <Col md={1} />
            <Col md={4} className={"input-field-col"}>
              <input
                className={"input-field"}
                value={fullName}
                onChange={this.changeFullName}
                placeholder={"Full Name*"}
                type="text"
              />
            </Col>
          </Row>
          <Row className={'register-row'} style={{ width: "100%", paddingBottom: 20 }}>
            <Col md={1} />
            <Col md={4} className={"input-field-col"}>
              <input
                className={"input-field"}
                value={email}
                onChange={this.changeEmail}
                placeholder={"Email Id*"}
                type="text"
              />
            </Col>
          </Row>
          <Row className={'register-row'} style={{ width: "100%", paddingBottom: 20 }}>
            <Col md={1} />
            <Col md={4} className={"input-field-col"}>
              <input
                className={"input-field"}
                value={username}
                onChange={this.changeUsername}
                placeholder={"Username *"}
                type="text"
              />
            </Col>
          </Row>
          <Row className={'register-row'} style={{ width: "100%", paddingBottom: 20 }}>
            <Col md={1} />
            <Col md={4} className={"input-field-col"}>
              <input
                className={"input-field"}
                value={password}
                onChange={this.changePassword}
                placeholder={"Password*"}
                type="password"
              />
            </Col>
          </Row>
          {(errorMessage !== "") ? <Row className={'register-row'} style={{ width: "100%" }}>
            <Col md={1} />
            <Col md={6} className={"links"}>
              <p style={{ color: "red" }}>
                *${errorMessage}
              </p>
            </Col>
          </Row> : null}
          {(successMessage !== "") ? <Row className={'register-row'} style={{ width: "100%" }}>
            <Col md={1} />
            <Col md={6} className={"links"}>
              <p style={{ color: "#5ecd72" }}>
                {successMessage}
              </p>
            </Col>
          </Row> : null}
          <Row className={'register-row'} style={{ width: "100%" }}>
            <Col md={1} />
            <Col md={4} className={"input-field-col"} style={{ padding: 0 }}>
              <button
                className="sbtn sbtn-3 sbtn-3e icon-arrow-right"
                onClick={this.register}
              >
                Create Account
              </button>
            </Col>
          </Row>
          <Row className={'register-row'} style={{ width: "100%" }}>
            <Col md={1} />
            <Col md={6} className={"forgot-password"}>
              <p>
                Already registered?{" "}
                <a href={"/login"}>
                  <u>Log in</u>
                </a>
              </p>
            </Col>
          </Row>
        </section>
        <Footer />
      </div>
    );
  }
}
