import * as React from 'react';
import '../styles/Details.css';
import {Col, Row} from "react-bootstrap";
import Footer from "./Footer";
import Navbar from './Navbar';
import PopUp from "./PopUp";
import Button from "./Button";
import axios from 'axios';



export default class Details extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            l1:'Description',
            l2:'Rules',
            l3:'Format',
            r1:'Pragyan Premier League is an online fantasy cricket league that lets you manage your own team. From buying your From buying your From buying your From buying your From buying your From buying your From buying your From buying your From buying your From buying your From buying yourFrom buying yourFrom buying yourFrom buying yourFrom buying yourFrom buying yourFrom buying yourFrom buying yourFrom buying yourFrom buying your squad to deciding the line-ups, your decisions decide the fate of your team. A dynamic environment combined with real, rival managers worldwide forces you to strategize and master the odds to outwit your opponent. Eight days... Eight matches... One team. Do you have what it takes to lead your team to glory?Prizes worth INR 35000/-',
            r2:'One trial round (not counted in the league rankings) to help players familiarize themselves with the game.        One chance to buy squad for the league Eight simulated matches.',
            r3:'Each team is required to buy a squad of minimum 11 players. This squad is retained throughout Round 1.      ',
        };
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick(e) {
      let id=e.currentTarget.parentElement.id;
      let slide=document.getElementsByClassName('c-procedure__slide');

        Array.from(document.getElementsByClassName("c-procedure__step")).forEach(
            function(element, index, array) {
                    if(id-1!=index){
                        element.classList.remove("m-active");
                        element.firstElementChild.classList.remove("m-active");
                        slide[index].style.display='none';
                        slide[index].lastElementChild.style.opacity=0;
                    }
                    
                    else{
                        element.classList.add("m-active");
                        element.firstElementChild.classList.add("m-active");
                        slide[index].style.display='';
                        slide[index].lastElementChild.style.opacity=1;

                    }
        });
    }


componentDidMount(){
        if(window.innerWidth<=700){

            let slide=document.getElementsByClassName('c-procedure__slide');

        Array.from(document.getElementsByClassName("c-procedure__step")).forEach(
            function(element, index, array) {
                        element.classList.add("m-active");
                        element.firstElementChild.classList.add("m-active");
                        slide[index].style.display='';
                        slide[index].lastElementChild.style.opacity=1;
        });
    }

    axios.get('/event/'+this.props.id, {
        // params: {
        //   ID: this.props.id
        // }
      })
      .then(function (data) {
        this.setState = {
            l1:data.l1,
            l2:data.l2,
            l3:data.l3,
            r1:data.r1,
            r2:data.r2,
            r3:data.r3,
        };
      })


}

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
            <section id="details" style={{backgroundColor:'#1C222F'}}className="s-game-procedure">
        
            <Row style={{width: '100%', paddingTop: 150}}>
                            <Col sm={12}>
                                <div className={'event-list-title'}><b><PopUp text="Details"/></b></div>
                            </Col>
                        </Row>


                        <Row style={{width: '100%', paddingLeft: 20, paddingRight: 20, margin: 0}}>

                        <Col md={1} >
                        </Col>    

            <Col md={10}>
            
        <div className="g-flux">
            <div className="s-game-procedure__container">
                <div className="c-procedure">
                    <div className="c-procedure__nav">
                            
                            <div id="1" className="c-procedure__step">
                                <button  onClick={this.handleClick} className="">
                                    <div className="a-plus"></div>
                                    <span className="t-h6"><b>01. </b>{this.state.l1}</span>
                                </button>
                            </div>
                                
                            <div id="2" className="c-procedure__step m-active ">
                                <button onClick={this.handleClick} className="m-active">
                                    <div className="a-plus"></div>
                                    <span className="t-h6"><b>02. </b>{this.state.l2}</span>
                                </button>
                            </div>
                                
                            <div id="3" className="c-procedure__step">
                                <button  onClick={this.handleClick} className="">
                                    <div className="a-plus"></div>
                                    <span className="t-h6"><b>03. </b>{this.state.l3}</span>
                                </button>
                            </div>
                                
                    </div>

                    <div className="c-procedure__slides" style={{position: 'relative',height: 576+'px'}}>
                            
                             <div className="c-procedure__slide g-full" style={{display: 'none'}}>
                                <div className="c-procedure__title splitting words" style={wordTotal}><span className="c-procedure__slide-count"><span className="word" data-word="01" style={{wordIndex0}}><span >1</span></span></span><h3 className="t-h3"><span className="word" data-word="Briefing" style={{wordIndex1}}><span id="head1" >{this.state.l1}</span></span></h3></div>
                                <div className="c-procedure__content" style={{opacity: 0}}>
                                    <p id="first">{this.state.r1}</p>
                            </div>
                            </div>
            
                            <div className="c-procedure__slide g-full">
                                <div className="c-procedure__title splitting words" style={wordTotal}><span className="c-procedure__slide-count"><span className="word" data-word="02" style={{wordIndex0}}><span>2</span></span></span><h3 className="t-h3"><span className="word" data-word="Game" style={{wordIndex1}}><span id="head2">{this.state.l2}</span></span></h3></div>
                                <div className="c-procedure__content" style={{opacity: 1}}>
                                 <p id="second">{this.state.r2}</p>
                                
                                    </div>
                            </div>
                            
                            <div className="c-procedure__slide g-full" style={{display: 'none'}}>
                                <div className="c-procedure__title splitting words" style={wordTotal}><span className="c-procedure__slide-count"><span className="word" data-word="03" style={{wordIndex0}}><span>3</span></span></span><h3 className="t-h3"><span className="word" data-word="Debriefing" style={{wordIndex1}}><span id="head3">{this.state.l3}</span></span></h3></div>
                                <div className="c-procedure__content" style={{opacity: 0}}>
                                <p id="third">{this.state.r3}</p>
                                </div>
                            </div>
                            
                            
                    </div>
                </div>
            </div>
        </div>
        </Col>
        <Col md={1}></Col>
        </Row>

                <Row style={{width: '100%', paddingBottom: 30,paddingTop: 15}}>
                            <Col sm={12}>
                                <Button text="Register" href="#"/>
                            </Col>
                </Row>

       
    </section>
    


                <Footer/>
          </div>
      
        );
    }
}
