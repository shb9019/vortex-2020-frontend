import * as React from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";

export default class GuestLectures extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <section style={{minHeight: '100vh', marginBottom: 50}}>
                    <div className={'contact-us-title'}><h1><b>Guest</b> Lectures</h1></div>
                    <Row style={{ width: '100%', margin: 0 }}>
                        <Col sm={3}/>
                        <Col sm={6} className={'text-center'}>
                            <img src={'images/maggie.jpeg'} width={'90%'} alt={'Maggi Inbumathi - Grace Hopper'}/>
                        </Col>
                        <Col sm={3}/>
                    </Row>
                </section>
                <Footer/>
            </div>
        );
    }
}