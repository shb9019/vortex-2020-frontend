import * as React from "react";
import { Col, Row } from "react-bootstrap";
import "../styles/EventCard.css";
import "../styles/styled-buttons.css";

export default class EventCard extends React.Component {
  render() {
    return (
      <div className={"card-wrapper"}>
        <div className={"card-sec-1"}>
          <Row style={{ width: "100%" }}>
            <Col sm={1} />
            <Col sm={8} className={"event-title"}>
              <p style={{ margin: 0 }}>Minecraft</p>
            </Col>
            <Col sm={4}></Col>
          </Row>
        </div>
        <div className={"card-sec-2"}>
          <Row className={"event-info"}>
            <p>
              This team-building game brings coworkers together in an activity
              combining police investigation and...
            </p>
          </Row>
          <Row className={"event-points-row"}>
            <ul className={"event-points"}>
              <li>Static</li>
              <li>Adaptable</li>
              <li>Indoors</li>
            </ul>
          </Row>
        </div>
        <div className={"card-sec-3"}>
          <div>
            <button className="sbtn">Know More</button>
          </div>
        </div>
      </div>
    );
  }
}
