import * as React from "react";
import { Col, Row } from "react-bootstrap";
import "../styles/EventCard.css";
import "../styles/styled-buttons.css";

export default class EventCard extends React.Component {
  render() {
    const {details, isWorkshop} = this.props;
    const shortDescription = details.shortDescription.split("|");

    return (
      <div className={"card-wrapper"}>
        <div className={"card-sec-1"}>
          <Row style={{ width: "100%" }}>
            <Col sm={1} />
            <Col sm={10} className={"event-title"}>
              <p style={{ margin: 0 }}>{details.name}</p>
            </Col>
            <Col sm={1}/>
          </Row>
        </div>
        <div className={"card-sec-2"}>
          <Row className={"event-info"}>
            <p>
              {shortDescription[0]}
            </p>
          </Row>
          <Row className={"event-points-row"}>
            <ul className={"event-points"}>
              <li>{shortDescription[1]}</li>
              <li>{shortDescription[2]}</li>
              <li>{shortDescription[3]}</li>
              {shortDescription[4] && <li>{shortDescription[4]}</li>}
            </ul>
          </Row>
        </div>
        <div className={"card-sec-3"}>
          <div>
            <a href={`/${isWorkshop ? 'workshop' : 'event'}/${details.id}`}><button className="sbtn">Know More</button></a>
          </div>
        </div>
      </div>
    );
  }
}
