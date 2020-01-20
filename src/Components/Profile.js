import * as React from 'react';
import Footer from "./Footer";
import Navbar from './Navbar';
import {Col, Row} from "react-bootstrap";
import '../styles/Profile.css';
import '../styles/styled-buttons.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    render() {
        const {isEditing} = this.state;

        return (
            <div>
                <Navbar/>
                <section className={'profile-page'} style={{minHeight: '100vh'}}>
                    <Row style={{width: '100%', margin: 0, paddingTop: 40, paddingBottom: 40}}>
                        <Col sm={12}>
                            <div className={'profile-title profile-title-col'}><b>Profile</b></div>
                        </Col>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Full Name</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input disabled={!isEditing} className={'input-field'} placeholder={'Full Name'}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Username</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input disabled={!isEditing} className={'input-field'} placeholder={'Username'}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Email</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} placeholder={'Email Id'}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Gender</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline1" name="customRadioInline1"
                                       className="custom-control-input" disabled={!isEditing}/>
                                <label className="custom-control-label" htmlFor="customRadioInline1">
                                    Male
                                </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline2" name="customRadioInline1"
                                       className="custom-control-input" disabled={!isEditing}/>
                                <label className="custom-control-label" htmlFor="customRadioInline2">
                                    Female
                                </label>
                            </div>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>College</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} placeholder={'College'} type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Degree</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} placeholder={'Degree'} type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Year</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} placeholder={'Year'} type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Branch</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} placeholder={'Branch'} type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Phone</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} placeholder={'Phone'} type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Address</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <textarea className={'input-field'} disabled={!isEditing} placeholder={'Address'}/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>City</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} placeholder={'City'} type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>State</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} placeholder={'State'} type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Nationality</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} placeholder={'Nationality'}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row edit-button'}>
                        {isEditing
                            ? <button onClick={() => {this.setState({isEditing: false})}} className={'sbtn sbtn-3'}>SAVE</button>
                            : <button onClick={() => {this.setState({isEditing: true})}} className={'btn-edit sbtn sbtn-3'}>EDIT</button>
                        }
                    </Row>
                </section>
                <Footer/>
            </div>
        );
    }
}
