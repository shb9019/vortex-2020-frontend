import * as React from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
import PopUp from "./PopUp";
import {Col, Row} from "react-bootstrap";
import '../styles/CampusAmbassador.css';
import {SERVER_BASE_URL} from "../config/config";

export default class CampusAmbassador extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text:""
        };
    }

    componentDidMount() {
        this.getContent();
    }

    getContent = async () => {
        try {
            const response = await fetch(`${SERVER_BASE_URL}/api/cacontent/`, {
                method: 'GET',
                credentials: "include",
            });
            const data = await response.json();
            if (data.content) {
                this.setState({
                    text: data.content.content
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <div>
                <Navbar/>
                <div >
                    <section style={{minHeight:'100vh'}}>
                        
                        <Row style={{width: '100%', paddingTop: 30, margin: 0, minHeight: 240}}>
                            <Col sm={12}>
                                <div className={'contact-us-title acco-title'}><h1>Campus <b>Ambassador</b></h1></div>
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