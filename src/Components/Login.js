import * as React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Col, Row } from "react-bootstrap";
import "../styles/Login.css";
import { Redirect } from "react-router-dom";
import {SERVER_BASE_URL} from "../config/config";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: ""
    };
  }

  login = () => {
    const { username, password } = this.state;

    fetch(`${SERVER_BASE_URL}/api/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (!data.success) {
          this.changeErrorMessage(data.error);
        } else {
          this.props.login();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  changeUsername = e => {
    this.setState({
      username: e.target.value,
      errorMessage: ""
    });
  };

  changePassword = e => {
    this.setState({
      password: e.target.value,
      errorMessage: ""
    });
  };

  changeErrorMessage = msg => {
    this.setState({
      errorMessage: msg
    });
  };

  render() {
    const { isLoggedIn } = this.props;
    const { username, password, errorMessage } = this.state;

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Navbar />
        <section className={"login-form"} style={{ minHeight: "100vh" }}>
          <Row style={{ width: "100%", margin: 0 }}>
            <Col md={1} />
            <Col md={8}>
              <div className={"login-title"}>
                <b>Login</b>
              </div>
            </Col>
          </Row>
          <Row style={{ width: "100%", paddingBottom: 30, margin: 0 }}>
            <Col md={1} />
            <Col md={4} className={"input-field-col"}>
              <input
                className={"input-field"}
                placeholder={"Username*"}
                value={username}
                onChange={this.changeUsername}
                type="text"
              />
            </Col>
          </Row>
          <Row style={{ width: "100%", paddingBottom: 30, margin: 0 }}>
            <Col md={1} />
            <Col md={4} className={"input-field-col"}>
              <input
                className={"input-field"}
                placeholder={"Password*"}
                value={password}
                onChange={this.changePassword}
                type="password"
              />
            </Col>
          </Row>
          <Row style={{ width: "100%", margin: 0 }}>
            <Col md={1} />
            <Col md={6} className={"links"}>
              <p style={{ color: "red" }}>
                {errorMessage !== "" ? `*${errorMessage}` : null}
              </p>
            </Col>
          </Row>
          <Row style={{ width: "100%", paddingBottom: 20, margin: 0 }}>
            <Col md={1} />
            <Col md={4} className={"input-field-col"}>
              <button
                onClick={this.login}
                className="sbtn sbtn-3 sbtn-3e icon-arrow-right login-btn"
              >
                Enter
              </button>
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            <Col md={1} />
            <Col md={6} className={"links"}>
              <p>
                New here?{" "}
                <a href={"/register"}>
                  <u>Register</u>
                </a>
              </p>
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            <Col md={1} />
            <Col md={6} className={"links"}>
              <p>
                Forgot Password?{" "}
                <a href={"/forgotpassword"}>
                  <u>Reset here</u>
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
