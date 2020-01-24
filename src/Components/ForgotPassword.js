import * as React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../styles/ForgotPassword.css";
import { Col, Row } from "react-bootstrap";
import {SERVER_BASE_URL} from "../config/config";

export default function ForgotPassword() {
  const [email, changeEmail] = React.useState("");
  const [successMessage, changeSuccess] = React.useState("");
  const [errorMessage, changeError] = React.useState("");

  const sendResetLink = () => {
    changeSuccess("");
    changeError("");
    fetch(`${SERVER_BASE_URL}/api/user/forgotPassword`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.success === true) {
          changeSuccess("Reset link has been sent to your email!");
        } else {
          changeError("Email is not registered");
        }
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <section
        className={"forgot-password-form"}
        style={{ minHeight: "100vh" }}
      >
        <Row style={{ width: "100%", margin: 0 }}>
          <Col md={1} />
          <Col md={8}>
            <div className={"forgot-password-title"}>
              <b>Forgot Password</b>
            </div>
          </Col>
        </Row>
        <Row style={{ width: "100%", paddingBottom: 60, margin: 0 }}>
          <Col md={1} />
          <Col md={4} className={"input-field-col"}>
            <input
              className={"input-field"}
              placeholder={"Email*"}
              value={email}
              onChange={e => changeEmail(e.target.value)}
              type="text"
            />
          </Col>
        </Row>
        <Row style={{ width: "100%", paddingBottom: 30, margin: 0 }}>
          <Col md={1} />
          <Col md={4}>
            <div className={"forgot-password-button"}>
              <a onClick={sendResetLink} className="sbtn sbtn-1 reset-link-btn">
                Send Reset link
              </a>
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
      <Footer />
    </div>
  );
}
