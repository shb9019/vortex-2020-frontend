import * as React from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
import PopUp from "./PopUp";
import {Col, Row} from "react-bootstrap";
import '../styles/CampusAmbassador.css';

export default class CampusAmbassador extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title:'Campus Ambassador',
            text:"<ol> <li>One One One One One One </li>  <li>Two</li>  <li>Three</li>  <li>Four</li>   <li>Five</li>   <li>Six</li></ol>"
        };
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div >
                    <section style={{minHeight:'100vh'}}>
                        
                        <Row style={{width: '100%', paddingTop: 30, margin: 0, minHeight: 240}}>
                            <Col sm={12}>
                                <div className={'event-list-title'}><b><PopUp color="#3A505D" weight="300" text={this.state.title}/></b></div>
                            </Col>
                        </Row>

                        <div>
                             <p id="ambassadorlist" style={{padding:'0px 3em'}} dangerouslySetInnerHTML={{ __html: `${this.state.text}` }}/>
                        </div>

                    </section>
                </div>
                <Footer/>
            </div>
        );
    }
}