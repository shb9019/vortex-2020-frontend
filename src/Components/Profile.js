import * as React from 'react';
import Footer from "./Footer";
import Navbar from './Navbar';
import {Col, Row} from "react-bootstrap";
import '../styles/Profile.css';
import '../styles/styled-buttons.css';
import {Redirect} from "react-router-dom";
import {SERVER_BASE_URL} from "../config/config";
import collegeList from "../utils/CollegeList";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            isLoggedIn: true,
            fullName: "",
            username: "",
            email: "",
            gender: "",
            college: "",
            degree: "",
            year: "",
            branch: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            nationality: "",
            errorMessage: "",
            vortexId:"",
            campusAmbassador: false,
            campusAmbassadorID: null
        }
    }

    componentDidMount() {
        this.getIsLoggedIn();
        this.getUser();
    }

    getIsLoggedIn = async () => {
        try {
            const response = await fetch(`${SERVER_BASE_URL}/api/user/isLoggedIn`, {
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            this.setState({
                isLoggedIn: data.isLoggedIn
            });
        } catch (err) {
            this.setState({
                isLoggedIn: false
            });
        }
    };

    getUser = () => {
        fetch(`${SERVER_BASE_URL}/api/user/getUserData`, {
            method: 'GET',
            credentials: "include",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.success) {
                const user = data.user;
                this.setState({
                    fullName: user.fullname,
                    username: user.username,
                    email: user.email,
                    gender: user.sex,
                    college: user.college,
                    degree: user.degree,
                    year: user.year,
                    branch: user.branch,
                    phone: user.phone,
                    address: user.address,
                    city: user.city,
                    state: user.state,
                    nationality: user.nationality,
                    vortexId: user.vId,
                    campusAmbassador: user.isCA,
                    campusAmbassadorID: user.vIdOfCA
                });
                console.log(data);
            } else {
                this.setState({
                    errorMessage: data.error
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    update = () => {
        this.setState({
            errorMessage: ""
        });

        if (this.state.campusAmbassadorID === "" || this.state.campusAmbassador) {
            this.setState({
                campusAmbassadorID: null
            });
        }

        fetch(`${SERVER_BASE_URL}/api/user/update`, {
            method: 'PUT',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname: this.state.fullName,
                username: this.state.username,
                sex: this.state.gender,
                college: this.state.college,
                degree: this.state.degree,
                year: this.state.year,
                branch: this.state.branch,
                phone: this.state.phone,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                nationality: this.state.nationality,
                isCA: this.state.campusAmbassador,
                vIdOfCA: this.state.campusAmbassadorID
            })
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (!data.success) {
                this.setState({
                    errorMessage: data.error
                });
                this.getUser();
            }
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });
    };

    logout = () => {
        const {logout} = this.props;

        fetch(`${SERVER_BASE_URL}/api/user/logout`, {
            method: 'GET',
            credentials: "include",
        }).then((response) => {
            return response.json();
        }).then(() => {
            logout();
            this.setState({
                isLoggedIn: false
            });
        }).catch((err) => {
            console.log(err);
        });
    };

    changeField = (fieldName, value) => {
        this.setState({
            [fieldName]: value
        });
    };

    changeGender = (value) => {
        this.setState({
            gender: value
        });
    };

    changeIsCampusAmbassador = (value) => {
        this.setState({
            campusAmbassador: value
        });
    };

    render() {
        const {
            isEditing, isLoggedIn, errorMessage, fullName, username, email, address, gender, branch, city, college,
            degree, nationality, phone, state, year,vortexId,campusAmbassador,campusAmbassadorID
        } = this.state;

        if (!isLoggedIn) {
            return <Redirect to={'/'}/>
        }

        return (
            <div>
                <Navbar/>
                <section className={'profile-page'} style={{minHeight: '100vh'}}>
                    <Row style={{width: '100%', margin: 0, paddingTop: 40}}>
                        <Col sm={12}>
                            <div className={'profile-title profile-title-col'}><b>Profile</b></div>
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: 0, paddingBottom: 40}} className={'profile-row edit-button'}>
                        <Col sm={4}/>
                        <Col sm={4} className={'profile-button-col'}>
                            {isEditing
                                ? <button onClick={() => {
                                    this.setState({isEditing: false});
                                    this.update();
                                }} className={'sbtn sbtn-3 profileBtn'}>SAVE</button>
                                : <button onClick={() => {
                                    this.setState({isEditing: true})
                                }} className={'btn-edit sbtn sbtn-3 profileBtn'}>EDIT</button>
                            }

                            <button onClick={this.logout} className={'btn-logout sbtn sbtn-3 profileBtn'}>LOGOUT
                            </button>
                        </Col>
                        <Col sm={4}/>
                    </Row>


                    {errorMessage !== "" ? <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={10} className={'input-field-tag'} style={{ color: 'red', fontSize: 14 }}>
                            <p>*{errorMessage}</p>
                        </Col>
                        <Col md={1}/>
                    </Row> : null}

                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Vortex ID</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled value={vortexId}
                                   placeholder={'Vortex Id'}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Full Name</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input disabled={!isEditing} className={'input-field'} value={fullName}
                                   onChange={(e) => this.changeField('fullName', e.target.value)}
                                   placeholder={'Full Name'}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Username</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input disabled={!isEditing} className={'input-field'} value={username}
                                   onChange={(e) => this.changeField('username', e.target.value)}
                                   placeholder={'Username'}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Email</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled value={email}
                                   onChange={(e) => this.changeField('email', e.target.value)}
                                   placeholder={'Email Id'}
                                   checked={gender === 'F'}
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
                                       className="custom-control-input"
                                       disabled={!isEditing}
                                       onChange={() => this.changeGender('M')}
                                       checked={gender === 'M'}/>
                                <label className="custom-control-label" htmlFor="customRadioInline1">
                                    Male
                                </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline2" name="customRadioInline2"
                                       className="custom-control-input"
                                       disabled={!isEditing}
                                       onChange={() => this.changeGender('F')}
                                       checked={gender === 'F'}/>
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
                            {isEditing
                                ? <select className={'input-field'} disabled={!isEditing} value={college}
                                   onChange={(e) => this.changeField('college', e.target.value)}
                                    placeholder={'Select College'}>
                                {collegeList.map((college) =>  <option style={{maxWidth: '100%'}}  value={college}>{college}</option>)}
                            </select>
                                : <input className={'input-field'} disabled value={college} placeholder={'College'} type="text"/>}
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Degree</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} value={degree} placeholder={'Degree'}
                                   onChange={(e) => this.changeField('degree', e.target.value)}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Year</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} value={year} placeholder={'Year'}
                                   onChange={(e) => this.changeField('year', e.target.value)}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Branch</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} value={branch} placeholder={'Branch'}
                                   onChange={(e) => this.changeField('branch', e.target.value)}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Phone</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} value={phone} placeholder={'Phone'}
                                   onChange={(e) => this.changeField('phone', e.target.value)}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Address</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <textarea className={'input-field'} disabled={!isEditing} value={address}
                                      onChange={(e) => this.changeField('address', e.target.value)}
                                      placeholder={'Address'}/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>City</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} value={city} placeholder={'City'}
                                   onChange={(e) => this.changeField('city', e.target.value)}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>
                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>State</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} value={state} placeholder={'State'}
                                   onChange={(e) => this.changeField('state', e.target.value)}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>

                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Nationality</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input className={'input-field'} disabled={!isEditing} value={nationality}
                                   placeholder={'Nationality'}
                                   onChange={(e) => this.changeField('nationality', e.target.value)}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>


                    <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Are you a Campus Ambassador?</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline3" name="customRadioInline3"
                                       className="custom-control-input"
                                       disabled={!isEditing}
                                       onChange={() => this.changeIsCampusAmbassador(true)}
                                       checked={campusAmbassador}/>
                                <label className="custom-control-label" htmlFor="customRadioInline3">
                                    Yes
                                </label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline4" name="customRadioInline4"
                                       className="custom-control-input"
                                       disabled={!isEditing}
                                       onChange={() => this.changeIsCampusAmbassador(false)}
                                       checked={!campusAmbassador}/>
                                <label className="custom-control-label" htmlFor="customRadioInline4">
                                    No
                                </label>
                            </div>
                        </Col>
                        <Col md={1}/>
                    </Row>

                    {!campusAmbassador && <Row className={'profile-row'}>
                        <Col md={1}/>
                        <Col md={4} className={'input-field-tag'}><p>Vortex ID of College Campus Ambassador</p></Col>
                        <Col md={6} className={'input-field-col'}>
                            <input disabled={!isEditing} className={'input-field'} value={campusAmbassadorID}
                                   onChange={(e) => this.changeField('campusAmbassadorID', e.target.value)}
                                   placeholder={'Vortex ID'}
                                   type="text"/>
                        </Col>
                        <Col md={1}/>
                    </Row>}
                </section>
                <Footer/>
            </div>
        );
    }
}
