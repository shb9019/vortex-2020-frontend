import * as React from 'react';
import '../styles/Details.css';
import {Col, Row} from "react-bootstrap";
import Footer from "./Footer";
import Navbar from './Navbar';
import PopUp from "./PopUp";
export default class Details extends React.Component {



    constructor(props) {
        super(props);
        this.state = {active:1};
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick(e) {
        // this.setState(state => ({
         
        // }));
      let id=e.target.parentElement.id;

      let slide=document.getElementsByClassName('c-procedure__slide');

        Array.from(document.getElementsByClassName("c-procedure__step")).forEach(
            function(element, index, array) {
                    if(id-1!=index){
                        element.classList.remove("m-active");
                        element.firstElementChild.classList.remove("m-active");
                        // console.log(index)

                        slide[index].style.display='none';
                        slide[index].lastElementChild.style.opacity=0;

                        // document.getElementById('head'+id).style='';
                    }
                    
                    else{
                        element.classList.add("m-active");
                        element.firstElementChild.classList.add("m-active");


                        slide[index].style.display='';
                        slide[index].lastElementChild.style.opacity=1;

                        // document.getElementById('head'+id).style='transform:translate(0%, 100%) matrix(1, 0, 0, 1, 0, 0)';
                    }
        });

    }




    render() {
        const styles = { 
            transform: `translate(0%, 100%) matrix(1, 0, 0, 1, 0, 0)` 
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
            <section style={{backgroundColor:'#141822'}}className="s-game-procedure">
            <Row style={{width: '100%', paddingTop: 60}}>
                            <Col sm={12}>
                                <div className={'event-list-title'}><b><PopUp text="Details"/></b></div>
                            </Col>
                        </Row>
        <div className="g-flux">
            <div className="s-game-procedure__container">
                <div className="c-procedure">
                    <div className="c-procedure__nav">
                            
                            <div id="1" className="c-procedure__step">
                                <button  onClick={this.handleClick} className="">
                                    <div className="a-plus"></div>
                                    <span className="t-h6"><b>01. </b>Briefing</span>
                                </button>
                            </div>
                                
                            <div id="2" className="c-procedure__step m-active ">
                                <button onClick={this.handleClick} className="m-active">
                                    <div className="a-plus"></div>
                                    <span className="t-h6"><b>02. </b>Game</span>
                                </button>
                            </div>
                                
                            <div id="3" className="c-procedure__step">
                                <button  onClick={this.handleClick} className="">
                                    <div className="a-plus"></div>
                                    <span className="t-h6"><b>03. </b>Debriefing</span>
                                </button>
                            </div>
                                
                    </div>

                    <div className="c-procedure__slides" style={{position: 'relative',height: 576+'px'}}>
                            
                             <div className="c-procedure__slide g-full" style={{display: 'none'}}>
                                <div className="c-procedure__title splitting words" style={wordTotal}><span className="c-procedure__slide-count"><span className="word" data-word="01" style={{wordIndex0}}><span >1</span></span></span><h3 className="t-h3"><span className="word" data-word="Briefing" style={{wordIndex1}}><span id="head1" >Briefing</span></span></h3></div>
                                <div className="c-procedure__content" style={{opacity: 0}}>
                                    <p>The <strong>briefing</strong> is the first stage in the activity. The teams have a <strong>briefcase</strong> and a <strong>tablet</strong> on their table: The <strong>Game Master</strong> explains the concept of the game and how the <strong>tablet</strong> works to participants, using visuals and an introductory video.<br/>The presentation time is about 10 minutes.</p>
                            </div>
                            </div>
            
                            <div className="c-procedure__slide g-full">
                                <div className="c-procedure__title splitting words" style={wordTotal}><span className="c-procedure__slide-count"><span className="word" data-word="02" style={{wordIndex0}}><span>2</span></span></span><h3 className="t-h3"><span className="word" data-word="Game" style={{wordIndex1}}><span id="head2">Game</span></span></h3></div>
                                <div className="c-procedure__content" style={{opacity: 1}}>
                                 <p>This activity takes on the crazy challenge of fitting a whole “<strong>escape room”</strong> inside a single <strong>briefcase</strong>: the game is <strong>portable and adaptable</strong> <strong>to any location</strong>, and also makes it possible for a <strong>large number of people to play at the same time</strong>. The goal for each team is to effectuate a <strong>radical change</strong> that will <strong>ensure the conservation of pandas in China</strong>.</p>
                                <p>&nbsp;</p>
                                    </div>
                            </div>
                            
                            <div className="c-procedure__slide g-full" style={{display: 'none'}}>
                                <div className="c-procedure__title splitting words" style={wordTotal}><span className="c-procedure__slide-count"><span className="word" data-word="03" style={{wordIndex0}}><span>3</span></span></span><h3 className="t-h3"><span className="word" data-word="Debriefing" style={{wordIndex1}}><span id="head3">Debriefing</span></span></h3></div>
                                <div className="c-procedure__content" style={{opacity: 0}}>
                                <p>Once the competitive phase is over, the <strong>debriefing</strong> is an opportunity to <strong>gather</strong> all the teams around for a positive moment, ideal for brainstorming.<br/><strong>Lydia Martin, Digital Learning project leader and change management expert</strong>, will analyze performance indicators throughout the activity to propose a <strong>training plan. </strong></p>
                                </div>
                            </div>
                            
                            
                    </div>
                </div>
            </div>
        </div>
        <div className="g-flux g-pad-section g-text-center"> 
            </div>
    </section>
                <Footer/>
          </div>
      
        );
    }
}
