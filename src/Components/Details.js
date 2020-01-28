import * as React from 'react';
import '../styles/Details.css';
import {Col, Row} from "react-bootstrap";
import Footer from "./Footer";
import Navbar from './Navbar';
import PopUp from "./PopUp";
import Button from "./Button";
import axios from 'axios';
import {SERVER_BASE_URL} from "../config/config";


export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            l1: 'Description',
            l2: 'Rules',
            l3: 'Format',
            r1: '',
            r2: '',
            r3: '',
            title: ''
        };
    }

    handleClick = (id) => {
        let slide = document.getElementsByClassName('c-procedure__slide');

        Array.from(document.getElementsByClassName("c-procedure__step")).forEach(
            function (element, index, array) {
                if (id - 1 !== index) {
                    element.classList.remove("m-active");
                    element.firstElementChild.classList.remove("m-active");
                    slide[index].style.display = 'none';
                    slide[index].lastElementChild.style.opacity = 1;
                } else {
                    element.classList.add("m-active");
                    element.firstElementChild.classList.add("m-active");
                    slide[index].style.display = '';
                    slide[index].lastElementChild.style.opacity = 1;

                }
            });
    };


    componentDidMount() {
        if (window.innerWidth <= 700) {
            let slide = document.getElementsByClassName('c-procedure__slide');
            Array.from(document.getElementsByClassName("c-procedure__step")).forEach(
                function (element, index, array) {
                    element.classList.add("m-active");
                    element.firstElementChild.classList.add("m-active");
                    slide[index].style.display = '';
                    slide[index].lastElementChild.style.opacity = 1;
                });
        }

        const {isWorkshop, id} = this.props;

        if (isWorkshop) {
            this.setState({
                l1: 'Description',
                l2: 'Prerequisites',
                l3: 'Contact'
            });

            fetch(`${SERVER_BASE_URL}/api/workshops/getById/${id}`, {
                method: 'GET',
                credentials: "include",
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                if (data.success) {
                    this.setState({
                        r1: data.workshop.description,
                        r2: data.workshop.prerequisites,
                        r3: data.workshop.contactDetails,
                        title: data.workshop.name
                    });
                } else {
                    console.log(data.error);
                }
            })
        }

        this.handleClick(1);
    };

    render() {
        const styles = {
            transform: `translate(0%, 100%) matrix(1, 0, 0, 1, 0, 0)`
        };


        const buttonStyle = {
            opacity: 0,
            transform: 'matrix(0, 0, 0, 0, 88.6562, -13)'
        };

        const wordTotal = {
            '--word-total': `2`
        };


        const wordIndex0 = {
            '--word-index': `0`
        };


        const wordIndex1 = {
            '--word-index': `1`
        };


        return (
            <div>
                <Navbar/>
                <section id="details" style={{backgroundColor: '#1C222F'}} className="s-game-procedure">

                    <Row style={{width: '100%', paddingTop: 80}}>
                        <Col sm={12}>
                            <div className={'event-list-title detail-name'}><b><PopUp text={this.state.title}/></b></div>
                        </Col>
                    </Row>


                    <Row style={{width: '100%', paddingLeft: 20, paddingRight: 20, margin: 0}}>

                        <Col md={1}>
                        </Col>

                        <Col md={10}>

                            <div className="g-flux">
                                <div className="s-game-procedure__container">
                                    <div className="c-procedure">
                                        <div className="c-procedure__nav">

                                            <div id="1" className="c-procedure__step m-active">
                                                <button onClick={(e) => {this.handleClick(e.currentTarget.parentElement.id)}} className="m-active">
                                                    <div className="a-plus"/>
                                                    <span className="t-h6"><b>01. </b>{this.state.l1}</span>
                                                </button>
                                            </div>

                                            <div id="2" className="c-procedure__step">
                                                <button onClick={(e) => {this.handleClick(e.currentTarget.parentElement.id)}} className="">
                                                    <div className="a-plus"/>
                                                    <span className="t-h6"><b>02. </b>{this.state.l2}</span>
                                                </button>
                                            </div>

                                            <div id="3" className="c-procedure__step">
                                                <button onClick={(e) => {this.handleClick(e.currentTarget.parentElement.id)}} className="">
                                                    <div className="a-plus"/>
                                                    <span className="t-h6"><b>03. </b>{this.state.l3}</span>
                                                </button>
                                            </div>

                                        </div>

                                        <div className="c-procedure__slides"
                                             style={{position: 'relative', height: 576 + 'px'}}>

                                            <div className="c-procedure__slide g-full" style={{display: 'none'}}>
                                                <div className="c-procedure__title splitting words" style={wordTotal}>
                                                    <span className="c-procedure__slide-count"><span className="word"
                                                                                                     data-word="01"
                                                                                                     style={{wordIndex0}}><span>1</span></span></span>
                                                    <h3 className="t-h3"><span className="word" data-word="Briefing"
                                                                               style={{wordIndex1}}><span
                                                        id="head1">{this.state.l1}</span></span></h3></div>
                                                <div className="c-procedure__content" style={{opacity: 1}}>
                                                    <p id="first">{this.state.r1}</p>
                                                </div>
                                            </div>

                                            <div className="c-procedure__slide g-full">
                                                <div className="c-procedure__title splitting words" style={wordTotal}>
                                                    <span className="c-procedure__slide-count"><span className="word"
                                                                                                     data-word="02"
                                                                                                     style={{wordIndex0}}><span>2</span></span></span>
                                                    <h3 className="t-h3"><span className="word" data-word="Game"
                                                                               style={{wordIndex1}}><span
                                                        id="head2">{this.state.l2}</span></span></h3></div>
                                                <div className="c-procedure__content" style={{opacity: 1}}>
                                                    <p id="second">{this.state.r2}</p>

                                                </div>
                                            </div>

                                            <div className="c-procedure__slide g-full" style={{display: 'none'}}>
                                                <div className="c-procedure__title splitting words" style={wordTotal}>
                                                    <span className="c-procedure__slide-count"><span className="word"
                                                                                                     data-word="03"
                                                                                                     style={{wordIndex0}}><span>3</span></span></span>
                                                    <h3 className="t-h3"><span className="word" data-word="Debriefing"
                                                                               style={{wordIndex1}}><span
                                                        id="head3">{this.state.l3}</span></span></h3></div>
                                                <div className="c-procedure__content" style={{opacity: 1}}>
                                                    <p id="third">{this.state.r3}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={1}/>
                    </Row>

                    <Row style={{width: '100%', paddingBottom: 30, paddingTop: 15}}>
                        <Col sm={12}>
                            <Button text="Register" href="https://www.thecollegefever.com/events/vortex-20"/>
                        </Col>
                    </Row>
                </section>
                <Footer/>
            </div>

        );
    }
}
