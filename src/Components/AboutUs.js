import * as React from 'react';
import {Col, Row} from "react-bootstrap";

export default class AboutUs extends React.Component {
    render() {
        return (
            <div className={'about-us'}>
                <Row style={{overflow: 'hidden', width: '100%'}}>
                    <Col md={6} className={'about-us-content'}>
                        <div className={'about-us-title'}><b>About</b></div>
                        <p>
                            The Computer Science and Engineering Association (CSEA) of NIT Trichy hosts its annual
                            national level technical symposium, Vortex, to showcase the talents of enthusiasts of
                            numerous facets of Computer Science. Vortex was established to foster critical thinking
                            skills and knowledge in students by interactions with experienced professionals in the
                            academia and experts in the industry, by a hands-on approach through workshops and by
                            polishing their competitive edge through on-site as well as online events. Recently,
                            social initiatives are being undertaken by CSEA to recognise children who suffer the
                            least exposure to the digital world.
                        </p>
                        <br/>
                        <p>
                            With every new edition, Vortex advances to develop itself as a more lucrative platform
                            for the students. From inviting speakers for guest lectures to organizing workshops,
                            events and outreach events to reach more students, Vortex truly believes in diverging
                            from the stereotypical route, to better understand the need of the hour, and to bridge
                            students to the industry better, to help them better understand and employ industry
                            approaches. Vortex ’19 marks the opening of the 27th edition of Vortex.
                        </p>
                    </Col>
                    <Col md={6} className={'about-us-image'}>
                        <img src={'images/vortex_19_logo.jpeg'} className={'about-us-image-img'} alt={'Vortex 19 logo'}/>
                    </Col>
                </Row>
            </div>
        );
    }
}